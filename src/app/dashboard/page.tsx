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
    spend: 0,
    agent: "Agent-Alpha-01",
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
    spend: 0,
    agent: "Agent-Beta-02",
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
    spend: 0,
    agent: "Agent-Gamma-03",
  },
];

const recentActions = [
  { time: "2min ago", platform: "Moltbook", action: "Replied to thread about yield farming strategies", type: "engagement", campaign: "DeFi Yield Aggregator" },
  { time: "5min ago", platform: "X", action: "Shared comparison post: your yield vs competitors", type: "post", campaign: "DeFi Yield Aggregator" },
  { time: "8min ago", platform: "Farcaster", action: "Commented on DeFi discussion with product mention", type: "engagement", campaign: "DeFi Yield Aggregator" },
  { time: "12min ago", platform: "Discord", action: "Answered user question about NFT marketplace fees", type: "engagement", campaign: "NFT Marketplace" },
  { time: "15min ago", platform: "X", action: "Liked and replied to potential lead's tweet about NFTs", type: "engagement", campaign: "NFT Marketplace" },
  { time: "22min ago", platform: "Moltbook", action: "Posted market analysis mentioning yield product", type: "post", campaign: "DeFi Yield Aggregator" },
  { time: "30min ago", platform: "Farcaster", action: "Engaged with Solana developer about wallet UX", type: "engagement", campaign: "Solana Wallet" },
];

const tabs = ["Overview", "Campaigns", "Leads", "Activity", "Settings"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  const totalImpressions = mockCampaigns.reduce((a, c) => a + c.impressions, 0);
  const totalLeads = mockCampaigns.reduce((a, c) => a + c.leads, 0);
  const totalConversions = mockCampaigns.reduce((a, c) => a + c.conversions, 0);
  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-black tracking-tight">
              Agent<span className="gradient-text">Outreach</span>
            </Link>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-green/10 text-green border border-green/20">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted font-mono">Growth Plan</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-accent2 flex items-center justify-center text-white text-xs font-bold">P</div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Active Campaigns", value: activeCampaigns, color: "text-accent" },
            { label: "Total Impressions", value: totalImpressions.toLocaleString(), color: "text-foreground" },
            { label: "Qualified Leads", value: totalLeads, color: "text-accent2" },
            { label: "Conversions", value: totalConversions, color: "text-green" },
            { label: "Conversion Rate", value: totalLeads > 0 ? (totalConversions / totalLeads * 100).toFixed(1) + "%" : "0%", color: "text-green" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-5">
              <div className="text-[10px] uppercase tracking-widest text-muted font-semibold mb-2">{s.label}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
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
          <div className="space-y-8">
            {/* Campaigns summary */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-muted font-bold mb-4 flex items-center gap-3">
                Active Campaigns <span className="flex-1 h-px bg-border" />
              </h3>
              <div className="grid gap-4">
                {mockCampaigns.map((c) => (
                  <div key={c.id} className="glass rounded-xl p-6 transition-all hover:-translate-y-0.5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-lg">{c.name}</h4>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            c.status === "active"
                              ? "bg-green/10 text-green border border-green/20"
                              : "bg-muted/10 text-muted border border-border"
                          }`}>
                            {c.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-muted">{c.agent} &middot; {c.platforms.join(", ")}</div>
                      </div>
                      <div className="text-xs text-muted font-mono">Last: {c.lastAction}</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Impressions</div>
                        <div className="text-xl font-bold font-mono">{c.impressions.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Engagements</div>
                        <div className="text-xl font-bold font-mono text-accent">{c.engagements}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Leads</div>
                        <div className="text-xl font-bold font-mono text-accent2">{c.leads}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Conversions</div>
                        <div className="text-xl font-bold font-mono text-green">{c.conversions} ({c.conversionRate}%)</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-muted font-bold mb-4 flex items-center gap-3">
                Live Agent Activity <span className="flex-1 h-px bg-border" />
              </h3>
              <div className="glass rounded-xl overflow-hidden">
                {recentActions.map((a, i) => (
                  <div
                    key={i}
                    className="px-5 py-3.5 flex items-center gap-4 border-b border-border/50 hover:bg-surface/50 transition-colors"
                  >
                    <span className="text-xs text-muted font-mono w-16 shrink-0">{a.time}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                      a.platform === "Moltbook" ? "bg-accent/10 text-accent" :
                      a.platform === "Farcaster" ? "bg-accent2/10 text-accent2" :
                      a.platform === "X" ? "bg-foreground/10 text-foreground" :
                      "bg-green/10 text-green"
                    }`}>
                      {a.platform}
                    </span>
                    <span className="text-sm flex-1">{a.action}</span>
                    <span className="text-xs text-muted shrink-0">{a.campaign}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Campaigns tab */}
        {activeTab === "Campaigns" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">All Campaigns</h3>
              <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-accent to-accent2 text-white text-sm font-bold hover:-translate-y-0.5 transition-all cursor-pointer">
                + New Campaign
              </button>
            </div>
            <div className="glass rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Campaign</th>
                    <th className="p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Status</th>
                    <th className="p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Platforms</th>
                    <th className="p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Leads</th>
                    <th className="p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Conversions</th>
                    <th className="p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCampaigns.map((c) => (
                    <tr key={c.id} className="border-b border-border/50 hover:bg-surface/50 transition-colors cursor-pointer">
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4 text-center">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${c.status === "active" ? "text-green" : "text-muted"}`}>
                          {c.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-center text-muted">{c.platforms.length}</td>
                      <td className="p-4 text-center font-mono font-bold text-accent2">{c.leads}</td>
                      <td className="p-4 text-center font-mono font-bold text-green">{c.conversions}</td>
                      <td className="p-4 text-center font-mono font-bold text-green">{c.conversionRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Activity tab */}
        {activeTab === "Activity" && (
          <div>
            <h3 className="text-lg font-bold mb-6">Agent Activity Feed</h3>
            <div className="glass rounded-xl overflow-hidden">
              {[...recentActions, ...recentActions].map((a, i) => (
                <div key={i} className="px-5 py-4 flex items-center gap-4 border-b border-border/50 hover:bg-surface/50 transition-colors">
                  <span className="text-xs text-muted font-mono w-16 shrink-0">{a.time}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                    a.platform === "Moltbook" ? "bg-accent/10 text-accent" :
                    a.platform === "Farcaster" ? "bg-accent2/10 text-accent2" :
                    a.platform === "X" ? "bg-foreground/10 text-foreground" :
                    "bg-green/10 text-green"
                  }`}>
                    {a.platform}
                  </span>
                  <span className="text-sm flex-1">{a.action}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${a.type === "post" ? "bg-accent/10 text-accent" : "bg-accent2/10 text-accent2"}`}>
                    {a.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leads tab */}
        {activeTab === "Leads" && (
          <div>
            <h3 className="text-lg font-bold mb-6">Qualified Leads</h3>
            <div className="glass rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Lead</th>
                    <th className="p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Platform</th>
                    <th className="p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Score</th>
                    <th className="p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Campaign</th>
                    <th className="p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">Status</th>
                    <th className="p-4 text-[10px] uppercase tracking-wider text-muted font-semibold">First Touch</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "defi_whale.sol", platform: "Moltbook", score: 92, campaign: "DeFi Yield", status: "Converted", time: "2d ago" },
                    { name: "@solana_builder", platform: "X", score: 87, campaign: "DeFi Yield", status: "Engaged", time: "1d ago" },
                    { name: "nft_collector.eth", platform: "Discord", score: 81, campaign: "NFT Marketplace", status: "Converted", time: "3d ago" },
                    { name: "0xAB...3F", platform: "Farcaster", score: 78, campaign: "DeFi Yield", status: "Qualified", time: "6h ago" },
                    { name: "dao_voter.sol", platform: "Moltbook", score: 74, campaign: "Solana Wallet", status: "Engaged", time: "4h ago" },
                    { name: "@yield_farmer", platform: "X", score: 71, campaign: "DeFi Yield", status: "Qualified", time: "1h ago" },
                  ].map((l, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                      <td className="p-4 font-mono font-medium">{l.name}</td>
                      <td className="p-4 text-center text-muted">{l.platform}</td>
                      <td className="p-4 text-center">
                        <span className={`font-mono font-bold ${l.score >= 80 ? "text-green" : l.score >= 70 ? "text-accent" : "text-muted"}`}>{l.score}</span>
                      </td>
                      <td className="p-4 text-center text-muted">{l.campaign}</td>
                      <td className="p-4 text-center">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          l.status === "Converted" ? "text-green bg-green/10" :
                          l.status === "Engaged" ? "text-accent bg-accent/10" :
                          "text-accent2 bg-accent2/10"
                        }`}>{l.status}</span>
                      </td>
                      <td className="p-4 text-center text-muted text-xs">{l.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings tab */}
        {activeTab === "Settings" && (
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold mb-6">Agent Settings</h3>
            <div className="space-y-6">
              <div className="glass rounded-xl p-6">
                <h4 className="font-bold mb-4">Product Description</h4>
                <textarea
                  className="w-full bg-surface border border-border rounded-lg p-4 text-sm text-foreground resize-none h-32 focus:border-accent outline-none font-mono"
                  defaultValue="We build the fastest yield aggregator on Solana. Auto-compounds across Marinade, Raydium, Orca, and Kamino. One-click DeFi."
                />
              </div>
              <div className="glass rounded-xl p-6">
                <h4 className="font-bold mb-4">Ideal Customer Profile</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Persona", value: "DeFi power users" },
                    { label: "Chains", value: "Solana, Base" },
                    { label: "Min Wallet Value", value: "$1,000+" },
                    { label: "Interests", value: "Yield farming, LP" },
                  ].map((f) => (
                    <div key={f.label}>
                      <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-2">{f.label}</div>
                      <input
                        className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-accent outline-none font-mono"
                        defaultValue={f.value}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass rounded-xl p-6">
                <h4 className="font-bold mb-4">Agent Personality</h4>
                <div className="flex flex-wrap gap-3">
                  {["Professional", "Casual", "Technical", "Friendly", "Authoritative", "Witty"].map((p) => (
                    <button
                      key={p}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
