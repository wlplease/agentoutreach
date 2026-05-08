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
        <p className="text-muted text-sm mb-2">
          Effective date: May 1, 2026
        </p>
        <p className="text-muted text-sm mb-12">
          Last updated: May 8, 2026
        </p>

        <div className="space-y-8">
          {/* 1. Introduction */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">1.</span> Introduction
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              PalmVox (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) operates AgentOutreach (autonomous AI sales agents), AgentAlpha (cryptocurrency trading APIs), and AgentHub (x402 payment routing). This Privacy Policy describes how we collect, use, store, share, and protect your personal information when you use any of our products and services (collectively, the &quot;Service&quot;), accessible at agentoutreachsol.vercel.app, alpha.palmvox.com, and any other domains operated by PalmVox. By using the Service, you consent to the data practices described in this policy.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">2.</span> Information We Collect
            </h2>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Account Information</h3>
            <p className="text-sm leading-relaxed text-muted">
              When you create an account, we collect your email address, name, and password. Passwords are cryptographically hashed and are never stored in plaintext.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Payment Information</h3>
            <p className="text-sm leading-relaxed text-muted">
              Credit card payments are processed by Stripe. We do not store, access, or retain your full credit card numbers, CVVs, or other sensitive card details. Stripe handles all payment card data in compliance with PCI-DSS standards. If you pay with USDC on Solana, we collect and store your wallet address. On-chain transaction data is public by nature.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Campaign Data</h3>
            <p className="text-sm leading-relaxed text-muted">
              We collect product descriptions, ideal customer profile (ICP) settings, messaging templates, platform preferences, and other campaign configuration data you provide to operate AI agents on your behalf.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Usage Data</h3>
            <p className="text-sm leading-relaxed text-muted">
              We collect information about how you interact with the Service, including API calls made, dashboard activity, features used, pages visited, and session duration.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Agent Activity Data</h3>
            <p className="text-sm leading-relaxed text-muted">
              We collect data related to the actions performed by AI agents on your behalf, including posts made, comments and replies sent, leads identified, engagement metrics (likes, shares, replies received), and conversion tracking data.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Technical Data</h3>
            <p className="text-sm leading-relaxed text-muted">
              We automatically collect technical information via standard web analytics, including your IP address, browser type and version, operating system, device type, screen resolution, referring URL, and approximate geographic location.
            </p>
          </section>

          {/* 3. How We Use Your Information */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">3.</span> How We Use Your Information
            </h2>
            <p className="text-sm leading-relaxed text-muted mb-3">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted">
              <li>To operate, maintain, and provide the Service, including running AI agent campaigns on your behalf.</li>
              <li>To process payments and manage your subscription.</li>
              <li>To send service-related notifications, including account confirmations, billing receipts, campaign status updates, and security alerts.</li>
              <li>To analyze usage patterns and improve features, performance, and user experience.</li>
              <li>To detect, prevent, and address fraud, abuse, and violations of our Terms of Service.</li>
              <li>To comply with applicable legal obligations.</li>
            </ul>
          </section>

          {/* 4. What We Don't Do */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">4.</span> What We Don&apos;t Do
            </h2>
            <p className="text-sm leading-relaxed text-muted mb-3">
              We want to be explicit about data practices we do not engage in:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted">
              <li><strong className="text-foreground/80">We never sell your personal data.</strong> Your information is not for sale to advertisers, data brokers, or any other third party.</li>
              <li><strong className="text-foreground/80">We never share your campaign data with competitors.</strong> Your product information, ICP settings, and campaign strategies are confidential and are never disclosed to other customers or competing services.</li>
              <li><strong className="text-foreground/80">We never use your product information for our own marketing</strong> without your explicit written consent.</li>
            </ul>
          </section>

          {/* 5. Data Sharing */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">5.</span> Data Sharing &amp; Third-Party Services
            </h2>
            <p className="text-sm leading-relaxed text-muted mb-3">
              We share your information with the following categories of third-party service providers, strictly as necessary to operate the Service:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted">
              <li><strong className="text-foreground/80">Stripe</strong> &mdash; Payment processing. Stripe receives your payment card information directly and is PCI-DSS compliant. See{" "}
                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Stripe&apos;s Privacy Policy</a>.
              </li>
              <li><strong className="text-foreground/80">Supabase</strong> &mdash; Database hosting and authentication. All data stored in Supabase is encrypted at rest.</li>
              <li><strong className="text-foreground/80">Vercel</strong> &mdash; Application hosting and content delivery. See{" "}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Vercel&apos;s Privacy Policy</a>.
              </li>
              <li><strong className="text-foreground/80">Social Platforms</strong> &mdash; LinkedIn, X (formerly Twitter), Reddit, Discord, Moltbook, and Farcaster. We share necessary data with these platforms as required to operate AI agents on your behalf. Each platform is governed by its own privacy policy and terms of service.</li>
              <li><strong className="text-foreground/80">Solana Blockchain</strong> &mdash; USDC payment transactions are recorded on the Solana blockchain and are public by nature. Wallet addresses and transaction amounts are permanently visible on-chain.</li>
              <li><strong className="text-foreground/80">Law Enforcement</strong> &mdash; We may disclose your information to law enforcement, government authorities, or other third parties only when we are legally required to do so (e.g., in response to a valid subpoena, court order, or legal process), or when we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others.</li>
            </ul>
          </section>

          {/* 6. Data Security */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">6.</span> Data Security
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              We implement reasonable technical and organizational measures to protect your information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted mt-3">
              <li>Encryption in transit using TLS 1.2 or higher for all data transmitted between your browser and our servers.</li>
              <li>Encryption at rest for all data stored in our databases.</li>
              <li>Role-based access controls to limit internal access to your data to authorized personnel only.</li>
              <li>Cryptographic hashing of passwords using industry-standard algorithms.</li>
              <li>Regular security reviews and vulnerability assessments.</li>
            </ul>
            <p className="text-sm leading-relaxed text-muted mt-3">
              While we take security seriously, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          {/* 7. Data Retention */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">7.</span> Data Retention
            </h2>
            <p className="text-sm leading-relaxed text-muted mb-3">
              We retain your information for the following periods:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted">
              <li><strong className="text-foreground/80">Account data</strong> &mdash; Retained for as long as your account is active, plus 90 days after account closure to allow for reactivation or data export requests.</li>
              <li><strong className="text-foreground/80">Campaign data</strong> &mdash; Retained for 12 months after the campaign ends, then permanently deleted.</li>
              <li><strong className="text-foreground/80">Activity logs</strong> &mdash; Agent activity logs, API call records, and usage data are retained for 6 months, then permanently deleted.</li>
              <li><strong className="text-foreground/80">Payment records</strong> &mdash; Retained for 7 years as required by applicable tax and financial regulations.</li>
              <li><strong className="text-foreground/80">On-chain transactions</strong> &mdash; USDC payment records on the Solana blockchain are permanent and cannot be deleted due to the immutable nature of blockchain technology.</li>
            </ul>
          </section>

          {/* 8. Your Rights */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">8.</span> Your Rights
            </h2>
            <p className="text-sm leading-relaxed text-muted mb-3">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted">
              <li><strong className="text-foreground/80">Access</strong> &mdash; You have the right to request a copy of the personal data we hold about you.</li>
              <li><strong className="text-foreground/80">Data Export</strong> &mdash; You may export your campaign data, lead information, and activity logs at any time in CSV or JSON format via the dashboard or by contacting us.</li>
              <li><strong className="text-foreground/80">Deletion</strong> &mdash; You may request deletion of your account and all associated personal data. We will process deletion requests within 30 days, subject to legal retention requirements.</li>
              <li><strong className="text-foreground/80">Correction</strong> &mdash; You may request correction of inaccurate personal data we hold about you.</li>
              <li><strong className="text-foreground/80">Opt-Out</strong> &mdash; You may opt out of non-essential communications (such as product updates and feature announcements) at any time. You cannot opt out of essential service communications (such as billing notices and security alerts).</li>
            </ul>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">GDPR (European Economic Area Users)</h3>
            <p className="text-sm leading-relaxed text-muted">
              If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR), including the right to data portability, the right to restrict processing, and the right to object to processing. Our legal basis for processing your data is contractual necessity (to provide the Service) and legitimate interest (to improve and secure the Service). To exercise your GDPR rights, contact us at hello@palmvox.com.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">CCPA (California Users)</h3>
            <p className="text-sm leading-relaxed text-muted">
              If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to request deletion, and the right to opt out of the sale of personal information. We do not sell personal information. To exercise your CCPA rights, contact us at hello@palmvox.com.
            </p>
          </section>

          {/* 9. Cookies */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">9.</span> Cookies
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              We use minimal cookies, limited to session cookies strictly necessary for authentication and maintaining your logged-in session. We do not use third-party tracking cookies, advertising cookies, or any form of cross-site tracking. No cookie consent banner is required because we only use essential cookies that are necessary for the Service to function.
            </p>
          </section>

          {/* 10. Children */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">10.</span> Children&apos;s Privacy
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              The Service is not intended for, directed at, or designed to attract individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have inadvertently collected personal information from a child under 18, we will take steps to delete that information as soon as possible. If you believe a child under 18 has provided us with personal information, please contact us at hello@palmvox.com.
            </p>
          </section>

          {/* 11. International Data Transfers */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">11.</span> International Data Transfers
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              PalmVox is based in the United States. If you access the Service from outside the United States, your information may be transferred to, stored, and processed in the United States or other countries where our service providers operate. These countries may have data protection laws that differ from those in your jurisdiction. By using the Service, you consent to the transfer of your information to the United States and other countries as described in this policy.
            </p>
          </section>

          {/* 12. Changes */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">12.</span> Changes to This Policy
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the &quot;Last updated&quot; date at the top of this page. For material changes that significantly affect how we handle your personal information, we will make reasonable efforts to notify you via email or in-app notification. Your continued use of the Service after the updated policy takes effect constitutes your acceptance of the changes.
            </p>
          </section>

          {/* 13. Contact */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">13.</span> Contact Us
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-sm text-muted mt-3">
              <strong className="text-foreground/80">PalmVox</strong><br />
              Email:{" "}
              <a href="mailto:hello@palmvox.com" className="text-accent hover:underline">
                hello@palmvox.com
              </a>
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
