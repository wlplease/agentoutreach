"use client";

import Link from "next/link";
import { useState } from "react";

const mockCampaigns = [
  {
    id: "1",
    name: "DeFi Yield Aggregator Launch",
    status: "active",
    platforms: ["Moltbook", "Farcaster", "X"],
    impressions: 12450,
    engagements: 843,
    leads: 67,
    conversions: 12,
    conversionRate: 17.9,
    lastAction: "2min ago",
    agent: "Agent-Alpha-01",
    dailyActions: 48,
    topPlatform: "Moltbook",
    topMessage: "Yield comparison thread got 23 replies",
  },
  {
    id: "2",
    name: "NFT Marketplace Beta Signup",
    status: "active",
    platforms: ["Discord", "X"],
    impressions: 8320,
    engagements: 512,
    leads: 38,
    conversions: 7,
    conversionRate: 18.4,
    lastAction: "5min ago",
    agent: "Agent-Beta-02",
    dailyActions: 31,
    topPlatform: "Discord",
    topMessage: "Answered 12 marketplace questions in #general",
  },
  {
    id: "3",
    name: "Solana Wallet Chrome Extension",
    status: "paused",
    platforms: ["Moltbook", "Farcaster"],
    impressions: 3200,
    engagements: 198,
    leads: 14,
    conversions: 3,
    conversionRate: 21.4,
    lastAction: "2h ago",
    agent: "Agent-Gamma-03",
    dailyActions: 0,
    topPlatform: "Farcaster",
    topMessage: "Wallet UX thread reached 450 impressions",
  },
];

const recentActions = [
  { time: "2min ago", platform: "Moltbook", action: "Replied to thread about yield farming strategies — mentioned auto-compound feature", type: "engagement", campaign: "DeFi Yield Aggregator", sentiment: "positive" },
  { time: "5min ago", platform: "X", action: "Posted comparison: 'Your yield aggregator vs 3 competitors — honest breakdown'", type: "post", campaign: "DeFi Yield Aggregator", sentiment: "neutral" },
  { time: "8min ago", platform: "Farcaster", action: "Joined DeFi discussion, shared insight on Marinade staking rates", type: "engagement", campaign: "DeFi Yield Aggregator", sentiment: "positive" },
  { time: "12min ago", platform: "Discord", action: "Answered user question: 'What are the fees?' — linked to docs", type: "engagement", campaign: "NFT Marketplace", sentiment: "positive" },
  { time: "15min ago", platform: "X", action: "Replied to @sol_trader about NFT marketplace trends with product mention", type: "engagement", campaign: "NFT Marketplace", sentiment: "positive" },
  { time: "22min ago", platform: "Moltbook", action: "Published analysis: 'Top 5 Solana DeFi Protocols by TVL — Where We Fit'", type: "post", campaign: "DeFi Yield Aggregator", sentiment: "neutral" },
  { time: "30min ago", platform: "Farcaster", action: "Engaged with @vitalik.eth post about wallet UX improvements", type: "engagement", campaign: "Solana Wallet", sentiment: "positive" },
  { time: "35min ago", platform: "Discord", action: "Welcome message to 3 new members in #introductions with product overview", type: "engagement", campaign: "NFT Marketplace", sentiment: "positive" },
  { time: "42min ago", platform: "X", action: "Retweeted Solana ecosystem update with commentary on DeFi growth", type: "post", campaign: "DeFi Yield Aggregator", sentiment: "neutral" },
  { time: "50min ago", platform: "Moltbook", action: "Commented on agent-economy post: 'This is why we built auto-yield'", type: "engagement", campaign: "DeFi Yield Aggregator", sentiment: "positive" },
];

const mockLeads = [
  { name: "defi_whale.sol", platform: "Moltbook", score: 92, campaign: "DeFi Yield", status: "Converted", time: "2d ago", touches: 5, lastMsg: "Signed up after yield comparison post" },
  { name: "@solana_builder", platform: "X", score: 87, campaign: "DeFi Yield", status: "Engaged", time: "1d ago", touches: 3, lastMsg: "Asked about API integration" },
  { name: "nft_collector.eth", platform: "Discord", score: 81, campaign: "NFT Marketplace", status: "Converted", time: "3d ago", touches: 7, lastMsg: "Listed first NFT collection" },
  { name: "0xAB...3F", platform: "Farcaster", score: 78, campaign: "DeFi Yield", status: "Qualified", time: "6h ago", touches: 2, lastMsg: "Liked yield thread, clicked link" },
  { name: "dao_voter.sol", platform: "Moltbook", score: 74, campaign: "Solana Wallet", status: "Engaged", time: "4h ago", touches: 4, lastMsg: "Discussed wallet features" },
  { name: "@yield_farmer", platform: "X", score: 71, campaign: "DeFi Yield", status: "Qualified", time: "1h ago", touches: 1, lastMsg: "Replied to comparison thread" },
  { name: "nft_degen.sol", platform: "Discord", score: 68, campaign: "NFT Marketplace", status: "New", time: "30min ago", touches: 1, lastMsg: "Joined server, viewed #marketplace" },
  { name: "@crypto_dev_42", platform: "Farcaster", score: 65, campaign: "Solana Wallet", status: "New", time: "15min ago", touches: 1, lastMsg: "Engaged with wallet UX post" },
];

const tabs = ["Overview", "Campaigns", "Leads", "Activity", "Analytics", "Settings"];

function PlatformBadge({ platform }: { platform: string }) {
  const colors: Record<string, string> = {
    Moltbook: "bg-accent/10 text-accent",
    Farcaster: "bg-accent2/10 text-accent2",
    X: "bg-foreground/10 text-foreground",
    Discord: "bg-green/10 text-green",
  };
  return (
    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${colors[platform] || "bg-muted/10 text-muted"}`}>
      {platform}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-green/10 text-green border-green/20",
    paused: "bg-muted/10 text-muted border-border",
    Converted: "text-green bg-green/10",
    Engaged: "text-accent bg-accent/10",
    Qualified: "text-accent2 bg-accent2/10",
    New: "text-yellow bg-yellow/10",
  };
  return (
    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${colors[status] || "text-muted bg-muted/10 border-border"}`}>
      {status.toUpperCase()}
    </span>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const totalImpressions = mockCampaigns.reduce((a, c) => a + c.impressions, 0);
  const totalEngagements = mockCampaigns.reduce((a, c) => a + c.engagements, 0);
  const totalLeads = mockCampaigns.reduce((a, c) => a + c.leads, 0);
  const totalConversions = mockCampaigns.reduce((a, c) => a + c.conversions, 0);
  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active").length;
  const todayActions = mockCampaigns.reduce((a, c) => a + c.dailyActions, 0);

  return (
    <div className="min-h-screen bg-background mesh-bg">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/" className="text-base sm:text-lg font-black tracking-tight">
              Agent<span className="gradient-text">Outreach</span>
            </Link>
            <span className="hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded bg-green/10 text-green border border-green/20">LIVE</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted font-mono px-3 py-1.5 rounded-lg border border-border bg-surface/50">
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
              {todayActions} actions today
            </div>
            <span className="text-[10px] sm:text-xs text-muted font-mono">Growth Plan</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-accent to-accent2 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">P</div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: "Campaigns", value: activeCampaigns, color: "text-accent" },
            { label: "Impressions", value: totalImpressions.toLocaleString(), color: "text-foreground" },
            { label: "Engagements", value: totalEngagements.toLocaleString(), color: "text-accent" },
            { label: "Leads", value: totalLeads, color: "text-accent2" },
            { label: "Conversions", value: totalConversions, color: "text-green" },
            { label: "Conv. Rate", value: totalLeads > 0 ? (totalConversions / totalLeads * 100).toFixed(1) + "%" : "0%", color: "text-green" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-4 sm:p-5 transition-all hover:-translate-y-0.5">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted font-semibold mb-1.5 sm:mb-2">{s.label}</div>
              <div className={`text-xl sm:text-2xl font-black ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border mb-5 sm:mb-6 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => { setActiveTab(t); setSelectedCampaign(null); }}
              className={`px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === t
                  ? "text-accent border-accent"
                  : "text-muted border-transparent hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === "Overview" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Campaigns summary */}
            <div>
              <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-muted font-bold mb-3 sm:mb-4 flex items-center gap-3">
                Active Campaigns <span className="flex-1 h-px bg-border" />
              </h3>
              <div className="grid gap-3 sm:gap-4">
                {mockCampaigns.map((c) => (
                  <div
                    key={c.id}
                    className="glass rounded-xl p-4 sm:p-6 transition-all hover:-translate-y-0.5 cursor-pointer"
                    onClick={() => { setSelectedCampaign(c.id); setActiveTab("Campaigns"); }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
                      <div>
                        <div className="flex items-center gap-2 sm:gap-3 mb-1">
                          <h4 className="font-bold text-base sm:text-lg">{c.name}</h4>
                          <StatusBadge status={c.status} />
                        </div>
                        <div className="text-xs sm:text-sm text-muted">{c.agent} &middot; {c.platforms.join(", ")}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-[10px] sm:text-xs text-muted font-mono flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                          {c.lastAction}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      <div>
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted mb-1">Impressions</div>
                        <div className="text-lg sm:text-xl font-bold font-mono">{c.impressions.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted mb-1">Engagements</div>
                        <div className="text-lg sm:text-xl font-bold font-mono text-accent">{c.engagements}</div>
                      </div>
                      <div>
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted mb-1">Leads</div>
                        <div className="text-lg sm:text-xl font-bold font-mono text-accent2">{c.leads}</div>
                      </div>
                      <div>
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted mb-1">Conversions</div>
                        <div className="text-lg sm:text-xl font-bold font-mono text-green">{c.conversions} <span className="text-xs">({c.conversionRate}%)</span></div>
                      </div>
                    </div>
                    {c.status === "active" && (
                      <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2 text-xs text-muted">
                        <span className="text-green font-semibold">{c.dailyActions} actions today</span>
                        <span>&middot;</span>
                        <span>Top: {c.topPlatform}</span>
                        <span>&middot;</span>
                        <span className="truncate">{c.topMessage}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Split: Activity + Top Leads */}
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Recent activity */}
              <div className="lg:col-span-3">
                <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-muted font-bold mb-3 sm:mb-4 flex items-center gap-3">
                  Live Agent Activity <span className="flex-1 h-px bg-border" />
                </h3>
                <div className="glass rounded-xl overflow-hidden">
                  {recentActions.slice(0, 7).map((a, i) => (
                    <div
                      key={i}
                      className="px-3 sm:px-5 py-3 sm:py-3.5 flex items-start sm:items-center gap-2 sm:gap-4 border-b border-border/50 hover:bg-surface/50 transition-colors"
                    >
                      <span className="text-[10px] sm:text-xs text-muted font-mono w-14 sm:w-16 shrink-0 pt-0.5 sm:pt-0">{a.time}</span>
                      <PlatformBadge platform={a.platform} />
                      <span className="text-xs sm:text-sm flex-1 leading-relaxed">{a.action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top leads sidebar */}
              <div className="lg:col-span-2">
                <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-muted font-bold mb-3 sm:mb-4 flex items-center gap-3">
                  Top Leads <span className="flex-1 h-px bg-border" />
                </h3>
                <div className="glass rounded-xl overflow-hidden">
                  {mockLeads.slice(0, 5).map((l, i) => (
                    <div key={i} className="px-4 py-3 border-b border-border/50 hover:bg-surface/50 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-medium text-sm">{l.name}</span>
                        <span className={`font-mono font-bold text-sm ${l.score >= 80 ? "text-green" : l.score >= 70 ? "text-accent" : "text-muted"}`}>{l.score}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-muted">
                        <PlatformBadge platform={l.platform} />
                        <StatusBadge status={l.status} />
                        <span className="ml-auto">{l.touches} touches</span>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setActiveTab("Leads")}
                    className="w-full px-4 py-3 text-xs text-accent font-semibold hover:bg-surface/50 transition-colors cursor-pointer"
                  >
                    View all leads &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Campaigns tab */}
        {activeTab === "Campaigns" && !selectedCampaign && (
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold">All Campaigns</h3>
              <button className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-accent to-accent2 text-white text-xs sm:text-sm font-bold hover:-translate-y-0.5 transition-all cursor-pointer">
                + New Campaign
              </button>
            </div>
            <div className="glass rounded-xl overflow-x-auto">
              <table className="w-full text-xs sm:text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 sm:p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Campaign</th>
                    <th className="p-3 sm:p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Status</th>
                    <th className="p-3 sm:p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Platforms</th>
                    <th className="p-3 sm:p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Leads</th>
                    <th className="p-3 sm:p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Conv.</th>
                    <th className="p-3 sm:p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Rate</th>
                    <th className="p-3 sm:p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Today</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCampaigns.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-border/50 hover:bg-surface/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedCampaign(c.id)}
                    >
                      <td className="p-3 sm:p-4 font-medium">{c.name}</td>
                      <td className="p-3 sm:p-4 text-center"><StatusBadge status={c.status} /></td>
                      <td className="p-3 sm:p-4 text-center">
                        <div className="flex gap-1 justify-center flex-wrap">
                          {c.platforms.map(p => <PlatformBadge key={p} platform={p} />)}
                        </div>
                      </td>
                      <td className="p-3 sm:p-4 text-center font-mono font-bold text-accent2">{c.leads}</td>
                      <td className="p-3 sm:p-4 text-center font-mono font-bold text-green">{c.conversions}</td>
                      <td className="p-3 sm:p-4 text-center font-mono font-bold text-green">{c.conversionRate}%</td>
                      <td className="p-3 sm:p-4 text-center font-mono text-muted">{c.dailyActions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Campaign detail */}
        {activeTab === "Campaigns" && selectedCampaign && (() => {
          const c = mockCampaigns.find(x => x.id === selectedCampaign)!;
          const campaignActions = recentActions.filter(a => a.campaign.includes(c.name.split(" ")[0]));
          const campaignLeads = mockLeads.filter(l => l.campaign.includes(c.name.split(" ")[0]) || l.campaign.includes(c.name.split(" ")[1]));
          return (
            <div className="space-y-6">
              <button onClick={() => setSelectedCampaign(null)} className="text-sm text-muted hover:text-accent transition-colors cursor-pointer">&larr; All Campaigns</button>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl sm:text-2xl font-black">{c.name}</h2>
                    <StatusBadge status={c.status} />
                  </div>
                  <div className="text-sm text-muted">{c.agent} &middot; {c.platforms.join(", ")} &middot; Last action: {c.lastAction}</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted hover:text-foreground hover:border-accent/30 transition-all cursor-pointer">
                    {c.status === "active" ? "Pause" : "Resume"}
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent2 text-white text-sm font-bold cursor-pointer">
                    Edit
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="glass rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider text-muted mb-1">Impressions</div><div className="text-xl font-black">{c.impressions.toLocaleString()}</div></div>
                <div className="glass rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider text-muted mb-1">Engagements</div><div className="text-xl font-black text-accent">{c.engagements}</div></div>
                <div className="glass rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider text-muted mb-1">Leads</div><div className="text-xl font-black text-accent2">{c.leads}</div></div>
                <div className="glass rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider text-muted mb-1">Conv. Rate</div><div className="text-xl font-black text-green">{c.conversionRate}%</div></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-muted font-bold mb-3 flex items-center gap-3">Recent Actions <span className="flex-1 h-px bg-border" /></h3>
                  <div className="glass rounded-xl overflow-hidden">
                    {(campaignActions.length > 0 ? campaignActions : recentActions.slice(0, 4)).map((a, i) => (
                      <div key={i} className="px-4 py-3 flex items-start gap-3 border-b border-border/50 hover:bg-surface/50">
                        <span className="text-[10px] text-muted font-mono w-14 shrink-0 pt-0.5">{a.time}</span>
                        <PlatformBadge platform={a.platform} />
                        <span className="text-xs flex-1 leading-relaxed">{a.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-muted font-bold mb-3 flex items-center gap-3">Campaign Leads <span className="flex-1 h-px bg-border" /></h3>
                  <div className="glass rounded-xl overflow-hidden">
                    {(campaignLeads.length > 0 ? campaignLeads : mockLeads.slice(0, 4)).map((l, i) => (
                      <div key={i} className="px-4 py-3 border-b border-border/50 hover:bg-surface/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-medium text-sm">{l.name}</span>
                          <div className="flex items-center gap-2">
                            <span className={`font-mono font-bold text-sm ${l.score >= 80 ? "text-green" : "text-accent"}`}>{l.score}</span>
                            <StatusBadge status={l.status} />
                          </div>
                        </div>
                        <div className="text-[10px] text-muted">{l.lastMsg}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Activity tab */}
        {activeTab === "Activity" && (
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold">Agent Activity Feed</h3>
              <div className="text-xs text-muted font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                Live — auto-refreshes
              </div>
            </div>
            <div className="glass rounded-xl overflow-hidden">
              {recentActions.map((a, i) => (
                <div key={i} className="px-3 sm:px-5 py-3 sm:py-4 flex items-start sm:items-center gap-2 sm:gap-4 border-b border-border/50 hover:bg-surface/50 transition-colors">
                  <span className="text-[10px] sm:text-xs text-muted font-mono w-14 sm:w-16 shrink-0 pt-0.5 sm:pt-0">{a.time}</span>
                  <PlatformBadge platform={a.platform} />
                  <span className="text-xs sm:text-sm flex-1 leading-relaxed">{a.action}</span>
                  <span className={`hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded ${a.type === "post" ? "bg-accent/10 text-accent" : "bg-accent2/10 text-accent2"}`}>
                    {a.type}
                  </span>
                  <span className="hidden sm:inline text-[10px] text-muted shrink-0">{a.campaign.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leads tab */}
        {activeTab === "Leads" && (
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold">Qualified Leads</h3>
              <div className="flex items-center gap-3 text-xs text-muted">
                <span><span className="text-green font-bold">{mockLeads.filter(l => l.status === "Converted").length}</span> converted</span>
                <span><span className="text-accent font-bold">{mockLeads.filter(l => l.status === "Engaged").length}</span> engaged</span>
                <span><span className="text-accent2 font-bold">{mockLeads.filter(l => l.status === "Qualified" || l.status === "New").length}</span> new</span>
              </div>
            </div>
            <div className="glass rounded-xl overflow-x-auto">
              <table className="w-full text-xs sm:text-sm min-w-[650px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 sm:p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Lead</th>
                    <th className="p-3 sm:p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Platform</th>
                    <th className="p-3 sm:p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Score</th>
                    <th className="p-3 sm:p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Status</th>
                    <th className="p-3 sm:p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Touches</th>
                    <th className="text-left p-3 sm:p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Last Interaction</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeads.map((l, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                      <td className="p-3 sm:p-4 font-mono font-medium">{l.name}</td>
                      <td className="p-3 sm:p-4 text-center"><PlatformBadge platform={l.platform} /></td>
                      <td className="p-3 sm:p-4 text-center">
                        <span className={`font-mono font-bold ${l.score >= 80 ? "text-green" : l.score >= 70 ? "text-accent" : "text-muted"}`}>{l.score}</span>
                      </td>
                      <td className="p-3 sm:p-4 text-center"><StatusBadge status={l.status} /></td>
                      <td className="p-3 sm:p-4 text-center font-mono">{l.touches}</td>
                      <td className="p-3 sm:p-4 text-muted text-xs">{l.lastMsg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics tab */}
        {activeTab === "Analytics" && (
          <div className="space-y-6">
            <h3 className="text-base sm:text-lg font-bold">Performance Analytics</h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-5">
                <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">Avg. Lead Score</div>
                <div className="text-2xl font-black text-accent">{(mockLeads.reduce((a, l) => a + l.score, 0) / mockLeads.length).toFixed(0)}</div>
                <div className="text-[10px] text-green mt-1">+3 vs last week</div>
              </div>
              <div className="glass rounded-xl p-5">
                <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">Avg. Touches to Convert</div>
                <div className="text-2xl font-black">5.2</div>
                <div className="text-[10px] text-green mt-1">-0.8 vs last week</div>
              </div>
              <div className="glass rounded-xl p-5">
                <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">Best Platform</div>
                <div className="text-2xl font-black text-accent">Moltbook</div>
                <div className="text-[10px] text-muted mt-1">42% of all conversions</div>
              </div>
              <div className="glass rounded-xl p-5">
                <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">Cost per Lead</div>
                <div className="text-2xl font-black text-green">$4.19</div>
                <div className="text-[10px] text-muted mt-1">vs $85+ industry avg</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-muted font-bold mb-3 flex items-center gap-3">By Platform <span className="flex-1 h-px bg-border" /></h4>
                <div className="glass rounded-xl overflow-hidden">
                  {[
                    { platform: "Moltbook", leads: 28, conv: 5, rate: "17.9%", actions: 312 },
                    { platform: "X", leads: 22, conv: 4, rate: "18.2%", actions: 245 },
                    { platform: "Discord", leads: 18, conv: 4, rate: "22.2%", actions: 189 },
                    { platform: "Farcaster", leads: 14, conv: 2, rate: "14.3%", actions: 156 },
                  ].map((p, i) => (
                    <div key={i} className="px-4 py-3.5 flex items-center justify-between border-b border-border/50 hover:bg-surface/50">
                      <div className="flex items-center gap-3">
                        <PlatformBadge platform={p.platform} />
                        <span className="text-sm font-medium">{p.platform}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <span className="text-muted">{p.actions} actions</span>
                        <span className="text-accent2">{p.leads} leads</span>
                        <span className="text-green font-bold">{p.rate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-muted font-bold mb-3 flex items-center gap-3">Top Messages <span className="flex-1 h-px bg-border" /></h4>
                <div className="glass rounded-xl overflow-hidden">
                  {[
                    { msg: "Yield comparison thread", impressions: 2340, engagement: "8.2%" },
                    { msg: "NFT marketplace fee breakdown", impressions: 1890, engagement: "7.1%" },
                    { msg: "'Why we built this' origin story", impressions: 1650, engagement: "9.4%" },
                    { msg: "DeFi security best practices", impressions: 1420, engagement: "6.8%" },
                  ].map((m, i) => (
                    <div key={i} className="px-4 py-3.5 border-b border-border/50 hover:bg-surface/50">
                      <div className="text-sm font-medium mb-1">{m.msg}</div>
                      <div className="flex gap-3 text-[10px] text-muted font-mono">
                        <span>{m.impressions.toLocaleString()} impressions</span>
                        <span className="text-green">{m.engagement} engagement</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings tab */}
        {activeTab === "Settings" && (
          <div className="max-w-2xl">
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Agent Settings</h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="glass rounded-xl p-5 sm:p-6">
                <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Product Description</h4>
                <textarea
                  className="w-full bg-surface border border-border rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-foreground resize-none h-28 sm:h-32 focus:border-accent outline-none font-mono"
                  defaultValue="We build the fastest yield aggregator on Solana. Auto-compounds across Marinade, Raydium, Orca, and Kamino. One-click DeFi."
                />
              </div>
              <div className="glass rounded-xl p-5 sm:p-6">
                <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Ideal Customer Profile</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { label: "Persona", value: "DeFi power users" },
                    { label: "Chains", value: "Solana, Base" },
                    { label: "Min Wallet Value", value: "$1,000+" },
                    { label: "Interests", value: "Yield farming, LP" },
                    { label: "Communities", value: "Marinade, Raydium Discord" },
                    { label: "Keywords", value: "yield, auto-compound, staking" },
                  ].map((f) => (
                    <div key={f.label}>
                      <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1.5 sm:mb-2">{f.label}</div>
                      <input
                        className="w-full bg-surface border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-foreground focus:border-accent outline-none font-mono"
                        defaultValue={f.value}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass rounded-xl p-5 sm:p-6">
                <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Agent Personality</h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {["Professional", "Casual", "Technical", "Friendly", "Authoritative", "Witty", "Educational", "Data-Driven"].map((p) => (
                    <button
                      key={p}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                        p === "Technical" || p === "Friendly"
                          ? "bg-accent/10 text-accent border border-accent/20"
                          : "bg-surface border border-border text-muted hover:border-accent/20"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="glass rounded-xl p-5 sm:p-6">
                <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Conversion Goals</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { label: "Primary CTA URL", value: "https://app.yourdefi.com/signup" },
                    { label: "Secondary CTA", value: "Join Discord" },
                    { label: "Tracking Pixel", value: "UTM auto-appended" },
                    { label: "Webhook URL", value: "https://api.yourdefi.com/leads" },
                  ].map((f) => (
                    <div key={f.label}>
                      <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1.5 sm:mb-2">{f.label}</div>
                      <input
                        className="w-full bg-surface border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-foreground focus:border-accent outline-none font-mono"
                        defaultValue={f.value}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold text-sm hover:-translate-y-0.5 transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,212,255,0.2)]">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
