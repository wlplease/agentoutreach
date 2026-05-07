export interface User {
  id: string
  email: string
  plan: string
  wallet_address: string | null
  created_at: string
  onboarded: boolean
}

export interface Campaign {
  id: string
  user_id: string
  name: string
  status: string
  product_url: string | null
  product_description: string | null
  icp_persona: string | null
  icp_chains: string | null
  icp_interests: string | null
  icp_keywords: string | null
  platforms: string[]
  agent_personality: string[]
  cta_url: string | null
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  campaign_id: string
  name: string
  platform: string
  score: number
  status: string
  touches: number
  last_message: string | null
  first_touch_at: string
  updated_at: string
}

export interface ActivityLog {
  id: string
  campaign_id: string
  platform: string
  action: string
  action_type: string
  sentiment: string
  created_at: string
}

export interface CampaignStats {
  id: string
  campaign_id: string
  impressions: number
  engagements: number
  leads_count: number
  conversions: number
  daily_actions: number
  updated_at: string
}
