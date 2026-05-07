import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get('campaign_id')

    if (!campaignId) {
      return NextResponse.json({ error: 'campaign_id is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('score', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ leads: data })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { campaign_id, name, platform, score, status, last_message } = body

    if (!campaign_id || !name || !platform) {
      return NextResponse.json(
        { error: 'campaign_id, name, and platform are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert({
        campaign_id,
        name,
        platform,
        score: score || 0,
        status: status || 'new',
        last_message: last_message || null,
        touches: 0,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ lead: data }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
