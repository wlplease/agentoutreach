"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const HCAPTCHA_SITE_KEY = "b396d9cc-9e0e-4954-8daa-1c14c1aa155e";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!captchaToken) {
      setError("Please complete the CAPTCHA");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    if (mode === "signup") {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, captchaToken }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Signup failed");
        } else {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
            options: { captchaToken },
          });
          if (signInError) {
            setSuccess("Account created! You can now sign in.");
            setMode("signin");
          } else {
            router.push("/onboarding");
            return;
          }
        }
      } catch {
        setError("Something went wrong. Please try again.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: { captchaToken },
      });
      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
      }
    }

    // Reset captcha after attempt
    setCaptchaToken(null);
    captchaRef.current?.resetCaptcha();
    setLoading(false);
  };

  return (
    <div className="min-h-screen mesh-bg">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center">
          <Link href="/" className="text-lg sm:text-xl font-black tracking-tight">
            Agent<span className="gradient-text">Outreach</span>
          </Link>
        </div>
      </nav>

      {/* Login Card */}
      <div className="flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="w-full max-w-md">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-center mb-1">
              {mode === "signin" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-muted text-sm text-center mb-6 sm:mb-8">
              {mode === "signin"
                ? "Sign in to your AgentOutreach dashboard"
                : "Get started with AgentOutreach"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted/50 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted/50 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                />
                {mode === "signin" && (
                  <div className="mt-1.5 text-right">
                    <Link href="/reset-password" className="text-xs text-muted hover:text-accent transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                )}
              </div>

              {/* hCaptcha */}
              <div className="flex justify-center">
                <HCaptcha
                  sitekey={HCAPTCHA_SITE_KEY}
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                  ref={captchaRef}
                  theme="dark"
                />
              </div>

              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="px-4 py-3 rounded-xl bg-green/10 border border-green/20 text-green text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !captchaToken}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold text-sm shadow-[0_4px_20px_rgba(0,212,255,0.2)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading
                  ? "Loading..."
                  : mode === "signin"
                  ? "Sign In"
                  : "Sign Up"}
              </button>
            </form>

            <div className="mt-6 text-center">
              {mode === "signin" ? (
                <p className="text-sm text-muted">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => { setMode("signup"); setError(""); setSuccess(""); setCaptchaToken(null); captchaRef.current?.resetCaptcha(); }}
                    className="text-accent font-semibold hover:underline cursor-pointer"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-sm text-muted">
                  Already have an account?{" "}
                  <button
                    onClick={() => { setMode("signin"); setError(""); setSuccess(""); setCaptchaToken(null); captchaRef.current?.resetCaptcha(); }}
                    className="text-accent font-semibold hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
