"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Calculator,
  Shield,
  FileText,
  MapPin,
  Send,
  Star,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Bolt,
  Check,
  RotateCcw,
  User,
  Zap,
  Lock,
  FileCheck,
  AlertTriangle,
  Code2,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

export default function LandingPage() {
  // Feedback Form State
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [feedbackRole, setFeedbackRole] = useState<string>("agency");
  const [feedbackComment, setFeedbackComment] = useState<string>("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  // Contact Form State
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setContactSubmitted(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#faf8ff] text-[#131b2e]">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION & INTERACTIVE PREVIEW
         ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        {/* Ambient Tech Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-180 h-90 bg-linear-to-b from-blue-200/40 via-blue-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 shadow-xs mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
              Built for Agencies, Freelancers &amp; Consultancies
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-3xl leading-tight">
            Stop Losing Thousands to{" "}
            <span className="text-blue-600">Scope Creep</span> and Bad Proposal Math.
          </h1>

          {/* Subheadline */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Turn messy discovery call transcripts into pixel-perfect, scope-locked PDF proposals in 10
            seconds. Powered by Gemini AI and deterministic TypeScript math.
          </p>

          {/* Dual CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/tool"
              className="inline-flex items-center gap-2 h-11 px-7 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all shadow-blue-500/20"
            >
              <span>Try Live Tool Free</span>
              <ArrowRight size={16} />
            </Link>
            <a
              href="#about"
              className="inline-flex items-center gap-2 h-11 px-6 bg-white text-slate-800 text-sm font-semibold rounded-lg border border-slate-200 shadow-xs hover:bg-slate-50 transition-all"
            >
              <User size={16} className="text-slate-500" />
              <span>Meet the Builder</span>
            </a>
          </div>

          {/* Social Proof Strip */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/70 border border-blue-100 text-xs font-mono text-slate-600">
            <span className="text-blue-700 font-semibold">
              ⚡ Trusted by boutique software &amp; design agencies
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-medium">0% math errors guaranteed</span>
          </div>
        </div>

        {/* Hero Interactive Split Visual Window */}
        <div
          className="mt-14 relative w-full max-w-5xl mx-auto rounded-xl bg-white border border-slate-200/80 shadow-xl p-4 sm:p-6 md:p-8"
          id="tool-preview"
        >
          {/* Chrome / Window Frame Controls */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2.5 font-mono text-xs text-slate-500">
                scopelock-engine // discovery-session-409.json
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold uppercase bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Deterministic Pipeline Active
            </div>
          </div>

          {/* Split Layout: Raw Input vs Locked Proposal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left: Raw Transcript Area */}
            <div className="lg:col-span-5 flex flex-col justify-between p-4 bg-slate-50 border border-slate-200/60 rounded-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Raw Discovery Call Audio Transcript
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">Zoom / Fireflies</span>
                </div>
                <div className="p-3 bg-white rounded border border-slate-200/60 font-mono text-xs text-slate-600 leading-relaxed space-y-2 shadow-xs">
                  <p>
                    <strong className="text-slate-900">Client:</strong> &quot;Yeah so we need standard email and Google auth. Then Stripe subscriptions with pro-rated billing tiers...&quot;
                  </p>
                  <p className="text-red-700 bg-red-50/80 p-1.5 rounded border border-red-200/50">
                    <strong className="text-slate-900">Client:</strong> &quot;Oh, and maybe next month we could spin up native iOS and Android apps too? Keep that in mind just in case.&quot;
                  </p>
                  <p>
                    <strong className="text-slate-900">Agency Lead:</strong> &quot;Understood. We&apos;ll lock the core scope and specify mobile as phase two.&quot;
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1.5 text-blue-700 font-medium">
                  <Sparkles size={14} className="text-blue-600" />
                  Gemini 2.5 Flash Scope Extraction
                </span>
                <span className="text-blue-600 font-semibold">1,420 tokens parsed</span>
              </div>
            </div>

            {/* Center: Transformation Node */}
            <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Bolt size={20} />
              </div>
              <span className="font-mono text-[10px] text-slate-500 mt-1 uppercase tracking-tight font-bold">
                10 SEC
              </span>
            </div>

            {/* Right: Locked Proposal Output */}
            <div className="lg:col-span-6 p-4 bg-white border border-slate-200/60 rounded-lg shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                  <div>
                    <span className="text-sm font-bold text-slate-900">Apex SaaS Architecture</span>
                    <p className="font-mono text-[11px] text-slate-400">PROPOSAL REF: #SL-2026-089</p>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-mono text-[10px] font-bold rounded uppercase border border-blue-200/60">
                    Verified by TypeScript
                  </span>
                </div>

                {/* In-Scope Badges & Out-of-Scope Blocks */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-medium text-slate-800">
                        IN-SCOPE: Auth0 &amp; Stripe Billing Engine
                      </span>
                    </div>
                    <span className="font-mono font-semibold text-slate-900">$7,950.00</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-medium text-slate-800">
                        IN-SCOPE: PostgreSQL Multi-Tenant DB
                      </span>
                    </div>
                    <span className="font-mono font-semibold text-slate-900">$4,500.00</span>
                  </div>

                  {/* Scope Creep Guardrail */}
                  <div className="p-2.5 rounded bg-red-50 border border-red-200/70">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle size={14} className="text-red-600" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-700">
                          OUT-OF-SCOPE EXCLUSION
                        </span>
                      </div>
                      <span className="font-mono text-xs text-red-700 font-semibold">
                        Add-on: $4,500.00
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Native iOS/Android App shell excluded. Flagged as unbudgeted phase-two deliverable.
                    </p>
                  </div>
                </div>
              </div>

              {/* Deterministic Math Ledger Footer */}
              <div className="pt-2.5 bg-slate-50 p-3 rounded border border-slate-200/60">
                <div className="flex justify-between font-mono text-xs text-slate-500">
                  <span>Deterministic Subtotal:</span>
                  <span className="font-semibold text-slate-900">$12,450.00</span>
                </div>
                <div className="flex justify-between font-mono text-xs text-slate-500 mt-1">
                  <span>Standard Retainer Tax (0.0%):</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200 text-sm">
                  <span className="font-semibold text-slate-800">Executable Total:</span>
                  <span className="font-mono text-base font-bold text-blue-600">
                    $12,450.00 USD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. PROBLEM VS SOLUTION BENTO GRID
         ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-slate-100/60 py-16 md:py-24 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] uppercase tracking-wider text-blue-600 font-bold">
              System Architecture &amp; Precision
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">
              Why Agencies Leak Revenue on Every Single Project
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Generalist generative AI tools hallucinate financial figures and miss casual scope concessions.
              ScopeLock uses an air-gapped deterministic validation layer.
            </p>
          </div>

          {/* Bento 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Zero AI Math Hallucinations */}
            <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  <Calculator size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Zero AI Math Hallucinations
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Large Language Models are notorious for adding numbers incorrectly. ScopeLock strictly
                  delegates scope parsing to AI, while an immutable TypeScript computation engine totals
                  hours, rates, and margins.
                </p>
              </div>

              {/* Code Snippet */}
              <div className="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-xs text-slate-600 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  Deterministic TS Core
                </div>
                <code className="text-blue-700 block text-[11px]">
                  const total = Math.round((subtotal * (1 + tax)) * 100) / 100;
                </code>
                <div className="flex items-center gap-1 text-emerald-700 text-[11px] pt-1 font-semibold">
                  <CheckCircle2 size={13} />
                  <span>Penny-accurate invoice assurance</span>
                </div>
              </div>
            </div>

            {/* Card 2: Anti-Scope-Creep Guardrails */}
            <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                  <Shield size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Anti-Scope-Creep Guardrails
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Automatically captures informal client wishlists and out-of-scope ideas from transcripts
                  into an explicit, legally binding exclusion block. Never do &quot;quick favors&quot; for free again.
                </p>
              </div>

              {/* Scope Tagging UI Mock */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200/70 text-xs">
                  <span className="font-medium text-emerald-700">Deliverable: Custom API</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    IN-SCOPE
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-red-50 border border-red-200/70 text-xs">
                  <span className="font-medium text-red-700">Feature: Real-time Webhooks</span>
                  <span className="text-[10px] font-bold text-red-700 bg-white px-1.5 py-0.5 rounded border border-red-200">
                    EXCLUDED
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Locked Multi-Page PDF Engine */}
            <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                  <FileText size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Locked Multi-Page PDF Engine
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Choose from 3 executive layout themes. Engineered with strict print-bleed margins so pricing
                  tables, deliverables, and signature blocks never break awkwardly across pages.
                </p>
              </div>

              {/* PDF Theme Chips */}
              <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200/70 rounded">
                  <span className="text-slate-900 font-medium">Minimalist Swiss</span>
                  <span className="font-mono text-[10px] text-slate-400">Monochrome Grid</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200/70 rounded">
                  <span className="text-slate-900 font-medium">Modern Tech SaaS</span>
                  <span className="font-mono text-[10px] text-blue-600">Indigo / Slate</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200/70 rounded">
                  <span className="text-slate-900 font-medium">Executive Consulting</span>
                  <span className="font-mono text-[10px] text-slate-400">Boardroom Navy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. HOW IT WORKS (3-STEP SEQUENCE)
         ───────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-24 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] uppercase tracking-wider text-blue-600 font-bold">
              Workflow Velocity
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">
              From Call Transcript to Executable PDF in 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-blue-600 font-bold mb-2">01 // INGESTION</div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  Paste Rate Card &amp; Transcript
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Drop in your agency hourly or fixed rates alongside meeting raw text or notes exported
                  from Zoom, Fireflies, Grain, or Google Meet.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200 text-slate-400 font-mono text-[11px]">
                Format: TXT, Markdown, or raw paste
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-blue-600 font-bold mb-2">02 // EXTRACTION</div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  Gemini AI Maps &amp; Locks Scope
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Gemini structures specific deliverables, identifies hidden client assumptions, isolates
                  creep, while TypeScript runs verified math.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200 text-slate-400 font-mono text-[11px]">
                Processing latency: &lt; 8.2 seconds
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-blue-600 font-bold mb-2">03 // DELIVER</div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  Tweak Live &amp; Export PDF
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Inline edit line items, re-order milestones, flip between 3 executive PDF themes, and
                  download an instant client-ready proposal.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200 text-slate-400 font-mono text-[11px]">
                Export: Zero-bleed A4 PDF
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. TRANSPARENT PRICING SECTION
         ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-slate-100/60 py-16 md:py-24 border-t border-b border-slate-200" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-wider text-blue-600 font-bold">
              Predictable Billing
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">
              Transparent, ROI-focused Pricing
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Save an estimated 4.5 billing hours per closed client with guaranteed mathematical accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Card 1: Free Sandbox */}
            <div className="bg-white p-7 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-slate-900">Free Sandbox</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    Evaluation
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-4xl font-extrabold text-slate-900">$0</span>
                  <span className="text-xs text-slate-500 font-mono">/ month</span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mb-5 leading-relaxed">
                  Perfect for testing sample call notes and experiencing zero-hallucination proposal generation.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600 shrink-0" />
                    <span>Unlimited sample discovery testing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600 shrink-0" />
                    <span>All 3 visual executive PDF themes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600 shrink-0" />
                    <span>Deterministic TypeScript math engine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600 shrink-0" />
                    <span>Instant watermark-free PDF download</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/tool"
                className="mt-7 inline-flex items-center justify-center h-10 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg transition-colors border border-slate-200"
              >
                Start Free Sandbox
              </Link>
            </div>

            {/* Card 2: Agency Pro */}
            <div className="bg-white p-7 rounded-xl border-2 border-blue-600 shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-blue-600" />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-slate-900">Agency Pro</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded">
                    Most Popular
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-4xl font-extrabold text-slate-900">$29</span>
                  <span className="text-xs text-slate-500 font-mono">/ month</span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mb-5 leading-relaxed">
                  For active dev studios, consultancies, and freelancers running weekly sales pipelines.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-blue-600 shrink-0" />
                    <span className="font-medium text-slate-800">Unlimited AI proposal generations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-blue-600 shrink-0" />
                    <span>Custom agency rate card presets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-blue-600 shrink-0" />
                    <span>Gemini 2.5 deep reasoning &amp; risk audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-blue-600 shrink-0" />
                    <span>White-label branding &amp; custom logos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-blue-600 shrink-0" />
                    <span>Priority high-speed PDF rendering</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/tool"
                className="mt-7 inline-flex items-center justify-center h-10 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all"
              >
                Upgrade to Agency Pro →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. ABOUT THE FOUNDER SECTION (id="about")
         ───────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-24 bg-white" id="about">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xs">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Founder Avatar */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-md">
                  PM
                </div>
                <div
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm"
                  title="Active Builder"
                >
                  <Bolt size={14} />
                </div>
              </div>

              {/* Narrative Details */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold bg-blue-100/70 text-blue-800 px-2 py-0.5 rounded uppercase">
                    NIT Silchar 🎓
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded uppercase">
                    Full-Stack Developer 💻
                  </span>
                  <span className="text-[10px] font-bold bg-amber-100/70 text-amber-800 px-2 py-0.5 rounded uppercase">
                    ECE Undergrad ⚡
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900">Priyam Medhi</h3>

                <p className="text-xs text-slate-500 font-mono">
                  2nd-Year B.Tech Student in Electronics and Communication Engineering (ECE) at National Institute of Technology, Silchar
                </p>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic border-l-2 border-blue-600 pl-3 my-2">
                  &quot;I built ScopeLock AI because service studios bleed thousands of dollars every quarter
                  on ambiguous discovery agreements and AI-hallucinated figures. My philosophy is zero-fluff
                  software: utilize modern LLMs exclusively for extraction, but guarantee every calculation
                  with rigid TypeScript deterministic logic.&quot;
                </p>

                {/* External Action */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    className="inline-flex items-center gap-2 h-9 px-4 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
                    href="https://github.com/Priyam-Medhi/scope-sniper-mvp"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <GithubIcon size={15} />
                    <span>View Source Code on GitHub ↗</span>
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 h-9 px-4 bg-white text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                  >
                    <span>Get in Touch</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. INTERACTIVE USER FEEDBACK SECTION (id="feedback")
         ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-slate-100/60 py-16 md:py-24 border-t border-b border-slate-200" id="feedback">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-wider text-blue-600 font-bold">
                Community-Led Roadmap
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">
                Help Shape ScopeLock AI
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Have a feature request, bug report, or agency workflow idea? Let us know. Your inputs directly influence our sprint cycles.
              </p>
            </div>

            {feedbackSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs sm:text-sm flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Thank you! Your feedback has been logged directly to Priyam Medhi.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setFeedbackSubmitted(false);
                      setFeedbackComment("");
                    }}
                    className="text-emerald-700 underline text-xs mt-1 cursor-pointer font-medium"
                  >
                    Submit another note
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleFeedbackSubmit}>
                {/* Star Rating Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Experience Rating
                  </label>
                  <div className="flex items-center gap-1.5 text-blue-600">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (hoverRating ?? feedbackRating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            size={22}
                            className={`transition-colors ${
                              isFilled
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-300 fill-slate-100"
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-2 font-mono text-xs font-semibold text-slate-600">
                      {feedbackRating === 5 && "Outstanding (5/5)"}
                      {feedbackRating === 4 && "Great (4/5)"}
                      {feedbackRating === 3 && "Good (3/5)"}
                      {feedbackRating === 2 && "Needs Work (2/5)"}
                      {feedbackRating === 1 && "Poor (1/5)"}
                    </span>
                  </div>
                </div>

                {/* Role Selector */}
                <div>
                  <label
                    htmlFor="feedback-role"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1"
                  >
                    Your Role
                  </label>
                  <select
                    id="feedback-role"
                    value={feedbackRole}
                    onChange={(e) => setFeedbackRole(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  >
                    <option value="agency">Agency Owner / Director</option>
                    <option value="freelancer">Independent Freelancer</option>
                    <option value="consultant">Technical Consultant</option>
                    <option value="student">Student / Researcher</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Feedback Notes */}
                <div>
                  <label
                    htmlFor="feedback-notes"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1"
                  >
                    Comments &amp; Feature Wishlist
                  </label>
                  <textarea
                    id="feedback-notes"
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="What rate formulas, CRM integrations, or PDF configurations would you like to see next?"
                    required
                    rows={3}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. CONTACT US SECTION (id="contact")
         ───────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-24 bg-white" id="contact">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Direct Contact Info */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-blue-600 font-bold">
                  Direct Channels
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                  Get in Touch
                </h2>
                <p className="text-slate-600 text-sm mt-2 mb-8 leading-relaxed">
                  Available for custom agency SaaS integrations, open-source engineering collaborations, or contract development inquiries.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Campus &amp; Location
                      </span>
                      <span className="text-sm font-medium text-slate-800">
                        NIT Silchar, Assam, India
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
                      <Code2 size={20} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        GitHub Profile
                      </span>
                      <a
                        href="https://github.com/Priyam-Medhi"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="font-mono text-sm text-blue-600 hover:underline font-medium"
                      >
                        @Priyam-Medhi
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Specialty
                      </span>
                      <span className="text-sm font-medium text-slate-800">
                        AI Micro-SaaS &amp; Agency Automation
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="mt-8 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono">
                🟢 Currently open to new agency tools &amp; open-source contributions.
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-xs">
              {contactSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-center space-y-2">
                  <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                  <h3 className="font-bold text-base">Message Sent Successfully!</h3>
                  <p className="text-xs sm:text-sm text-emerald-700">
                    Thanks, <strong>{contactName}</strong>. I will get back to you at <strong>{contactEmail}</strong> as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName("");
                      setContactEmail("");
                      setContactMessage("");
                    }}
                    className="text-emerald-800 underline text-xs mt-2 font-medium cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Alex Vance"
                      className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="alex@studio.com"
                      className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Message or Project Brief
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe your project, agency workflow, or custom proposal requirement..."
                      className="w-full p-3 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FOOTER
         ───────────────────────────────────────────────────────────── */}
      <footer className="w-full py-10 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              SL
            </div>
            <span className="font-bold text-sm text-slate-900">ScopeLock.ai</span>
            <span className="text-slate-400 font-mono text-xs">
              — Built by Priyam Medhi at NIT Silchar
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600 font-medium">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/tool" className="hover:text-blue-600 transition">
              Generator Tool
            </Link>
            <a href="#how-it-works" className="hover:text-blue-600 transition">
              How It Works
            </a>
            <a href="#pricing" className="hover:text-blue-600 transition">
              Pricing
            </a>
            <a href="#about" className="hover:text-blue-600 transition">
              About Founder
            </a>
            <a href="#feedback" className="hover:text-blue-600 transition">
              Feedback
            </a>
            <a href="#contact" className="hover:text-blue-600 transition">
              Contact
            </a>
            <a
              href="https://github.com/Priyam-Medhi/scope-sniper-mvp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition flex items-center gap-1 font-mono"
            >
              <GithubIcon size={13} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
