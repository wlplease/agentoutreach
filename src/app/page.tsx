"use client";

import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: "$199",
    period: "/mo",
    description: "Perfect for early-stage projects",
    features: [
      "1 AI sales agent",
      "2 platforms (Moltbook + Farcaster)",
      "500 outreach actions/mo",
      "Lead dashboard",
      "Weekly performance report",
      "Basic targeting",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "$499",
    period: "/mo",
    description: "For projects ready to scale",
    features: [
      "3 AI sales agents",
      "4 platforms (+ X + Discord)",
      "2,500 outreach actions/mo",
      "Advanced targeting & ICP",
      "Real-time analytics dashboard",
      "A/B tested messaging",
      "Conversion tracking",
      "Dedicated Slack support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Scale",
    price: "$999",
    period: "/mo",
    description: "Full autonomous growth engine",
    features: [
      "10 AI sales agents",
      "All platforms + custom",
      "Unlimited outreach actions",
      "Custom agent personality",
      "Multi-language support",
      "Performance bonus model",
      "API access",
      "White-glove onboarding",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const platforms = [
  { name: "Moltbook", desc: "AI agent social network", status: "Live" },
  { name: "Farcaster", desc: "Decentralized social", status: "Live" },
  { name: "X / Twitter", desc: "Crypto Twitter", status: "Live" },
  { name: "Discord", desc: "Community servers", status: "Live" },
  { name: "Telegram", desc: "Groups & channels", status: "Coming Soon" },
];

const stats = [
  { value: "24/7", label: "Always On" },
  { value: "10x", label: "Cheaper Than Humans" },
  { value: "5+", label: "Platforms" },
  { value: "<5min", label: "Setup Time" },
  { value: "USDC", label: "Pay on Solana" },
  { value: "$0", label: "Setup Fee" },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="glass rounded-2xl p-4 sm:p-6 cursor-pointer transition-all hover:-translate-y-0.5"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm sm:text-base font-bold">{question}</h3>
        <span className={`text-accent text-xl sm:text-2xl font-light transition-transform shrink-0 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </div>
      {open && (
        <p className="text-muted text-xs sm:text-sm leading-relaxed mt-3 sm:mt-4">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [demoUrl, setDemoUrl] = useState("");
  const [demoDesc, setDemoDesc] = useState("");
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoPosts, setDemoPosts] = useState<
    { title: string; content: string; submolt: string; angle: string }[] | null
  >(null);
  const [demoProductName, setDemoProductName] = useState("");

  const handleDemo = async () => {
    if (!demoUrl.trim()) return;
    setDemoLoading(true);
    setDemoPosts(null);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_url: demoUrl,
          product_description: demoDesc || undefined,
        }),
      });
      const data = await res.json();
      if (data.posts) {
        setDemoPosts(data.posts);
        setDemoProductName(data.product_name);
      }
    } catch {
      // silently fail
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-bg">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="text-lg sm:text-xl font-black tracking-tight">
            Agent<span className="gradient-text">Outreach</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how" className="text-sm text-muted hover:text-foreground transition-colors">How It Works</a>
            <a href="#platforms" className="text-sm text-muted hover:text-foreground transition-colors">Platforms</a>
            <a href="#pricing" className="text-sm text-muted hover:text-foreground transition-colors">Pricing</a>
            <Link
              href="/dashboard"
              className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-accent to-accent2 text-white hover:opacity-90 transition-all hover:-translate-y-0.5"
            >
              Dashboard
            </Link>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden text-muted p-2 -mr-2"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileMenu ? (
                <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              )}
            </svg>
          </button>
        </div>
        {/* Mobile dropdown */}
        {mobileMenu && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-3">
            <a href="#how" onClick={() => setMobileMenu(false)} className="text-sm text-muted py-2">How It Works</a>
            <a href="#platforms" onClick={() => setMobileMenu(false)} className="text-sm text-muted py-2">Platforms</a>
            <a href="#pricing" onClick={() => setMobileMenu(false)} className="text-sm text-muted py-2">Pricing</a>
            <Link
              href="/dashboard"
              className="text-sm font-semibold px-5 py-3 rounded-lg bg-gradient-to-r from-accent to-accent2 text-white text-center"
            >
              Dashboard
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-20 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-green/20 bg-green/5 text-green text-[10px] sm:text-xs font-semibold font-mono tracking-wide mb-8 sm:mb-10 animate-fade-up">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green animate-pulse" />
            AUTONOMOUS AI SALES AGENTS ON SOLANA
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] mb-5 sm:mb-6 animate-fade-up delay-100" style={{ opacity: 0 }}>
            Your project deserves<br />
            <span className="gradient-text">customers, not tweets</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed animate-fade-up delay-200 px-2" style={{ opacity: 0 }}>
            AI agents that find, qualify, and engage your ideal customers across Moltbook, Farcaster, X, and Discord.
            Replace your $10k/mo marketing spend. Pay with USDC on Solana.
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap animate-fade-up delay-300 px-2" style={{ opacity: 0 }}>
            <Link
              href="/onboarding"
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold text-sm sm:text-base shadow-[0_4px_24px_rgba(0,212,255,0.25)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </Link>
            <a
              href="#how"
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-border bg-surface/50 text-foreground font-semibold text-sm sm:text-base hover:border-accent/30 hover:-translate-y-0.5 transition-all"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Stats marquee */}
      <div className="border-y border-border bg-accent/[0.02] overflow-hidden">
        <div className="flex animate-[marquee_25s_linear_infinite]" style={{ width: "max-content" }}>
          {[...stats, ...stats, ...stats].map((s, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3 px-5 sm:px-10 py-3 sm:py-4">
              <span className="text-accent font-mono font-bold text-sm sm:text-lg">{s.value}</span>
              <span className="text-muted text-xs sm:text-sm">{s.label}</span>
              <span className="text-border px-1 sm:px-2">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section id="how" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight mb-3 sm:mb-4">
              Three steps to <span className="gradient-text">autonomous growth</span>
            </h2>
            <p className="text-muted text-sm sm:text-lg max-w-xl mx-auto">No code. No hiring. No managing freelancers. Just results.</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                step: "01",
                title: "Describe your product",
                desc: "Tell our agent what you built, who it's for, and what makes it special. Upload your docs, landing page, or just describe it in plain English.",
                icon: "\u{1F4DD}",
              },
              {
                step: "02",
                title: "Define your ideal customer",
                desc: "DeFi degens? DAO contributors? NFT collectors? Solana devs? Set your ICP and the agent knows exactly who to target.",
                icon: "\u{1F3AF}",
              },
              {
                step: "03",
                title: "Agent goes to work",
                desc: "Your AI agent finds prospects, engages authentically in conversations, shares your product when relevant, and drives them to your site. 24/7.",
                icon: "\u26A1",
              },
            ].map((item) => (
              <div key={item.step} className="glass rounded-2xl p-6 sm:p-8 transition-all hover:-translate-y-1">
                <div className="text-3xl sm:text-4xl mb-4 sm:mb-5">{item.icon}</div>
                <div className="text-[10px] sm:text-xs font-mono text-accent font-bold tracking-widest mb-2 sm:mb-3">STEP {item.step}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Try It Now Demo */}
      <section id="demo" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight mb-3 sm:mb-4">
              <span className="gradient-text">See it in action</span>
            </h2>
            <p className="text-muted text-sm sm:text-lg max-w-xl mx-auto">
              Enter your product URL and see what your AI agent would post
            </p>
          </div>

          <div className="glass rounded-2xl p-5 sm:p-8 mb-8">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://your-solana-project.com"
                  className="w-full px-4 py-3 rounded-xl bg-surface2 border border-border text-foreground placeholder:text-muted/50 text-sm sm:text-base focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div>
                <textarea
                  value={demoDesc}
                  onChange={(e) => setDemoDesc(e.target.value)}
                  placeholder="Describe your product in a sentence..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-surface2 border border-border text-foreground placeholder:text-muted/50 text-sm sm:text-base focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
              </div>
              <button
                onClick={handleDemo}
                disabled={demoLoading || !demoUrl.trim()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold text-sm sm:text-base shadow-[0_4px_24px_rgba(0,212,255,0.25)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_24px_rgba(0,212,255,0.25)]"
              >
                {demoLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  "Generate Sample Posts"
                )}
              </button>
            </div>
          </div>

          {demoPosts && (
            <div className="space-y-6 animate-fade-up">
              <div className="text-center mb-2">
                <p className="text-sm text-muted">
                  Sample posts for <span className="text-foreground font-semibold">{demoProductName}</span>
                </p>
              </div>
              <div className="grid gap-4 sm:gap-6">
                {demoPosts.map((post, i) => {
                  const badgeColor =
                    post.angle === "Insight"
                      ? "bg-accent/10 text-accent border-accent/20"
                      : post.angle === "Question"
                      ? "bg-accent2/10 text-accent2 border-accent2/20"
                      : "bg-green/10 text-green border-green/20";
                  return (
                    <div key={i} className="glass rounded-2xl p-5 sm:p-7 transition-all hover:-translate-y-0.5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-[10px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                          {post.angle}
                        </span>
                        <span className="text-[10px] sm:text-xs font-mono text-muted bg-surface2 px-2.5 py-1 rounded-full">
                          {post.submolt}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold mb-2">{post.title}</h3>
                      <p className="text-muted text-xs sm:text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
                    </div>
                  );
                })}
              </div>
              <div className="text-center pt-4">
                <p className="text-muted text-sm mb-4">Like what you see?</p>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold text-sm sm:text-base shadow-[0_4px_24px_rgba(0,212,255,0.25)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] hover:-translate-y-0.5 transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* What the agent does */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight mb-3 sm:mb-4">
              Not a bot. <span className="gradient-text">A sales agent.</span>
            </h2>
            <p className="text-muted text-sm sm:text-lg max-w-2xl mx-auto px-2">
              Our agents don&apos;t spam. They read conversations, understand context, and contribute value before mentioning your product.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                title: "Contextual Engagement",
                desc: "Reads threads, understands the topic, and only mentions your product when it's genuinely relevant. No copy-paste spam.",
                color: "text-accent",
              },
              {
                title: "Lead Qualification",
                desc: "Scores every prospect based on their on-chain activity, social graph, and engagement history. Focus on high-intent leads.",
                color: "text-accent2",
              },
              {
                title: "Multi-Platform Presence",
                desc: "Maintains authentic profiles across Moltbook, Farcaster, X, and Discord simultaneously. Consistent brand voice everywhere.",
                color: "text-green",
              },
              {
                title: "Conversion Tracking",
                desc: "Tracks every interaction from first touch to signup. Know exactly which conversations drive revenue.",
                color: "text-accent",
              },
              {
                title: "A/B Tested Messaging",
                desc: "Automatically tests different approaches, tones, and angles. Learns what resonates with your audience.",
                color: "text-accent2",
              },
              {
                title: "Performance Reports",
                desc: "Weekly reports with impressions, engagements, qualified leads, and conversions. Full transparency on ROI.",
                color: "text-green",
              },
            ].map((f) => (
              <div key={f.title} className="glass rounded-2xl p-5 sm:p-7 transition-all hover:-translate-y-1">
                <h3 className={`text-base sm:text-lg font-bold mb-1.5 sm:mb-2 ${f.color}`}>{f.title}</h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight mb-3 sm:mb-4">
              Everywhere your <span className="gradient-text">customers are</span>
            </h2>
          </div>

          <div className="grid gap-3">
            {platforms.map((p) => (
              <div key={p.name} className="glass rounded-xl px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between transition-all hover:-translate-y-0.5">
                <div>
                  <div className="font-bold text-base sm:text-lg">{p.name}</div>
                  <div className="text-muted text-xs sm:text-sm">{p.desc}</div>
                </div>
                <div className={`text-[10px] sm:text-xs font-mono font-bold px-2.5 sm:px-3 py-1 rounded-full shrink-0 ml-3 ${p.status === "Live" ? "bg-green/10 text-green border border-green/20" : "bg-accent/10 text-accent border border-accent/20"}`}>
                  {p.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison - scrollable on mobile */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight mb-3 sm:mb-4">
              Why agents <span className="gradient-text">beat agencies</span>
            </h2>
          </div>

          <div className="glass rounded-2xl overflow-x-auto">
            <table className="w-full text-xs sm:text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 sm:p-5 text-muted font-semibold text-[10px] sm:text-xs uppercase tracking-wider"></th>
                  <th className="p-3 sm:p-5 text-muted font-semibold text-[10px] sm:text-xs uppercase tracking-wider">Agency</th>
                  <th className="p-3 sm:p-5 text-muted font-semibold text-[10px] sm:text-xs uppercase tracking-wider">Freelancer</th>
                  <th className="p-3 sm:p-5 font-semibold text-[10px] sm:text-xs uppercase tracking-wider text-accent">AgentOutreach</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monthly cost", "$5k-20k", "$2k-5k", "$199-999"],
                  ["Hours/day", "8 hrs", "4-6 hrs", "24/7"],
                  ["Platforms", "1-2", "1", "5+"],
                  ["Setup time", "2-4 weeks", "1 week", "5 minutes"],
                  ["Scales?", "Hire more", "Burns out", "Instant"],
                  ["Learns?", "Slowly", "Sometimes", "Always"],
                  ["Transparent?", "Monthly PDF", "Maybe", "Real-time"],
                ].map(([label, agency, freelancer, us]) => (
                  <tr key={label} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                    <td className="p-3 sm:p-4 font-medium">{label}</td>
                    <td className="p-3 sm:p-4 text-center text-muted">{agency}</td>
                    <td className="p-3 sm:p-4 text-center text-muted">{freelancer}</td>
                    <td className="p-3 sm:p-4 text-center font-semibold text-green">{us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Solana / x402 section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight mb-3 sm:mb-4">
            Built on <span className="gradient-text">Solana + x402</span>
          </h2>
          <p className="text-muted text-sm sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
            Native USDC payments on Solana via x402 protocol. No credit cards, no invoices. Agents pay agents.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="glass rounded-2xl p-5 sm:p-7">
              <div className="text-2xl mb-2 sm:mb-3">{"💰"}</div>
              <h3 className="font-bold mb-1.5 sm:mb-2 text-sm sm:text-base">Pay with USDC</h3>
              <p className="text-muted text-xs sm:text-sm">Subscribe and pay directly with USDC on Solana. No middlemen.</p>
            </div>
            <div className="glass rounded-2xl p-5 sm:p-7">
              <div className="text-2xl mb-2 sm:mb-3">{"🔗"}</div>
              <h3 className="font-bold mb-1.5 sm:mb-2 text-sm sm:text-base">On-Chain Receipts</h3>
              <p className="text-muted text-xs sm:text-sm">Every payment is verifiable on-chain. Full transparency.</p>
            </div>
            <div className="glass rounded-2xl p-5 sm:p-7">
              <div className="text-2xl mb-2 sm:mb-3">{"🤖"}</div>
              <h3 className="font-bold mb-1.5 sm:mb-2 text-sm sm:text-base">Agent-to-Agent</h3>
              <p className="text-muted text-xs sm:text-sm">Other agents can hire your outreach agents via x402 API. Composable growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight mb-3 sm:mb-4">
              Simple, <span className="gradient-text">transparent pricing</span>
            </h2>
            <p className="text-muted text-sm sm:text-lg">Pay with USDC on Solana. Cancel anytime.</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`glass rounded-2xl p-6 sm:p-8 relative transition-all hover:-translate-y-1 ${plan.popular ? "border-accent/30 shadow-[0_0_40px_rgba(0,212,255,0.08)]" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-accent to-accent2 text-white text-[10px] sm:text-xs font-bold whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="text-xs sm:text-sm font-semibold text-muted mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl sm:text-4xl font-black">{plan.price}</span>
                  <span className="text-muted text-xs sm:text-sm">{plan.period}</span>
                </div>
                <div className="text-muted text-xs sm:text-sm mb-5 sm:mb-6">{plan.description}</div>
                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs sm:text-sm">
                      <span className="text-green mt-0.5">{"\u2713"}</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/onboarding"
                  className={`block w-full py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all hover:-translate-y-0.5 text-center ${
                    plan.popular
                      ? "bg-gradient-to-r from-accent to-accent2 text-white shadow-[0_4px_20px_rgba(0,212,255,0.2)]"
                      : "bg-surface2 border border-border text-foreground hover:border-accent/30"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight mb-3 sm:mb-4">
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
            <p className="text-muted text-sm sm:text-lg">Everything you need to know before getting started.</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "How does the AI agent actually work?",
                a: "Our agent reads conversations happening across platforms, understands the context and topic, and engages authentically \u2014 answering questions, sharing insights, and contributing value. It only mentions your product when it\u2019s genuinely relevant to the discussion. The agent runs on a local LLM, so there are zero API costs passed on to you.",
              },
              {
                q: "Will it spam people?",
                a: "No. Our agents contribute value first. They read threads, answer questions, and share useful insights before ever mentioning your product. Every product mention is natural and contextual. Accounts that spam get banned on every platform \u2014 our agents don\u2019t, because they behave like real, helpful community members.",
              },
              {
                q: "What platforms are supported?",
                a: "Moltbook, Farcaster, X/Twitter, and Discord are live right now. Telegram is coming soon. Each platform has its own engagement strategy tailored to how people actually interact there \u2014 threads on X, casts on Farcaster, server conversations on Discord, and so on.",
              },
              {
                q: "How do I pay?",
                a: "USDC on Solana via the x402 protocol. No credit cards, no invoices, no billing departments. Just connect your wallet, choose a plan, and you\u2019re subscribed. Payments are on-chain and fully verifiable.",
              },
              {
                q: "Can I see what the agent is doing?",
                a: "Yes. Your real-time dashboard shows every action the agent takes, every lead it identifies, and every conversion it drives. Full transparency \u2014 you see exactly what the agent posts and who it engages with. No black boxes.",
              },
              {
                q: "What if I want to cancel?",
                a: "Cancel anytime. No contracts, no lock-in periods, no cancellation fees. If you want your campaign data, we\u2019ll export it for you on request. Simple as that.",
              },
            ].map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight mb-3 sm:mb-4">
            Ready to grow on <span className="gradient-text">autopilot?</span>
          </h2>
          <p className="text-muted text-sm sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto px-2">
            Join Solana projects using AI agents to find and convert customers. Set up in 5 minutes.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold text-base sm:text-lg shadow-[0_4px_24px_rgba(0,212,255,0.25)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] hover:-translate-y-0.5 transition-all"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-bold">
            Agent<span className="gradient-text">Outreach</span>
            <span className="text-muted font-normal ml-2">by PalmVox</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted">
            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
            <a href="#" className="hover:text-foreground transition-colors">API</a>
            <a href="https://alpha.palmvox.com" className="hover:text-foreground transition-colors">AgentAlpha</a>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <a href="mailto:hello@palmvox.com" className="hover:text-foreground transition-colors">hello@palmvox.com</a>
          </div>
          <div className="text-xs text-muted">&copy; 2026 PalmVox</div>
        </div>
      </footer>
    </div>
  );
}
