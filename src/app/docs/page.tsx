import Link from "next/link";

export const metadata = {
  title: "API Documentation — AgentOutreach by PalmVox",
  description:
    "Everything you need to integrate AgentOutreach. REST API reference, authentication, endpoints, rate limits, and examples.",
};

const endpoints = [
  { method: "POST", path: "/api/campaigns", description: "Create a new campaign" },
  { method: "GET", path: "/api/campaigns?user_id=X", description: "List your campaigns" },
  { method: "GET", path: "/api/campaigns/:id", description: "Get campaign details with stats, leads, activity" },
  { method: "PATCH", path: "/api/campaigns/:id", description: "Update a campaign" },
  { method: "DELETE", path: "/api/campaigns/:id", description: "Delete a campaign" },
  { method: "GET", path: "/api/leads?campaign_id=X", description: "List leads for a campaign" },
  { method: "GET", path: "/api/activity?campaign_id=X", description: "Get agent activity log" },
  { method: "POST", path: "/api/agent/run", description: "Trigger agent for a campaign" },
  { method: "GET", path: "/api/agent/status?campaign_id=X", description: "Check agent status" },
];

const rateLimits = [
  { tier: "Free", limit: "100 requests/day" },
  { tier: "Starter", limit: "1,000 requests/day" },
  { tier: "Growth", limit: "10,000 requests/day" },
  { tier: "Scale", limit: "Unlimited" },
];

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-green/10 text-green border-green/20",
    POST: "bg-accent/10 text-accent border-accent/20",
    PATCH: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    DELETE: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span
      className={`text-[10px] sm:text-xs font-mono font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border ${colors[method] || "bg-surface2 text-muted border-border"}`}
    >
      {method}
    </span>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen mesh-bg">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="text-lg sm:text-xl font-black tracking-tight">
            Agent<span className="gradient-text">Outreach</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              &larr; Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-accent to-accent2 text-white hover:opacity-90 transition-all hover:-translate-y-0.5"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3">
            API <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-muted text-sm sm:text-lg max-w-2xl">
            Everything you need to integrate AgentOutreach into your workflow.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {/* Authentication */}
          <section className="glass rounded-2xl p-5 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Authentication</h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-4">
              All API requests require an API key passed in the request header.
            </p>
            <div className="bg-surface2 rounded-xl p-4 font-mono text-xs sm:text-sm text-muted overflow-x-auto">
              <span className="text-foreground/60">Authorization:</span>{" "}
              <span className="text-accent">Bearer your_api_key</span>
            </div>
            <p className="text-muted text-xs sm:text-sm mt-4">
              Get your API key from the{" "}
              <Link href="/dashboard" className="text-accent hover:underline">
                dashboard
              </Link>
              .
            </p>
          </section>

          {/* Endpoints */}
          <section className="glass rounded-2xl p-5 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold mb-6">Endpoints</h2>
            <div className="space-y-3">
              {endpoints.map((ep) => (
                <div
                  key={`${ep.method}-${ep.path}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-surface2/50 rounded-xl px-4 py-3 sm:py-3.5"
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <MethodBadge method={ep.method} />
                    <code className="text-xs sm:text-sm font-mono text-foreground/80">
                      {ep.path}
                    </code>
                  </div>
                  <span className="text-muted text-xs sm:text-sm sm:ml-auto">
                    {ep.description}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Example Request */}
          <section className="glass rounded-2xl p-5 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Example Request</h2>
            <p className="text-muted text-sm sm:text-base mb-4">
              Create a new campaign with a single POST request:
            </p>
            <div className="bg-surface2 rounded-xl p-4 sm:p-5 font-mono text-[11px] sm:text-sm text-muted overflow-x-auto leading-relaxed">
              <div>
                <span className="text-accent">curl</span>{" "}
                <span className="text-foreground/60">-X POST</span>{" "}
                <span className="text-green">
                  https://agentoutreachsol.vercel.app/api/campaigns
                </span>{" "}
                \
              </div>
              <div className="pl-4">
                <span className="text-foreground/60">-H</span>{" "}
                <span className="text-accent2">
                  &quot;Content-Type: application/json&quot;
                </span>{" "}
                \
              </div>
              <div className="pl-4">
                <span className="text-foreground/60">-H</span>{" "}
                <span className="text-accent2">
                  &quot;Authorization: Bearer your_api_key&quot;
                </span>{" "}
                \
              </div>
              <div className="pl-4">
                <span className="text-foreground/60">-d</span>{" "}
                <span className="text-accent2">
                  {
                    "'{\"name\": \"My Campaign\", \"product_url\": \"https://example.com\", \"platforms\": [\"linkedin\", \"x\"]}'"
                  }
                </span>
              </div>
            </div>
          </section>

          {/* Rate Limits */}
          <section className="glass rounded-2xl p-5 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold mb-6">Rate Limits</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {rateLimits.map((rl) => (
                <div
                  key={rl.tier}
                  className="bg-surface2/50 rounded-xl p-4 text-center"
                >
                  <div className="text-xs sm:text-sm font-semibold mb-1">
                    {rl.tier}
                  </div>
                  <div className="text-accent text-xs sm:text-sm font-mono">
                    {rl.limit}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-muted text-xs sm:text-sm mt-4">
              Rate limits reset daily at midnight UTC. If you exceed your limit,
              requests return a{" "}
              <code className="text-accent bg-surface2 px-1.5 py-0.5 rounded">
                429
              </code>{" "}
              status code.
            </p>
          </section>

          {/* Response Format */}
          <section className="glass rounded-2xl p-5 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Response Format</h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-4">
              All responses are JSON. Successful responses return the requested
              data directly. Errors return an object with an{" "}
              <code className="text-accent bg-surface2 px-1.5 py-0.5 rounded text-xs sm:text-sm">
                error
              </code>{" "}
              field.
            </p>
            <div className="bg-surface2 rounded-xl p-4 sm:p-5 font-mono text-[11px] sm:text-sm text-muted overflow-x-auto leading-relaxed">
              <div>{"{"}</div>
              <div className="pl-4">
                <span className="text-accent2">&quot;error&quot;</span>
                <span className="text-foreground/60">:</span>{" "}
                <span className="text-green">
                  &quot;Unauthorized: Invalid API key&quot;
                </span>
              </div>
              <div>{"}"}</div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-bold">
            Agent<span className="gradient-text">Outreach</span>
            <span className="text-muted font-normal ml-2">by PalmVox</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted">
            <Link href="/docs" className="text-foreground">Docs</Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
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
