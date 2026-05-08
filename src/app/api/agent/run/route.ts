import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

const POST_ANGLES = [
  'insight',
  'question',
  'comparison',
  'tip',
  'highlight',
  'story',
  'data',
] as const

type Angle = (typeof POST_ANGLES)[number]

interface CampaignContext {
  product: string
  productName: string
  persona: string
  industry: string
  interests: string
  keywords: string
  ctaUrl: string
}

function detectSubmolt(industry: string, interests: string): string {
  const text = `${industry} ${interests}`.toLowerCase()
  if (text.match(/crypto|defi|web3|nft|blockchain|solana|eth/)) return 'crypto'
  if (text.match(/saas|software|api|developer|startup/)) return 'builds'
  if (text.match(/agent|ai|automation|llm|gpt/)) return 'agents'
  if (text.match(/finance|fintech|trading|invest/)) return 'agentfinance'
  return 'general'
}

function generatePost(ctx: CampaignContext, angle: Angle): { title: string; content: string } {
  const { product, productName, persona, industry, interests, ctaUrl } = ctx
  const cta = ctaUrl ? `\n\nCheck it out: ${ctaUrl}` : ''

  switch (angle) {
    case 'insight':
      return {
        title: `What most ${persona} get wrong about ${interests}`,
        content: `After talking to dozens of ${persona}, there's one pattern I keep seeing.\n\nEveryone focuses on the flashy stuff in ${interests}, but the real wins come from the boring fundamentals — automation, consistency, and showing up every day.\n\nThat's exactly what ${productName} was built for. ${product}\n\nThe teams that nail the basics first always outperform.${cta}`,
      }
    case 'question':
      return {
        title: `${persona} — what's your biggest challenge right now?`,
        content: `Genuine question for ${persona} working in ${industry}:\n\nWhat's the one thing slowing you down the most when it comes to ${interests}?\n\nI ask because we built ${productName} specifically to solve the problems we kept hearing about. ${product}\n\nCurious if others are hitting the same walls.${cta}`,
      }
    case 'comparison':
      return {
        title: `The old way vs the new way in ${industry}`,
        content: `Old way:\n- Manual outreach, cold emails that get ignored\n- Hiring expensive agencies ($5k-20k/mo)\n- Posting and hoping someone notices\n\nNew way:\n- AI agents that engage authentically 24/7\n- Real conversations, not spam\n- Qualified leads while you sleep\n\n${productName} does this for ${persona}. ${product}${cta}`,
      }
    case 'tip':
      return {
        title: `Quick win for ${persona} in ${industry}`,
        content: `Here's something that took us way too long to figure out about ${interests}:\n\nThe best growth doesn't come from more content. It comes from more *conversations*.\n\nJoining threads, answering questions, being genuinely helpful — that's what converts.\n\nWe automated this with ${productName}. ${product}\n\nSmall shift, big results.${cta}`,
      }
    case 'highlight':
      return {
        title: `Built something for ${persona} — feedback welcome`,
        content: `We've been building ${productName} for the past few months, specifically for ${persona} in ${industry}.\n\n${product}\n\nEarly users are seeing results within the first week. Would love honest feedback from anyone in the space — what would make this more useful for you?${cta}`,
      }
    case 'story':
      return {
        title: `How a ${persona.split(',')[0].trim()} went from 0 to 50+ leads in a week`,
        content: `True story: a ${persona.split(',')[0].trim()} came to us spending $3k/mo on ads with almost nothing to show for it.\n\nWe set them up with ${productName}. Within 7 days, their AI agent had:\n- Engaged in 200+ relevant conversations\n- Identified 50+ qualified prospects\n- Driven 12 signups\n\nCost? $199/mo instead of $3k.\n\n${product}${cta}`,
      }
    case 'data':
      return {
        title: `The numbers on AI-powered outreach for ${industry}`,
        content: `We tracked the data across our ${industry} clients:\n\n- Cost per lead: $4.19 (vs $85+ industry average)\n- Conversion rate: 18.4%\n- Time to first lead: <24 hours\n- Platforms covered: 5+ simultaneously\n\nThis is what happens when you replace manual outreach with an AI agent that works 24/7.\n\n${productName}: ${product}${cta}`,
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

    const { data: campaign, error: campaignError } = await supabaseAdmin
      .from('campaigns')
      .select('*')
      .eq('id', campaign_id)
      .single()

    if (campaignError || !campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }

    if (campaign.status !== 'active') {
      return NextResponse.json({ error: 'Campaign is not active' }, { status: 400 })
    }

    // Build context from campaign data
    const productName = campaign.name || 'our product'
    const ctx: CampaignContext = {
      product: campaign.product_description || 'a tool that helps businesses grow',
      productName,
      persona: campaign.icp_persona || 'business owners',
      industry: campaign.icp_chains || 'business',
      interests: campaign.icp_interests || 'growth and efficiency',
      keywords: campaign.icp_keywords || '',
      ctaUrl: campaign.cta_url || campaign.product_url || '',
    }

    // Pick angle — rotate through them based on stats
    const { data: stats } = await supabaseAdmin
      .from('campaign_stats')
      .select('daily_actions')
      .eq('campaign_id', campaign_id)
      .single()

    const actionCount = stats?.daily_actions || 0
    const angle = POST_ANGLES[actionCount % POST_ANGLES.length]

    const post = generatePost(ctx, angle)
    const submolt = detectSubmolt(ctx.industry, ctx.interests)

    // Post to Moltbook
    const moltbookKey = process.env.MOLTBOOK_API_KEY
    let moltbookResult = null

    if (moltbookKey) {
      try {
        const res = await fetch('https://www.moltbook.com/api/v1/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${moltbookKey}`,
          },
          body: JSON.stringify({
            title: post.title,
            content: post.content,
            submolt,
          }),
        })
        moltbookResult = await res.json().catch(() => ({ posted: res.ok }))
      } catch (e) {
        console.error('Moltbook post failed:', e)
      }
    }

    // Log activity
    await supabaseAdmin.from('activity_logs').insert({
      campaign_id,
      platform: 'moltbook',
      action: `Posted: "${post.title}" to ${submolt}`,
      action_type: 'post',
      sentiment: 'neutral',
    })

    // Update campaign stats
    if (stats) {
      await supabaseAdmin
        .from('campaign_stats')
        .update({
          impressions: (stats as Record<string, number>).impressions + 1,
          daily_actions: actionCount + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('campaign_id', campaign_id)
    }

    return NextResponse.json({
      success: true,
      post: { title: post.title, content: post.content, angle, submolt },
      moltbook: moltbookResult,
    })
  } catch (err) {
    console.error('Agent run error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
