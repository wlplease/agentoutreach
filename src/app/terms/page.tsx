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
        <p className="text-muted text-sm mb-2">
          Effective date: May 1, 2026
        </p>
        <p className="text-muted text-sm mb-12">
          Last updated: May 8, 2026
        </p>

        <div className="space-y-8">
          {/* 1. Acceptance */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">1.</span> Acceptance of Terms
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              By accessing or using any services provided by PalmVox (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;), including but not limited to AgentOutreach, AgentAlpha, and AgentHub (collectively, the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not access or use the Service. These Terms constitute a legally binding agreement between you and PalmVox. Your continued use of the Service following any modifications to these Terms constitutes acceptance of those modifications.
            </p>
          </section>

          {/* 2. Service Description */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">2.</span> Service Description
            </h2>
            <p className="text-sm leading-relaxed text-muted mb-3">
              PalmVox operates the following products and services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted">
              <li>
                <strong className="text-foreground/80">AgentOutreach</strong> &mdash; Provides autonomous AI sales agents that engage prospects on social platforms including LinkedIn, X (formerly Twitter), Reddit, Discord, Moltbook, and Farcaster on behalf of customers to generate leads and drive conversions.
              </li>
              <li>
                <strong className="text-foreground/80">AgentAlpha</strong> &mdash; Provides cryptocurrency trading APIs, market data, and autonomous trading agent services accessible at alpha.palmvox.com.
              </li>
              <li>
                <strong className="text-foreground/80">AgentHub</strong> &mdash; An x402 protocol router that enables pay-per-request API access and agent-to-agent payment routing across the PalmVox ecosystem.
              </li>
            </ul>
            <p className="text-sm leading-relaxed text-muted mt-3">
              The Service is available at agentoutreachsol.vercel.app, alpha.palmvox.com, and any other domains or subdomains operated by PalmVox.
            </p>
          </section>

          {/* 3. Account Terms */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">3.</span> Account Terms
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted">
              <li>You must be at least 18 years of age to create an account and use the Service.</li>
              <li>You must provide accurate, complete, and current information during registration and keep your account information up to date.</li>
              <li>You are solely responsible for maintaining the security and confidentiality of your account credentials, including your password and any API keys.</li>
              <li>You are responsible for all activity that occurs under your account, whether or not you authorized that activity.</li>
              <li>Each individual may maintain only one account. Creating multiple accounts to circumvent restrictions, abuse free tiers, or evade enforcement actions is prohibited.</li>
              <li>You must notify PalmVox immediately at hello@palmvox.com if you become aware of any unauthorized use of your account.</li>
            </ul>
          </section>

          {/* 4. Acceptable Use */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">4.</span> Acceptable Use Policy
            </h2>
            <p className="text-sm leading-relaxed text-muted mb-3">
              By using the Service, you agree not to use AI agents or any Service functionality to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted">
              <li>Send unsolicited mass messages, spam, or engage in any form of bulk unwanted outreach.</li>
              <li>Harass, threaten, bully, or intimidate any individual or organization.</li>
              <li>Impersonate any person, company, project, or entity, or falsely represent your affiliation with any party.</li>
              <li>Spread misinformation, disinformation, or deliberately misleading content.</li>
              <li>Violate the terms of service, community guidelines, or acceptable use policies of any third-party platform (including LinkedIn, X, Reddit, Discord, Moltbook, and Farcaster).</li>
              <li>Engage in, facilitate, or promote any illegal activity, including but not limited to securities fraud, money laundering, or the sale of illegal goods or services.</li>
              <li>Scrape, harvest, or collect personal data from individuals without their consent or in violation of applicable data protection laws.</li>
              <li>Target, solicit, or market to minors (individuals under 18 years of age).</li>
              <li>Distribute malware, phishing links, or any malicious software or content.</li>
              <li>Attempt to reverse engineer, decompile, or disassemble any part of the Service.</li>
            </ul>
            <p className="text-sm leading-relaxed text-muted mt-3">
              PalmVox reserves the right to investigate and take appropriate action against anyone who violates these provisions, including suspending or terminating accounts without notice or refund. You are solely responsible for ensuring that the product, service, or content you promote through the Service is legal in all applicable jurisdictions.
            </p>
          </section>

          {/* 5. Payment Terms */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">5.</span> Payment Terms
            </h2>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Billing</h3>
            <p className="text-sm leading-relaxed text-muted">
              Subscription plans are billed on a monthly recurring basis. Your billing cycle begins on the date you subscribe and renews automatically each month unless cancelled.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Payment Methods</h3>
            <p className="text-sm leading-relaxed text-muted">
              We accept payment via credit card (processed by Stripe) and USDC on the Solana blockchain (via the x402 protocol). All on-chain transactions are final and verifiable on the Solana blockchain.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Refunds</h3>
            <p className="text-sm leading-relaxed text-muted">
              No refunds are provided for partial months of service. If you cancel your subscription, you will retain access to the Service through the end of your current billing period.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Price Changes</h3>
            <p className="text-sm leading-relaxed text-muted">
              PalmVox may modify pricing at any time. We will provide at least 30 days&apos; advance notice of any price changes via email. Price changes take effect at the start of your next billing cycle following the notice period.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Failed Payments</h3>
            <p className="text-sm leading-relaxed text-muted">
              If a payment fails, we will attempt to notify you and retry the charge. If payment is not received within 7 days of the original due date, your account will be suspended until the outstanding balance is resolved.
            </p>
          </section>

          {/* 6. Intellectual Property */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">6.</span> Intellectual Property
            </h2>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Your Content</h3>
            <p className="text-sm leading-relaxed text-muted">
              Content generated by AI agents on your behalf (including outreach messages, posts, and engagement responses) is owned by you, the customer. You retain all rights to this content.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Our Platform</h3>
            <p className="text-sm leading-relaxed text-muted">
              PalmVox retains all rights, title, and interest in and to the Service, including all software, algorithms, machine learning models, user interface designs, and underlying technology. Nothing in these Terms transfers any PalmVox intellectual property to you.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">License Grant</h3>
            <p className="text-sm leading-relaxed text-muted">
              By using the Service, you grant PalmVox a non-exclusive, worldwide, royalty-free license to use, process, and display your product information, campaign configurations, and related materials solely for the purpose of operating AI agents and providing the Service to you.
            </p>
          </section>

          {/* 7. Data & Privacy */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">7.</span> Data &amp; Privacy
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              Your use of the Service is also governed by our{" "}
              <Link href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              , which describes how we collect, use, store, and protect your information. By using the Service, you consent to the data practices described in our Privacy Policy.
            </p>
          </section>

          {/* 8. Service Availability */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">8.</span> Service Availability
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted">
              <li>The Service is provided on a best-effort basis. We do not guarantee uninterrupted or error-free operation.</li>
              <li>Free and Starter tier plans are provided without any uptime guarantee or service level agreement (SLA).</li>
              <li>Growth and Scale tier plans include a target uptime of 99.5%, measured on a monthly basis. This is a target, not a guarantee, and does not entitle you to credits or refunds for downtime.</li>
              <li>We may perform scheduled maintenance that temporarily affects availability. We will provide reasonable advance notice of planned maintenance windows via email or in-app notification.</li>
              <li>PalmVox is not responsible for downtime or service disruptions caused by third-party platforms, network providers, or events beyond our reasonable control.</li>
            </ul>
          </section>

          {/* 9. Limitation of Liability */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">9.</span> Limitation of Liability
            </h2>
            <p className="text-sm leading-relaxed text-muted mb-3">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-sm leading-relaxed text-muted mb-3">
              PalmVox shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted">
              <li>Account suspensions or bans imposed by third-party platforms (LinkedIn, X, Reddit, Discord, Moltbook, Farcaster, or others).</li>
              <li>Changes to third-party platform algorithms, APIs, or policies that affect agent performance.</li>
              <li>Lost leads, missed opportunities, or failed conversions.</li>
              <li>Loss of revenue, profits, data, or business arising from your use of the Service.</li>
              <li>Actions taken by AI agents that comply with your configured campaign settings and parameters.</li>
            </ul>
            <p className="text-sm leading-relaxed text-muted mt-3">
              IN NO EVENT SHALL PALMVOX&apos;S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE EXCEED THE TOTAL AMOUNT PAID BY YOU TO PALMVOX DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM. IF YOU HAVE NOT MADE ANY PAYMENTS, PALMVOX&apos;S MAXIMUM LIABILITY SHALL BE FIFTY UNITED STATES DOLLARS (US $50.00).
            </p>
          </section>

          {/* 10. Indemnification */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">10.</span> Indemnification
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              You agree to indemnify, defend, and hold harmless PalmVox, its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or related to: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any third-party rights, including intellectual property or privacy rights; (d) the content, products, or services you promote through the Service; or (e) any claim that your use of the Service caused damage to a third party.
            </p>
          </section>

          {/* 11. Termination */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">11.</span> Termination
            </h2>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Termination by You</h3>
            <p className="text-sm leading-relaxed text-muted">
              You may terminate your account at any time by providing 30 days&apos; written notice to hello@palmvox.com or by using the account cancellation feature in your dashboard. Your access will continue through the end of your current billing period.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Termination by PalmVox</h3>
            <p className="text-sm leading-relaxed text-muted">
              PalmVox may terminate your account with 30 days&apos; notice for any reason. PalmVox may also terminate or suspend your account immediately, without prior notice, for violations of these Terms, illegal activity, or conduct that we determine is harmful to the Service, other users, or third parties.
            </p>

            <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4">Effect of Termination</h3>
            <p className="text-sm leading-relaxed text-muted">
              Upon termination, your right to use the Service ceases immediately. You will have 30 days from the date of termination to export your data (including campaign data, lead information, and activity logs) via the dashboard or by requesting an export at hello@palmvox.com. After this 30-day period, your data will be permanently deleted in accordance with our Privacy Policy.
            </p>
          </section>

          {/* 12. Governing Law */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">12.</span> Governing Law &amp; Dispute Resolution
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any disputes arising out of or relating to these Terms or the Service shall be resolved exclusively in the state or federal courts located in the State of Delaware, and you consent to the personal jurisdiction of such courts.
            </p>
          </section>

          {/* 13. Changes to Terms */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">13.</span> Changes to These Terms
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              PalmVox reserves the right to modify these Terms at any time. We will provide at least 30 days&apos; advance notice of material changes via email to the address associated with your account. The updated Terms will also be posted on this page with a revised &quot;Last updated&quot; date. Your continued use of the Service after the effective date of the revised Terms constitutes your acceptance of the changes. If you do not agree to the revised Terms, you must stop using the Service and terminate your account.
            </p>
          </section>

          {/* 14. Contact */}
          <section className="glass rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              <span className="gradient-text">14.</span> Contact Information
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              If you have any questions, concerns, or requests regarding these Terms of Service, please contact us at:
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
            <Link href="/terms" className="text-foreground">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
          <div className="text-xs text-muted">&copy; 2026 PalmVox</div>
        </div>
      </footer>
    </div>
  );
}
