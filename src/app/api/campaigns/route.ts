import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')

    if (!userId) {
      return NextResponse.json({ error: 'user_id is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('campaigns')
      .select('*, campaign_stats(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ campaigns: data })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      user_id,
      name,
      product_url,
      product_description,
      icp_persona,
      icp_chains,
      icp_interests,
      icp_keywords,
      platforms,
      agent_personality,
      cta_url,
    } = body

    if (!user_id || !name) {
      return NextResponse.json({ error: 'user_id and name are required' }, { status: 400 })
    }

    const { data: campaign, error: campaignError } = await supabaseAdmin
      .from('campaigns')
      .insert({
        user_id,
        name,
        status: 'active',
        product_url: product_url || null,
        product_description: product_description || null,
        icp_persona: icp_persona || null,
        icp_chains: icp_chains || null,
        icp_interests: icp_interests || null,
        icp_keywords: icp_keywords || null,
        platforms: platforms || [],
        agent_personality: agent_personality || [],
        cta_url: cta_url || null,
      })
      .select()
      .single()

    if (campaignError) {
      return NextResponse.json({ error: campaignError.message }, { status: 500 })
    }

    const { error: statsError } = await supabaseAdmin
      .from('campaign_stats')
      .insert({
        campaign_id: campaign.id,
        impressions: 0,
        engagements: 0,
        leads_count: 0,
        conversions: 0,
        daily_actions: 0,
      })

    if (statsError) {
      return NextResponse.json({ error: statsError.message }, { status: 500 })
    }

    return NextResponse.json({ campaign }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
