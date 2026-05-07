import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get('campaign_id')

    if (!campaignId) {
      return NextResponse.json({ error: 'campaign_id is required' }, { status: 400 })
    }

    const [statsResult, activityResult, campaignResult] = await Promise.all([
      supabaseAdmin
        .from('campaign_stats')
        .select('*')
        .eq('campaign_id', campaignId)
        .single(),
      supabaseAdmin
        .from('activity_logs')
        .select('*')
        .eq('campaign_id', campaignId)
        .order('created_at', { ascending: false })
        .limit(1),
      supabaseAdmin
        .from('campaigns')
        .select('status')
        .eq('id', campaignId)
        .single(),
    ])

    if (campaignResult.error) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }

    const latestActivity = activityResult.data?.[0] || null
    const isRunning = campaignResult.data?.status === 'active'

    // Check if agent has been active in the last 10 minutes
    let recentlyActive = false
    if (latestActivity) {
      const lastActivityTime = new Date(latestActivity.created_at).getTime()
      const tenMinutesAgo = Date.now() - 10 * 60 * 1000
      recentlyActive = lastActivityTime > tenMinutesAgo
    }

    return NextResponse.json({
      campaign_id: campaignId,
      is_running: isRunning,
      recently_active: recentlyActive,
      stats: statsResult.data || null,
      latest_activity: latestActivity,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
