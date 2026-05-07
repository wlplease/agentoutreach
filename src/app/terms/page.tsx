import Link from "next/link";

export const metadata = {
  title: "Terms of Service — AgentOutreach by PalmVox",
};

export default function TermsPage() {
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
          Terms of <span className="gradient-text">Service</span>
        </h1>
        <p className="text-muted text-sm mb-12">
          Last updated: May 7, 2026
        </p>

        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">1. Service Description</h2>
            <p className="text-muted">
              AgentOutreach by PalmVox (&quot;we&quot;, &quot;us&quot;, &quot;the Service&quot;) provides autonomous AI sales agents designed for Solana ecosystem projects. Our agents engage prospects across social platforms including Moltbook, Farcaster, X, and Discord on your behalf to generate leads and drive conversions.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">2. Payment Terms</h2>
            <p className="text-muted">
              All payments are made in USDC on the Solana blockchain via the x402 protocol. Subscriptions are billed monthly and begin upon receipt of payment. All transactions are verifiable on-chain. There are no refunds for partial months of service. Prices are subject to change with 30 days&apos; notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">3. Acceptable Use</h2>
            <p className="text-muted mb-3">By using AgentOutreach, you agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted">
              <li>Use the Service for unsolicited mass messaging or spam</li>
              <li>Promote illegal activities, securities fraud, or scams</li>
              <li>Impersonate individuals, organizations, or other projects</li>
              <li>Distribute malware, phishing links, or malicious content</li>
              <li>Violate the terms of service of any target platform</li>
              <li>Use the Service to harass, threaten, or deceive others</li>
            </ul>
            <p className="text-muted mt-3">
              We reserve the right to suspend or terminate accounts that violate these terms without refund.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">4. Limitation of Liability</h2>
            <p className="text-muted">
              AgentOutreach is provided &quot;as is&quot; without warranties of any kind. We do not guarantee specific results, conversion rates, or lead volumes. PalmVox shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service, including but not limited to lost revenue, platform bans, or reputational impact. Our total liability is limited to the amount you paid for the Service in the preceding 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">5. Termination</h2>
            <p className="text-muted">
              You may cancel your subscription at any time. Access continues until the end of your current billing period. We may terminate or suspend your account immediately for violations of these Terms or for any conduct we deem harmful to the Service, other users, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">6. Changes to Terms</h2>
            <p className="text-muted">
              We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the revised Terms. Material changes will be communicated via email or in-app notification.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3">7. Governing Law</h2>
            <p className="text-muted">
              These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States. Any disputes shall be resolved in the courts of Delaware.
            </p>
          </section>

          <section className="glass rounded-xl p-5 sm:p-6">
            <p className="text-muted text-sm">
              Questions about these terms? Reach out to us at{" "}
              <span className="text-accent">legal@palmvox.com</span>
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
            <Link href="/terms" className="text-foreground">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
          <div className="text-xs text-muted">&copy; 2026 PalmVox</div>
        </div>
      </footer>
    </div>
  );
}
