import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

const POST_ANGLES = [
  'insight',
  'question',
  'comparison',
  'tip',
  'highlight',
] as const

function generatePost(
  productDescription: string,
  icpPersona: string | null,
  icpChains: string | null,
  icpInterests: string | null,
  angle: (typeof POST_ANGLES)[number]
): { title: string; content: string } {
  const persona = icpPersona || 'crypto builders'
  const chains = icpChains || 'EVM chains'
  const interests = icpInterests || 'DeFi and web3'
  const product = productDescription || 'our product'

  switch (angle) {
    case 'insight':
      return {
        title: `What ${persona} are missing about ${interests}`,
        content: `I've been studying how ${persona} interact with ${interests} on ${chains}, and there's a clear pattern emerging.\n\nMost people overlook the tooling layer — but that's where the real leverage is.\n\n${product}\n\nThe teams that figure this out early will have a massive edge. What patterns are you seeing?`,
      }
    case 'question':
      return {
        title: `Question for ${persona} building on ${chains}`,
        content: `Curious to hear from fellow ${persona} — what's your biggest friction point when working with ${interests}?\n\nI've been exploring solutions in this space and ${product}\n\nWould love to hear what's worked (and what hasn't) for you.`,
      }
    case 'comparison':
      return {
        title: `The old way vs the new way for ${interests}`,
        content: `Old way: manually managing ${interests} workflows, losing hours every week.\n\nNew way: ${product}\n\nThe difference is night and day, especially for ${persona} building on ${chains}. Automation isn't just nice-to-have anymore — it's table stakes.`,
      }
    case 'tip':
      return {
        title: `Quick tip for ${persona} in ${interests}`,
        content: `If you're a ${persona} working in ${interests}, here's something that saved me a ton of time:\n\n${product}\n\nSmall optimizations compound fast, especially on ${chains}. What tools are in your daily stack?`,
      }
    case 'highlight':
      return {
        title: `Why ${persona} should pay attention to this`,
        content: `Sharing something I've been using that's been a game-changer for ${interests} on ${chains}.\n\n${product}\n\nIf you're a ${persona}, this is worth checking out. The space is moving fast and the right tools make all the difference.`,
      }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { campaign_id } = body

    if (!campaign_id) {
      return NextResponse.json({ error: 'campaign_id is required' }, { status: 400 })
    }

    // Fetch the campaign
    const { data: campaign, error: campaignError } = await supabaseAdmin
      .from('campaigns')
      .select('*')
      .eq('id', campaign_id)
      .single()

    if (campaignError || !campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }

    // Pick a random angle for this post
    const angle = POST_ANGLES[Math.floor(Math.random() * POST_ANGLES.length)]

    // Generate the post content
    const post = generatePost(
      campaign.product_description,
      campaign.icp_persona,
      campaign.icp_chains,
      campaign.icp_interests,
      angle
    )

    // Post to Moltbook
    const moltbookKey = process.env.MOLTBOOK_API_KEY
    if (!moltbookKey) {
      return NextResponse.json({ error: 'MOLTBOOK_API_KEY not configured' }, { status: 500 })
    }

    const moltbookResponse = await fetch('https://www.moltbook.com/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${moltbookKey}`,
      },
      body: JSON.stringify({
        title: post.title,
        content: post.content,
        submolt: 'crypto',
      }),
    })

    const moltbookData = await moltbookResponse.json().catch(() => null)

    if (!moltbookResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to post to Moltbook', details: moltbookData },
        { status: 502 }
      )
    }

    // Log activity
    await supabaseAdmin.from('activity_logs').insert({
      campaign_id,
      platform: 'moltbook',
      action: `Posted: ${post.title}`,
      action_type: 'post',
      sentiment: 'neutral',
    })

    // Increment campaign stats
    const { data: stats } = await supabaseAdmin
      .from('campaign_stats')
      .select('impressions, daily_actions')
      .eq('campaign_id', campaign_id)
      .single()

    if (stats) {
      await supabaseAdmin
        .from('campaign_stats')
        .update({
          impressions: stats.impressions + 1,
          daily_actions: stats.daily_actions + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('campaign_id', campaign_id)
    }

    return NextResponse.json({
      success: true,
      post: {
        title: post.title,
        content: post.content,
        angle,
      },
      moltbook: moltbookData,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
