import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const [campaignResult, leadsResult, activityResult] = await Promise.all([
      supabaseAdmin
        .from('campaigns')
        .select('*, campaign_stats(*)')
        .eq('id', id)
        .single(),
      supabaseAdmin
        .from('leads')
        .select('*')
        .eq('campaign_id', id)
        .order('score', { ascending: false })
        .limit(10),
      supabaseAdmin
        .from('activity_logs')
        .select('*')
        .eq('campaign_id', id)
        .order('created_at', { ascending: false })
        .limit(20),
    ])

    if (campaignResult.error) {
      return NextResponse.json({ error: campaignResult.error.message }, { status: 404 })
    }

    return NextResponse.json({
      campaign: campaignResult.data,
      leads: leadsResult.data || [],
      activity: activityResult.data || [],
    })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Remove fields that shouldn't be updated directly
    delete body.id
    delete body.user_id
    delete body.created_at

    const { data, error } = await supabaseAdmin
      .from('campaigns')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ campaign: data })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Delete related data first
    await Promise.all([
      supabaseAdmin.from('activity_logs').delete().eq('campaign_id', id),
      supabaseAdmin.from('leads').delete().eq('campaign_id', id),
      supabaseAdmin.from('campaign_stats').delete().eq('campaign_id', id),
    ])

    const { error } = await supabaseAdmin
      .from('campaigns')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
