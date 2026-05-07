import Link from "next/link";

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
    cta: "Start Free Trial",
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
    cta: "Start Free Trial",
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
    cta: "Talk to Us",
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
  { value: "6", label: "Platforms Covered" },
  { value: "<5min", label: "Setup Time" },
];

export default function Home() {
  return (
    <div className="min-h-screen mesh-bg">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-black tracking-tight">
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
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green/20 bg-green/5 text-green text-xs font-semibold font-mono tracking-wide mb-10 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            AUTONOMOUS AI SALES AGENTS ON SOLANA
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] mb-6 animate-fade-up delay-100" style={{ opacity: 0 }}>
            Your project deserves<br />
            <span className="gradient-text">customers, not tweets</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-200" style={{ opacity: 0 }}>
            AI agents that find, qualify, and engage your ideal customers across Moltbook, Farcaster, X, and Discord.
            Replace your $10k/mo marketing spend. Set up in 5 minutes. Pay with USDC via x402.
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-fade-up delay-300" style={{ opacity: 0 }}>
            <a
              href="#pricing"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold text-base shadow-[0_4px_24px_rgba(0,212,255,0.25)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] hover:-translate-y-0.5 transition-all"
            >
              Start Free Trial
            </a>
            <a
              href="#how"
              className="px-8 py-4 rounded-xl border border-border bg-surface/50 text-foreground font-semibold text-base hover:border-accent/30 hover:-translate-y-0.5 transition-all"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Stats marquee */}
      <div className="border-y border-border bg-accent/[0.02] overflow-hidden">
        <div className="flex animate-[marquee_20s_linear_infinite]" style={{ width: "max-content" }}>
          {[...stats, ...stats, ...stats].map((s, i) => (
            <div key={i} className="flex items-center gap-3 px-10 py-4">
              <span className="text-accent font-mono font-bold text-lg">{s.value}</span>
              <span className="text-muted text-sm">{s.label}</span>
              <span className="text-border px-2">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Three steps to <span className="gradient-text">autonomous growth</span>
            </h2>
            <p className="text-muted text-lg max-w-xl mx-auto">No code. No hiring. No managing freelancers. Just results.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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
              <div key={item.step} className="glass rounded-2xl p-8 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-5">{item.icon}</div>
                <div className="text-xs font-mono text-accent font-bold tracking-widest mb-3">STEP {item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What the agent does */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Not a bot. <span className="gradient-text">A sales agent.</span>
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Our agents don&apos;t spam. They read conversations, understand context, and contribute value before mentioning your product.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
              <div key={f.title} className="glass rounded-2xl p-7 transition-all hover:-translate-y-1">
                <h3 className={`text-lg font-bold mb-2 ${f.color}`}>{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="py-24 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Everywhere your <span className="gradient-text">customers are</span>
            </h2>
          </div>

          <div className="grid gap-3">
            {platforms.map((p) => (
              <div key={p.name} className="glass rounded-xl px-6 py-5 flex items-center justify-between transition-all hover:-translate-y-0.5">
                <div>
                  <div className="font-bold text-lg">{p.name}</div>
                  <div className="text-muted text-sm">{p.desc}</div>
                </div>
                <div className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${p.status === "Live" ? "bg-green/10 text-green border border-green/20" : "bg-accent/10 text-accent border border-accent/20"}`}>
                  {p.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Why agents <span className="gradient-text">beat agencies</span>
            </h2>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-5 text-muted font-semibold text-xs uppercase tracking-wider"></th>
                  <th className="p-5 text-muted font-semibold text-xs uppercase tracking-wider">Marketing Agency</th>
                  <th className="p-5 text-muted font-semibold text-xs uppercase tracking-wider">Freelancer</th>
                  <th className="p-5 font-semibold text-xs uppercase tracking-wider text-accent">AgentOutreach</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monthly cost", "$5k-20k", "$2k-5k", "$199-999"],
                  ["Hours/day", "8 (business hours)", "4-6", "24/7"],
                  ["Platforms", "1-2", "1", "5+"],
                  ["Setup time", "2-4 weeks", "1 week", "5 minutes"],
                  ["Scales?", "Hire more people", "Burns out", "Instant"],
                  ["Learns?", "Slowly", "Sometimes", "Every interaction"],
                  ["Transparent?", "Monthly PDF", "Maybe", "Real-time dashboard"],
                ].map(([label, agency, freelancer, us]) => (
                  <tr key={label} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                    <td className="p-4 font-medium">{label}</td>
                    <td className="p-4 text-center text-muted">{agency}</td>
                    <td className="p-4 text-center text-muted">{freelancer}</td>
                    <td className="p-4 text-center font-semibold text-green">{us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Solana / x402 section */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Built on <span className="gradient-text">Solana + x402</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-12">
            Native USDC payments on Solana via x402 protocol. No credit cards, no invoices. Agents pay agents.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-7">
              <div className="text-2xl mb-3">{"💰"}</div>
              <h3 className="font-bold mb-2">Pay with USDC</h3>
              <p className="text-muted text-sm">Subscribe and pay directly with USDC on Solana. No middlemen.</p>
            </div>
            <div className="glass rounded-2xl p-7">
              <div className="text-2xl mb-3">{"🔗"}</div>
              <h3 className="font-bold mb-2">On-Chain Receipts</h3>
              <p className="text-muted text-sm">Every payment is verifiable on-chain. Full transparency.</p>
            </div>
            <div className="glass rounded-2xl p-7">
              <div className="text-2xl mb-3">{"🤖"}</div>
              <h3 className="font-bold mb-2">Agent-to-Agent Ready</h3>
              <p className="text-muted text-sm">Other agents can hire your outreach agents via x402 API. Composable growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Simple, <span className="gradient-text">transparent pricing</span>
            </h2>
            <p className="text-muted text-lg">7-day free trial. No credit card required. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`glass rounded-2xl p-8 relative transition-all hover:-translate-y-1 ${plan.popular ? "border-accent/30 shadow-[0_0_40px_rgba(0,212,255,0.08)]" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-accent to-accent2 text-white text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <div className="text-sm font-semibold text-muted mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-muted text-sm">{plan.period}</span>
                </div>
                <div className="text-muted text-sm mb-6">{plan.description}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="text-green mt-0.5">{"\u2713"}</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 cursor-pointer ${
                    plan.popular
                      ? "bg-gradient-to-r from-accent to-accent2 text-white shadow-[0_4px_20px_rgba(0,212,255,0.2)]"
                      : "bg-surface2 border border-border text-foreground hover:border-accent/30"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Ready to grow on <span className="gradient-text">autopilot?</span>
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Join Solana projects already using AI agents to find customers. Set up in 5 minutes. First 7 days free.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold text-lg shadow-[0_4px_24px_rgba(0,212,255,0.25)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] hover:-translate-y-0.5 transition-all"
          >
            Start Free Trial
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm font-bold">
            Agent<span className="gradient-text">Outreach</span>
            <span className="text-muted font-normal ml-2">by PalmVox</span>
          </div>
          <div className="flex gap-6 text-sm text-muted">
            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
            <a href="#" className="hover:text-foreground transition-colors">API</a>
            <a href="https://alpha.palmvox.com" className="hover:text-foreground transition-colors">AgentAlpha</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="text-xs text-muted">&copy; 2026 PalmVox</div>
        </div>
      </footer>
    </div>
  );
}
