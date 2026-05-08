"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

/* eslint-disable @typescript-eslint/no-explicit-any */

const tabs = ["Overview", "Campaigns", "Leads", "Activity", "Analytics", "Settings"];

function PlatformBadge({ platform }: { platform: string }) {
  const colors: Record<string, string> = {
    moltbook: "bg-accent/10 text-accent",
    Moltbook: "bg-accent/10 text-accent",
    farcaster: "bg-accent2/10 text-accent2",
    Farcaster: "bg-accent2/10 text-accent2",
    x: "bg-foreground/10 text-foreground",
    X: "bg-foreground/10 text-foreground",
    discord: "bg-green/10 text-green",
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
    converted: "text-green bg-green/10",
    Engaged: "text-accent bg-accent/10",
    engaged: "text-accent bg-accent/10",
    Qualified: "text-accent2 bg-accent2/10",
    qualified: "text-accent2 bg-accent2/10",
    New: "text-yellow bg-yellow/10",
    new: "text-yellow bg-yellow/10",
  };
  return (
    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${colors[status] || "text-muted bg-muted/10 border-border"}`}>
      {(status || "unknown").toUpperCase()}
    </span>
  );
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-32">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-accent/20 to-accent2/20 flex items-center justify-center mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2">No campaigns yet</h2>
      <p className="text-muted text-sm mb-6 text-center max-w-md">
        Create your first outreach campaign and let your AI agent start engaging with potential customers.
      </p>
      <Link
        href="/onboarding"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold text-sm shadow-[0_4px_24px_rgba(0,212,255,0.25)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] hover:-translate-y-0.5 transition-all"
      >
        Create Your First Campaign
      </Link>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [activityLoading, setActivityLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load campaigns on mount
  useEffect(() => {
    async function loadCampaigns() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`/api/campaigns?user_id=${user.id}`);
        if (!res.ok) throw new Error("Failed to load campaigns");
        const data = await res.json();
        setCampaigns(data.campaigns || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    loadCampaigns();
  }, [router]);

  // Fetch leads when Leads tab is active or a campaign is selected
  const fetchLeads = useCallback(async (campaignId: string) => {
    setLeadsLoading(true);
    try {
      const res = await fetch(`/api/leads?campaign_id=${campaignId}`);
      if (!res.ok) throw new Error("Failed to load leads");
      const data = await res.json();
      setLeads(data.leads || []);
    } catch {
      setLeads([]);
    } finally {
      setLeadsLoading(false);
    }
  }, []);

  // Fetch activity when Activity tab is active or a campaign is selected
  const fetchActivity = useCallback(async (campaignId: string) => {
    setActivityLoading(true);
    try {
      const res = await fetch(`/api/activity?campaign_id=${campaignId}`);
      if (!res.ok) throw new Error("Failed to load activity");
      const data = await res.json();
      setActivity(data.activity || []);
    } catch {
      setActivity([]);
    } finally {
      setActivityLoading(false);
    }
  }, []);

  // When switching to Leads/Activity tab, fetch data for the first campaign
  useEffect(() => {
    if (campaigns.length === 0) return;
    const targetId = selectedCampaign || campaigns[0]?.id;
    if (!targetId) return;

    if (activeTab === "Leads" || activeTab === "Overview") {
      fetchLeads(targetId);
    }
    if (activeTab === "Activity" || activeTab === "Overview") {
      fetchActivity(targetId);
    }
  }, [activeTab, selectedCampaign, campaigns, fetchLeads, fetchActivity]);

  // Helper: get stats for a campaign (joined from API)
  const getStats = (campaign: any) => {
    const stats = campaign.campaign_stats?.[0] || campaign.campaign_stats || {};
    return {
      impressions: stats.impressions || 0,
      engagements: stats.engagements || 0,
      leads_count: stats.leads_count || 0,
      conversions: stats.conversions || 0,
      daily_actions: stats.daily_actions || 0,
    };
  };

  // Aggregated stats
  const totalImpressions = campaigns.reduce((a, c) => a + getStats(c).impressions, 0);
  const totalEngagements = campaigns.reduce((a, c) => a + getStats(c).engagements, 0);
  const totalLeads = campaigns.reduce((a, c) => a + getStats(c).leads_count, 0);
  const totalConversions = campaigns.reduce((a, c) => a + getStats(c).conversions, 0);
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const todayActions = campaigns.reduce((a, c) => a + getStats(c).daily_actions, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background mesh-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-accent" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-muted text-sm font-mono">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background mesh-bg flex items-center justify-center">
        <div className="glass rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted text-sm mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold text-sm cursor-pointer">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background mesh-bg">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/" className="text-base sm:text-lg font-black tracking-tight">
              Agent<span className="gradient-text">Outreach</span>
            </Link>
            {activeCampaigns > 0 && (
              <span className="hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded bg-green/10 text-green border border-green/20">LIVE</span>
            )}
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            {todayActions > 0 && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-muted font-mono px-3 py-1.5 rounded-lg border border-border bg-surface/50">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                {todayActions} actions today
              </div>
            )}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-accent to-accent2 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">U</div>
          </div>
        </div>
      </nav>

      {campaigns.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EmptyState />
        </div>
      ) : (
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
                  {campaigns.map((c) => {
                    const stats = getStats(c);
                    const convRate = stats.leads_count > 0 ? ((stats.conversions / stats.leads_count) * 100).toFixed(1) : "0.0";
                    return (
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
                            <div className="text-xs sm:text-sm text-muted">
                              {(c.platforms || []).join(", ") || "No platforms"}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-[10px] sm:text-xs text-muted font-mono flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                              {c.updated_at ? timeAgo(c.updated_at) : "—"}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                          <div>
                            <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted mb-1">Impressions</div>
                            <div className="text-lg sm:text-xl font-bold font-mono">{stats.impressions.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted mb-1">Engagements</div>
                            <div className="text-lg sm:text-xl font-bold font-mono text-accent">{stats.engagements}</div>
                          </div>
                          <div>
                            <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted mb-1">Leads</div>
                            <div className="text-lg sm:text-xl font-bold font-mono text-accent2">{stats.leads_count}</div>
                          </div>
                          <div>
                            <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted mb-1">Conversions</div>
                            <div className="text-lg sm:text-xl font-bold font-mono text-green">{stats.conversions} <span className="text-xs">({convRate}%)</span></div>
                          </div>
                        </div>
                        {c.status === "active" && stats.daily_actions > 0 && (
                          <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2 text-xs text-muted">
                            <span className="text-green font-semibold">{stats.daily_actions} actions today</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                    {activityLoading ? (
                      <div className="px-5 py-8 text-center text-muted text-sm">Loading...</div>
                    ) : activity.length === 0 ? (
                      <div className="px-5 py-8 text-center text-muted text-sm">No activity yet. Your agent will start posting soon.</div>
                    ) : (
                      activity.slice(0, 7).map((a, i) => (
                        <div
                          key={i}
                          className="px-3 sm:px-5 py-3 sm:py-3.5 flex items-start sm:items-center gap-2 sm:gap-4 border-b border-border/50 hover:bg-surface/50 transition-colors"
                        >
                          <span className="text-[10px] sm:text-xs text-muted font-mono w-14 sm:w-16 shrink-0 pt-0.5 sm:pt-0">{timeAgo(a.created_at)}</span>
                          <PlatformBadge platform={a.platform} />
                          <span className="text-xs sm:text-sm flex-1 leading-relaxed">{a.action}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Top leads sidebar */}
                <div className="lg:col-span-2">
                  <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-muted font-bold mb-3 sm:mb-4 flex items-center gap-3">
                    Top Leads <span className="flex-1 h-px bg-border" />
                  </h3>
                  <div className="glass rounded-xl overflow-hidden">
                    {leadsLoading ? (
                      <div className="px-4 py-8 text-center text-muted text-sm">Loading...</div>
                    ) : leads.length === 0 ? (
                      <div className="px-4 py-8 text-center text-muted text-sm">No leads yet. They will appear as your agent engages.</div>
                    ) : (
                      <>
                        {leads.slice(0, 5).map((l, i) => (
                          <div key={i} className="px-4 py-3 border-b border-border/50 hover:bg-surface/50 transition-colors">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono font-medium text-sm">{l.name}</span>
                              <span className={`font-mono font-bold text-sm ${l.score >= 80 ? "text-green" : l.score >= 70 ? "text-accent" : "text-muted"}`}>{l.score}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-muted">
                              <PlatformBadge platform={l.platform} />
                              <StatusBadge status={l.status} />
                              <span className="ml-auto">{l.touches || 0} touches</span>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => setActiveTab("Leads")}
                          className="w-full px-4 py-3 text-xs text-accent font-semibold hover:bg-surface/50 transition-colors cursor-pointer"
                        >
                          View all leads &rarr;
                        </button>
                      </>
                    )}
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
                <Link href="/onboarding" className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-accent to-accent2 text-white text-xs sm:text-sm font-bold hover:-translate-y-0.5 transition-all cursor-pointer">
                  + New Campaign
                </Link>
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
                    {campaigns.map((c) => {
                      const stats = getStats(c);
                      const convRate = stats.leads_count > 0 ? ((stats.conversions / stats.leads_count) * 100).toFixed(1) : "0.0";
                      return (
                        <tr
                          key={c.id}
                          className="border-b border-border/50 hover:bg-surface/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedCampaign(c.id)}
                        >
                          <td className="p-3 sm:p-4 font-medium">{c.name}</td>
                          <td className="p-3 sm:p-4 text-center"><StatusBadge status={c.status} /></td>
                          <td className="p-3 sm:p-4 text-center">
                            <div className="flex gap-1 justify-center flex-wrap">
                              {(c.platforms || []).map((p: string) => <PlatformBadge key={p} platform={p} />)}
                            </div>
                          </td>
                          <td className="p-3 sm:p-4 text-center font-mono font-bold text-accent2">{stats.leads_count}</td>
                          <td className="p-3 sm:p-4 text-center font-mono font-bold text-green">{stats.conversions}</td>
                          <td className="p-3 sm:p-4 text-center font-mono font-bold text-green">{convRate}%</td>
                          <td className="p-3 sm:p-4 text-center font-mono text-muted">{stats.daily_actions}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Campaign detail */}
          {activeTab === "Campaigns" && selectedCampaign && (() => {
            const c = campaigns.find((x: any) => x.id === selectedCampaign);
            if (!c) return <div className="text-muted text-sm">Campaign not found.</div>;
            const stats = getStats(c);
            const convRate = stats.leads_count > 0 ? ((stats.conversions / stats.leads_count) * 100).toFixed(1) : "0.0";
            return (
              <div className="space-y-6">
                <button onClick={() => setSelectedCampaign(null)} className="text-sm text-muted hover:text-accent transition-colors cursor-pointer">&larr; All Campaigns</button>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl sm:text-2xl font-black">{c.name}</h2>
                      <StatusBadge status={c.status} />
                    </div>
                    <div className="text-sm text-muted">{(c.platforms || []).join(", ")} &middot; Last updated: {c.updated_at ? timeAgo(c.updated_at) : "—"}</div>
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
                  <div className="glass rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider text-muted mb-1">Impressions</div><div className="text-xl font-black">{stats.impressions.toLocaleString()}</div></div>
                  <div className="glass rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider text-muted mb-1">Engagements</div><div className="text-xl font-black text-accent">{stats.engagements}</div></div>
                  <div className="glass rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider text-muted mb-1">Leads</div><div className="text-xl font-black text-accent2">{stats.leads_count}</div></div>
                  <div className="glass rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider text-muted mb-1">Conv. Rate</div><div className="text-xl font-black text-green">{convRate}%</div></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest text-muted font-bold mb-3 flex items-center gap-3">Recent Actions <span className="flex-1 h-px bg-border" /></h3>
                    <div className="glass rounded-xl overflow-hidden">
                      {activityLoading ? (
                        <div className="px-4 py-8 text-center text-muted text-sm">Loading...</div>
                      ) : activity.length === 0 ? (
                        <div className="px-4 py-8 text-center text-muted text-sm">No activity yet.</div>
                      ) : (
                        activity.slice(0, 5).map((a, i) => (
                          <div key={i} className="px-4 py-3 flex items-start gap-3 border-b border-border/50 hover:bg-surface/50">
                            <span className="text-[10px] text-muted font-mono w-14 shrink-0 pt-0.5">{timeAgo(a.created_at)}</span>
                            <PlatformBadge platform={a.platform} />
                            <span className="text-xs flex-1 leading-relaxed">{a.action}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest text-muted font-bold mb-3 flex items-center gap-3">Campaign Leads <span className="flex-1 h-px bg-border" /></h3>
                    <div className="glass rounded-xl overflow-hidden">
                      {leadsLoading ? (
                        <div className="px-4 py-8 text-center text-muted text-sm">Loading...</div>
                      ) : leads.length === 0 ? (
                        <div className="px-4 py-8 text-center text-muted text-sm">No leads yet.</div>
                      ) : (
                        leads.slice(0, 5).map((l, i) => (
                          <div key={i} className="px-4 py-3 border-b border-border/50 hover:bg-surface/50">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono font-medium text-sm">{l.name}</span>
                              <div className="flex items-center gap-2">
                                <span className={`font-mono font-bold text-sm ${l.score >= 80 ? "text-green" : "text-accent"}`}>{l.score}</span>
                                <StatusBadge status={l.status} />
                              </div>
                            </div>
                            <div className="text-[10px] text-muted">{l.last_message || "—"}</div>
                          </div>
                        ))
                      )}
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
                {campaigns.length > 1 && (
                  <select
                    className="text-xs font-mono bg-surface border border-border rounded-lg px-3 py-1.5 text-muted focus:border-accent outline-none"
                    value={selectedCampaign || campaigns[0]?.id || ""}
                    onChange={(e) => {
                      setSelectedCampaign(e.target.value);
                      fetchActivity(e.target.value);
                    }}
                  >
                    {campaigns.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className="glass rounded-xl overflow-hidden">
                {activityLoading ? (
                  <div className="px-5 py-12 text-center text-muted text-sm">Loading...</div>
                ) : activity.length === 0 ? (
                  <div className="px-5 py-12 text-center text-muted text-sm">No activity yet. Your agent will start posting soon.</div>
                ) : (
                  activity.map((a, i) => (
                    <div key={i} className="px-3 sm:px-5 py-3 sm:py-4 flex items-start sm:items-center gap-2 sm:gap-4 border-b border-border/50 hover:bg-surface/50 transition-colors">
                      <span className="text-[10px] sm:text-xs text-muted font-mono w-14 sm:w-16 shrink-0 pt-0.5 sm:pt-0">{timeAgo(a.created_at)}</span>
                      <PlatformBadge platform={a.platform} />
                      <span className="text-xs sm:text-sm flex-1 leading-relaxed">{a.action}</span>
                      <span className={`hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded ${a.action_type === "post" ? "bg-accent/10 text-accent" : "bg-accent2/10 text-accent2"}`}>
                        {a.action_type}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Leads tab */}
          {activeTab === "Leads" && (
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold">Qualified Leads</h3>
                <div className="flex items-center gap-3">
                  {campaigns.length > 1 && (
                    <select
                      className="text-xs font-mono bg-surface border border-border rounded-lg px-3 py-1.5 text-muted focus:border-accent outline-none"
                      value={selectedCampaign || campaigns[0]?.id || ""}
                      onChange={(e) => {
                        setSelectedCampaign(e.target.value);
                        fetchLeads(e.target.value);
                      }}
                    >
                      {campaigns.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  )}
                  {!leadsLoading && leads.length > 0 && (
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span><span className="text-green font-bold">{leads.filter(l => l.status === "converted" || l.status === "Converted").length}</span> converted</span>
                      <span><span className="text-accent font-bold">{leads.filter(l => l.status === "engaged" || l.status === "Engaged").length}</span> engaged</span>
                      <span><span className="text-accent2 font-bold">{leads.filter(l => l.status === "new" || l.status === "New" || l.status === "qualified" || l.status === "Qualified").length}</span> new</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="glass rounded-xl overflow-x-auto">
                {leadsLoading ? (
                  <div className="px-5 py-12 text-center text-muted text-sm">Loading...</div>
                ) : leads.length === 0 ? (
                  <div className="px-5 py-12 text-center text-muted text-sm">No leads yet. They will appear as your agent engages with potential customers.</div>
                ) : (
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
                      {leads.map((l, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                          <td className="p-3 sm:p-4 font-mono font-medium">{l.name}</td>
                          <td className="p-3 sm:p-4 text-center"><PlatformBadge platform={l.platform} /></td>
                          <td className="p-3 sm:p-4 text-center">
                            <span className={`font-mono font-bold ${l.score >= 80 ? "text-green" : l.score >= 70 ? "text-accent" : "text-muted"}`}>{l.score}</span>
                          </td>
                          <td className="p-3 sm:p-4 text-center"><StatusBadge status={l.status} /></td>
                          <td className="p-3 sm:p-4 text-center font-mono">{l.touches || 0}</td>
                          <td className="p-3 sm:p-4 text-muted text-xs">{l.last_message || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* Analytics tab */}
          {activeTab === "Analytics" && (
            <div className="space-y-6">
              <h3 className="text-base sm:text-lg font-bold">Performance Analytics</h3>
              {totalLeads === 0 && totalEngagements === 0 ? (
                <div className="glass rounded-xl p-12 text-center">
                  <p className="text-muted text-sm">Not enough data yet. Analytics will appear once your agent starts generating leads and engagements.</p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="glass rounded-xl p-5">
                      <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">Total Impressions</div>
                      <div className="text-2xl font-black text-foreground">{totalImpressions.toLocaleString()}</div>
                    </div>
                    <div className="glass rounded-xl p-5">
                      <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">Total Engagements</div>
                      <div className="text-2xl font-black text-accent">{totalEngagements.toLocaleString()}</div>
                    </div>
                    <div className="glass rounded-xl p-5">
                      <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">Total Leads</div>
                      <div className="text-2xl font-black text-accent2">{totalLeads}</div>
                    </div>
                    <div className="glass rounded-xl p-5">
                      <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">Conv. Rate</div>
                      <div className="text-2xl font-black text-green">{totalLeads > 0 ? ((totalConversions / totalLeads) * 100).toFixed(1) : "0.0"}%</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-muted font-bold mb-3 flex items-center gap-3">By Campaign <span className="flex-1 h-px bg-border" /></h4>
                    <div className="glass rounded-xl overflow-hidden">
                      {campaigns.map((c, i) => {
                        const stats = getStats(c);
                        const convRate = stats.leads_count > 0 ? ((stats.conversions / stats.leads_count) * 100).toFixed(1) : "0.0";
                        return (
                          <div key={i} className="px-4 py-3.5 flex items-center justify-between border-b border-border/50 hover:bg-surface/50">
                            <div className="flex items-center gap-3">
                              <StatusBadge status={c.status} />
                              <span className="text-sm font-medium">{c.name}</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-mono">
                              <span className="text-muted">{stats.impressions.toLocaleString()} imp.</span>
                              <span className="text-accent2">{stats.leads_count} leads</span>
                              <span className="text-green font-bold">{convRate}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
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
      )}
    </div>
  );
}
