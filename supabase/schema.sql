-- AgentOutreach Database Schema
-- AI sales agent SaaS for Solana projects

-- ============================================================
-- TABLES
-- ============================================================

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  plan text default 'starter',
  wallet_address text,
  created_at timestamptz default now(),
  onboarded boolean default false
);

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  name text not null,
  status text default 'active',
  product_url text,
  product_description text,
  icp_persona text,
  icp_chains text,
  icp_interests text,
  icp_keywords text,
  platforms text[] default '{}',
  agent_personality text[] default '{}',
  cta_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id),
  name text not null,
  platform text not null,
  score integer default 0,
  status text default 'new',
  touches integer default 0,
  last_message text,
  first_touch_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id),
  platform text not null,
  action text not null,
  action_type text default 'engagement',
  sentiment text default 'neutral',
  created_at timestamptz default now()
);

create table if not exists campaign_stats (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id) unique,
  impressions integer default 0,
  engagements integer default 0,
  leads_count integer default 0,
  conversions integer default 0,
  daily_actions integer default 0,
  updated_at timestamptz default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists idx_campaigns_user_id on campaigns(user_id);
create index if not exists idx_campaigns_created_at on campaigns(created_at);

create index if not exists idx_leads_campaign_id on leads(campaign_id);
create index if not exists idx_leads_created_at on leads(first_touch_at);

create index if not exists idx_activity_logs_campaign_id on activity_logs(campaign_id);
create index if not exists idx_activity_logs_created_at on activity_logs(created_at);

create index if not exists idx_campaign_stats_campaign_id on campaign_stats(campaign_id);

-- ============================================================
-- ROW LEVEL SECURITY (permissive — tighten later)
-- ============================================================

alter table users enable row level security;
alter table campaigns enable row level security;
alter table leads enable row level security;
alter table activity_logs enable row level security;
alter table campaign_stats enable row level security;

-- Users
create policy "Allow all on users" on users
  for all using (true) with check (true);

-- Campaigns
create policy "Allow all on campaigns" on campaigns
  for all using (true) with check (true);

-- Leads
create policy "Allow all on leads" on leads
  for all using (true) with check (true);

-- Activity Logs
create policy "Allow all on activity_logs" on activity_logs
  for all using (true) with check (true);

-- Campaign Stats
create policy "Allow all on campaign_stats" on campaign_stats
  for all using (true) with check (true);
