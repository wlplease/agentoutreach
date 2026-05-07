"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const stepLabels = ["Your Product", "Ideal Customer", "Platforms & Style", "Launch"];

const platformOptions = [
  { id: "moltbook", name: "Moltbook", desc: "AI agent social network" },
  { id: "farcaster", name: "Farcaster", desc: "Decentralized social protocol" },
  { id: "x", name: "X / Twitter", desc: "Crypto Twitter outreach" },
  { id: "discord", name: "Discord", desc: "Community server engagement" },
];

const personalityOptions = [
  "Professional",
  "Casual",
  "Technical",
  "Friendly",
  "Educational",
  "Data-Driven",
  "Witty",
  "Authoritative",
];

const walletOptions = ["Any", "$100+", "$1k+", "$10k+", "$100k+"];

interface FormData {
  productName: string;
  productUrl: string;
  productDescription: string;
  problemSolved: string;
  persona: string;
  chains: string;
  interests: string;
  keywords: string;
  minWalletValue: string;
  platforms: string[];
  personality: string[];
  ctaUrl: string;
  campaignName: string;
}

const initialFormData: FormData = {
  productName: "",
  productUrl: "",
  productDescription: "",
  problemSolved: "",
  persona: "",
  chains: "",
  interests: "",
  keywords: "",
  minWalletValue: "Any",
  platforms: [],
  personality: [],
  ctaUrl: "",
  campaignName: "",
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [launching, setLaunching] = useState(false);

  const update = (field: keyof FormData, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const togglePlatform = (id: string) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(id)
        ? prev.platforms.filter((p) => p !== id)
        : [...prev.platforms, id],
    }));
  };

  const togglePersonality = (trait: string) => {
    setForm((prev) => ({
      ...prev,
      personality: prev.personality.includes(trait)
        ? prev.personality.filter((t) => t !== trait)
        : [...prev.personality, trait],
    }));
  };

  const campaignName =
    form.campaignName ||
    (form.productName
      ? `${form.productName} Outreach Campaign`
      : "");

  const handleLaunch = async () => {
    setLaunching(true);
    try {
      await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          campaignName: campaignName,
        }),
      });
      router.push("/dashboard");
    } catch {
      setLaunching(false);
    }
  };

  const inputClass =
    "w-full bg-surface border border-border rounded-xl px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors";

  const labelClass = "block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2";

  return (
    <div className="min-h-screen mesh-bg">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center">
          <Link href="/" className="text-lg sm:text-xl font-black tracking-tight">
            Agent<span className="gradient-text">Outreach</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                    i === step
                      ? "bg-gradient-to-r from-accent to-accent2 text-white shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                      : i < step
                      ? "bg-accent/20 text-accent border border-accent/30"
                      : "bg-surface border border-border text-muted"
                  }`}
                >
                  {i < step ? "\u2713" : i + 1}
                </div>
                <span
                  className={`text-[9px] sm:text-xs mt-1.5 sm:mt-2 font-medium text-center whitespace-nowrap ${
                    i === step ? "text-accent" : "text-muted"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < stepLabels.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 sm:mx-3 mt-[-1rem] ${
                    i < step ? "bg-accent/40" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="glass rounded-2xl p-4 sm:p-6 md:p-8">
          {/* Step 1: Your Product */}
          {step === 0 && (
            <div className="space-y-4 sm:space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
                  Tell us about your <span className="gradient-text">product</span>
                </h2>
                <p className="text-muted text-xs sm:text-sm">
                  Help our agent understand what you&apos;ve built so it can pitch it authentically.
                </p>
              </div>

              <div>
                <label className={labelClass}>Product Name</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. SuperSwap"
                  value={form.productName}
                  onChange={(e) => update("productName", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Product URL</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="https://yourproject.com"
                  value={form.productUrl}
                  onChange={(e) => update("productUrl", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Product Description</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  placeholder="Describe what your product does in 2-3 sentences..."
                  value={form.productDescription}
                  onChange={(e) => update("productDescription", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>What problem does it solve?</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={2}
                  placeholder="What pain point does your product address?"
                  value={form.problemSolved}
                  onChange={(e) => update("problemSolved", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Ideal Customer */}
          {step === 1 && (
            <div className="space-y-4 sm:space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
                  Define your <span className="gradient-text">ideal customer</span>
                </h2>
                <p className="text-muted text-xs sm:text-sm">
                  The more specific you are, the better our agent targets the right people.
                </p>
              </div>

              <div>
                <label className={labelClass}>Persona</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="DeFi traders, NFT collectors, Solana devs..."
                  value={form.persona}
                  onChange={(e) => update("persona", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Chains they use</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Solana, Base, Ethereum..."
                  value={form.chains}
                  onChange={(e) => update("chains", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Interests</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Yield farming, NFTs, gaming..."
                  value={form.interests}
                  onChange={(e) => update("interests", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Keywords to target</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="auto-compound, staking rewards..."
                  value={form.keywords}
                  onChange={(e) => update("keywords", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Min wallet value</label>
                <select
                  className={inputClass}
                  value={form.minWalletValue}
                  onChange={(e) => update("minWalletValue", e.target.value)}
                >
                  {walletOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Platforms & Style */}
          {step === 2 && (
            <div className="space-y-5 sm:space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
                  Choose <span className="gradient-text">platforms & style</span>
                </h2>
                <p className="text-muted text-xs sm:text-sm">
                  Where should the agent engage, and how should it sound?
                </p>
              </div>

              <div>
                <label className={labelClass}>Platforms</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {platformOptions.map((p) => {
                    const selected = form.platforms.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => togglePlatform(p.id)}
                        className={`glass rounded-xl p-4 sm:p-5 text-left transition-all cursor-pointer hover:-translate-y-0.5 ${
                          selected
                            ? "border-accent/50 shadow-[0_0_20px_rgba(0,212,255,0.1)] bg-accent/5"
                            : "hover:border-border/80"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm sm:text-base">{p.name}</span>
                          <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                              selected
                                ? "border-accent bg-accent text-white"
                                : "border-muted/30"
                            }`}
                          >
                            {selected && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path
                                  d="M2.5 6L5 8.5L9.5 3.5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-muted text-xs sm:text-sm">{p.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className={labelClass}>Agent Personality</label>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {personalityOptions.map((trait) => {
                    const selected = form.personality.includes(trait);
                    return (
                      <button
                        key={trait}
                        type="button"
                        onClick={() => togglePersonality(trait)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          selected
                            ? "bg-gradient-to-r from-accent to-accent2 text-white shadow-[0_2px_12px_rgba(0,212,255,0.2)]"
                            : "bg-surface border border-border text-muted hover:text-foreground hover:border-accent/30"
                        }`}
                      >
                        {trait}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className={labelClass}>CTA URL</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="https://yourproject.com/signup"
                  value={form.ctaUrl}
                  onChange={(e) => update("ctaUrl", e.target.value)}
                />
                <p className="text-muted text-[10px] sm:text-xs mt-1.5">
                  Where should the agent drive traffic?
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Launch */}
          {step === 3 && (
            <div className="space-y-5 sm:space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
                  Ready to <span className="gradient-text">launch</span>
                </h2>
                <p className="text-muted text-xs sm:text-sm">
                  Review your setup and launch your AI sales agent.
                </p>
              </div>

              {/* Summary */}
              <div className="space-y-3">
                <div className="bg-surface/50 rounded-xl p-4 sm:p-5 border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-muted">Product</span>
                    <span className="text-sm sm:text-base font-semibold">
                      {form.productName || "—"}
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-muted">Platforms</span>
                    <span className="text-sm sm:text-base font-semibold">
                      {form.platforms.length > 0
                        ? form.platforms
                            .map(
                              (id) =>
                                platformOptions.find((p) => p.id === id)?.name
                            )
                            .join(", ")
                        : "—"}
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-muted">Personality</span>
                    <span className="text-sm sm:text-base font-semibold">
                      {form.personality.length > 0
                        ? form.personality.join(", ")
                        : "—"}
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-muted">Target</span>
                    <span className="text-sm sm:text-base font-semibold">
                      {form.persona || "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Campaign Name */}
              <div>
                <label className={labelClass}>Campaign Name</label>
                <input
                  type="text"
                  className={inputClass}
                  value={campaignName}
                  onChange={(e) => update("campaignName", e.target.value)}
                  placeholder="My Outreach Campaign"
                />
              </div>

              {/* Launch Button */}
              <button
                type="button"
                onClick={handleLaunch}
                disabled={launching}
                className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold text-base sm:text-lg shadow-[0_4px_24px_rgba(0,212,255,0.25)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {launching ? "Launching..." : "Launch Agent"}
              </button>

              <p className="text-center text-muted text-[10px] sm:text-xs">
                Your agent will start engaging within 30 minutes.
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6 sm:mt-8">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-border bg-surface/50 text-sm sm:text-base font-semibold hover:border-accent/30 hover:-translate-y-0.5 transition-all cursor-pointer ${
              step === 0 ? "invisible" : ""
            }`}
          >
            Back
          </button>

          {step < 3 && (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white text-sm sm:text-base font-bold shadow-[0_4px_20px_rgba(0,212,255,0.2)] hover:shadow-[0_8px_32px_rgba(0,212,255,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
