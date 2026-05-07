import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get('campaign_id')
    const limit = parseInt(searchParams.get('limit') || '50', 10)

    if (!campaignId) {
      return NextResponse.json({ error: 'campaign_id is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('activity_logs')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ activity: data })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { campaign_id, platform, action, action_type, sentiment } = body

    if (!campaign_id || !platform || !action || !action_type) {
      return NextResponse.json(
        { error: 'campaign_id, platform, action, and action_type are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('activity_logs')
      .insert({
        campaign_id,
        platform,
        action,
        action_type,
        sentiment: sentiment || 'neutral',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ activity: data }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
