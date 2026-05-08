import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// This endpoint runs all active campaigns' agents
// Call it via Vercel Cron or external scheduler every 30 minutes
// Protected by CRON_SECRET env var

export async function GET(request: NextRequest) {
  // Verify cron secret
  const secret = request.headers.get('authorization')?.replace('Bearer ', '')
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get all active campaigns
    const { data: campaigns, error } = await supabaseAdmin
      .from('campaigns')
      .select('id, name, status')
      .eq('status', 'active')

    if (error || !campaigns) {
      return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 })
    }

    if (campaigns.length === 0) {
      return NextResponse.json({ message: 'No active campaigns', ran: 0 })
    }

    // Run agent for each active campaign (sequentially to respect Moltbook rate limits)
    const results = []
    for (const campaign of campaigns) {
      try {
        // Call our own agent/run endpoint internally
        const origin = request.nextUrl.origin
        const res = await fetch(`${origin}/api/agent/run`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaign_id: campaign.id }),
        })
        const data = await res.json()
        results.push({
          campaign_id: campaign.id,
          campaign_name: campaign.name,
          success: data.success || false,
          post_title: data.post?.title || null,
        })

        // Wait 3 minutes between posts (Moltbook rate limit)
        if (campaigns.indexOf(campaign) < campaigns.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 180000))
        }
      } catch (e) {
        results.push({
          campaign_id: campaign.id,
          campaign_name: campaign.name,
          success: false,
          error: e instanceof Error ? e.message : 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      message: `Ran ${results.length} campaigns`,
      ran: results.length,
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Cron error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
