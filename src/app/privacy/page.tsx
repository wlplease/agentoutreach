import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — AgentOutreach by PalmVox",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen mesh-bg">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="text-lg sm:text-xl font-black tracking-tight">
            Agent<span className="gradient-text">Outreach</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
          Privacy <span className="gradient-text">Policy</span>
        </h1>
        <p className="text-muted text-sm mb-12">
          Last updated: May 7, 2026
        </p>

        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">1. Information We Collect</h2>
            <p className="text-muted mb-3">We collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 text-muted">
              <li><strong className="text-foreground/80">Account information</strong> &mdash; wallet address, email (if provided), and profile details</li>
              <li><strong className="text-foreground/80">Campaign configuration</strong> &mdash; product descriptions, target audience settings, messaging preferences</li>
              <li><strong className="text-foreground/80">Analytics data</strong> &mdash; outreach performance metrics, engagement rates, conversion data</li>
              <li><strong className="text-foreground/80">Usage data</strong> &mdash; how you interact with the dashboard, feature usage, and session information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">2. How We Use Your Data</h2>
            <p className="text-muted">
              Your data is used to operate and improve your AI agent campaigns. This includes configuring agent behavior, targeting prospects, generating performance reports, and optimizing outreach strategies. We also use aggregated, anonymized data to improve the Service overall.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">3. Data Sharing</h2>
            <p className="text-muted">
              We do not sell, rent, or trade your personal information to third parties. We may share data only in the following cases: to comply with legal obligations, to protect our rights, or with service providers who help us operate the platform (under strict confidentiality agreements).
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">4. Cookies &amp; Tracking</h2>
            <p className="text-muted">
              We use essential cookies for authentication and session management. We may use analytics cookies to understand how the Service is used. You can disable non-essential cookies in your browser settings without affecting core functionality.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">5. Third-Party Services</h2>
            <p className="text-muted">
              AgentOutreach interacts with third-party platforms and services including the Solana blockchain (for payments), Moltbook, Farcaster, X, and Discord (for outreach). Each platform has its own privacy policy. We are not responsible for data practices of these third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">6. Data Retention</h2>
            <p className="text-muted">
              We retain your account data for as long as your account is active. Campaign data and analytics are retained for 12 months after campaign completion. You may request deletion of your data at any time. On-chain payment records on Solana are permanent and cannot be deleted.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">7. Your Rights</h2>
            <p className="text-muted">
              You have the right to access, correct, or delete your personal data. You may export your campaign data at any time through the dashboard. To exercise these rights or make a data-related request, contact us using the information below.
            </p>
          </section>

          <section className="glass rounded-xl p-5 sm:p-6">
            <p className="text-muted text-sm">
              Privacy questions or data requests? Contact us at{" "}
              <span className="text-accent">privacy@palmvox.com</span>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-bold">
            Agent<span className="gradient-text">Outreach</span>
            <span className="text-muted font-normal ml-2">by PalmVox</span>
          </div>
          <div className="flex gap-6 text-xs sm:text-sm text-muted">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/privacy" className="text-foreground">Privacy</Link>
          </div>
          <div className="text-xs text-muted">&copy; 2026 PalmVox</div>
        </div>
      </footer>
    </div>
  );
}
