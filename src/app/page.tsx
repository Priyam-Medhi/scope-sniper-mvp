"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Calculator,
  ShieldAlert,
  FileCheck,
  MapPin,
  Send,
  Star,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Briefcase,
  GraduationCap,
  MessageSquare,
  FileText,
  Zap,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

export default function LandingPage() {
  // Feedback Form State
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [feedbackRole, setFeedbackRole] = useState<string>("Agency Owner");
  const [feedbackComment, setFeedbackComment] = useState<string>("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  // Contact Form State
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComment.trim() && feedbackRating === 0) return;
    setFeedbackSubmitted(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setContactSubmitted(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-white text-slate-900">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
         ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-50 pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-8 shadow-xs">
            <Sparkles size={14} className="text-blue-600 animate-pulse" />
            <span>AI Discovery Call to Locked Scope Proposal in Seconds</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight md:leading-none">
            Stop Losing Thousands to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              Scope Creep
            </span>{" "}
            and Bad Proposal Math.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Turn messy discovery call transcripts into pixel-perfect, scope-locked PDF proposals in 10
            seconds. Powered by Gemini AI and deterministic TypeScript math.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-base"
            >
              <span>Try Live Tool Free</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href="#about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-7 py-3.5 rounded-xl border border-slate-200 transition-all text-base"
            >
              <span>Meet the Builder</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-500" />
              <span>Zero LLM Math Errors</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-500" />
              <span>Exact-Layout A4 Multi-Page PDF</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-500" />
              <span>100% Free & Open Source</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-500" />
              <span>Rate Card Strict Enforcement</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. CORE FEATURES GRID (3 COLUMNS)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-2">
              Engineered for Agency Reliability
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Three Architecture Guardrails That Protect Your Revenue
            </p>
            <p className="mt-4 text-slate-600 text-base">
              Traditional LLMs guess numbers and generate messy layouts. ScopeLock AI decouples
              AI scope extraction from deterministic financial calculations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-8 hover:bg-slate-50 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                  <Calculator size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Zero AI Math Hallucinations
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Gemini extracts tasks, hours, and maps them strictly to your Rate Card. Pure
                  TypeScript calculation helpers compute every line total, subtotal, tax, and grand
                  total. Never send a client a proposal with faulty math.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-semibold text-blue-600">
                <Zap size={14} />
                <span>Deterministic Financial Layer</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-8 hover:bg-slate-50 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                  <ShieldAlert size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Anti-Scope-Creep Guardrails
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Every project phase explicitly generates an isolated list of Out-of-Scope boundaries
                  alongside deliverables. Protect your team against unbilled feature requests before
                  contracts are signed.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-semibold text-amber-600">
                <FileCheck size={14} />
                <span>Explicit SOW Boundaries</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-8 hover:bg-slate-50 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-6">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Locked Multi-Page PDF Engine
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Switch instantly between 3 locked themes (Minimalist Swiss, Modern Tech SaaS, and
                  Executive Consulting). Built-in CSS break-inside-avoid rules ensure tables and
                  signature blocks never fracture across page boundaries.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-semibold text-indigo-600">
                <Sparkles size={14} />
                <span>3 Executive Visual Styles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. ABOUT THE BUILDER SECTION (id="about")
         ───────────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-2">
              Founder & Creator
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              About the Builder
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar Icon */}
              <div className="w-20 h-20 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shrink-0">
                PM
              </div>

              {/* Bio Content */}
              <div className="flex-1 text-center sm:text-left space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Priyam Medhi</h3>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1.5 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <GraduationCap size={15} className="text-blue-600" />
                      ECE Undergrad, NIT Silchar
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={15} className="text-slate-400" />
                      Assam, India
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Built by <strong>Priyam Medhi</strong>, a 2nd-year B.Tech Student in Electronics and
                  Communication Engineering (ECE) at the <strong>National Institute of Technology (NIT), Silchar</strong>.
                  Passionate about building practical AI micro-SaaS tools, automating agency workflows,
                  and shipping full-stack web applications.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <a
                    href="https://github.com/Priyam-Medhi/scope-sniper-mvp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm"
                  >
                    <GithubIcon size={16} />
                    <span>View GitHub Repository</span>
                    <ExternalLink size={13} className="opacity-70" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-semibold transition border border-slate-200"
                  >
                    <Briefcase size={16} />
                    <span>Get in Touch</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. INTERACTIVE FEEDBACK SECTION (id="feedback")
         ───────────────────────────────────────────────────────────── */}
      <section id="feedback" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-3">
              <MessageSquare size={13} />
              <span>User Community & Feedback</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Help Shape ScopeLock AI
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Tell us how you use the tool and what features would make your agency workflows even faster.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            {feedbackSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Thank You for Your Feedback!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Your insights directly guide what we build next for ScopeLock AI. We appreciate you taking
                  the time to help improve the project!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFeedbackSubmitted(false);
                    setFeedbackComment("");
                  }}
                  className="mt-2 inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 underline cursor-pointer"
                >
                  Submit additional feedback
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                {/* 1-5 Star Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    How would you rate ScopeLock AI?
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (hoverRating ?? feedbackRating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                          aria-label={`Rate ${star} star`}
                        >
                          <Star
                            size={28}
                            className={`transition-colors ${
                              isFilled
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-300 fill-slate-100"
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-2 text-xs font-semibold text-slate-600">
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
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    Your Primary Role
                  </label>
                  <select
                    id="feedback-role"
                    value={feedbackRole}
                    onChange={(e) => setFeedbackRole(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  >
                    <option value="Agency Owner">Agency Owner</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Student">Student / Researcher</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Feedback Comment */}
                <div>
                  <label
                    htmlFor="feedback-comment"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    Feature Requests, Feedback, or Bugs
                  </label>
                  <textarea
                    id="feedback-comment"
                    rows={4}
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="What feature would save you the most time? (e.g. multi-currency support, custom logo upload, Zapier webhook integration...)"
                    className="w-full bg-white border border-slate-300 rounded-lg p-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl text-sm transition shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={15} />
                  <span>Submit Feedback</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. CONTACT US SECTION (id="contact")
         ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-2">
              Collaborations & Inquiries
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">Contact Us</p>
            <p className="mt-2 text-slate-600 text-sm max-w-xl mx-auto">
              Looking for custom agency proposal automations, full-stack builds, or AI integrations?
              Let&apos;s talk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column: Direct Info */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                <h3 className="text-xl font-bold text-slate-900">Direct Contact Details</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  I welcome conversations with agency owners, founders, and fellow engineers looking
                  to explore custom AI workflows, open-source collaborations, or software projects.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-500">
                        Location
                      </p>
                      <p className="text-sm font-semibold text-slate-800">
                        National Institute of Technology (NIT), Silchar
                      </p>
                      <p className="text-xs text-slate-500">Assam, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                      <GithubIcon size={18} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-500">
                        GitHub
                      </p>
                      <a
                        href="https://github.com/Priyam-Medhi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <span>@Priyam-Medhi</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-500">
                        Specialty
                      </p>
                      <p className="text-sm font-semibold text-slate-800">
                        AI Micro-SaaS & Agency Automation
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Quick Tool Card */}
              <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base">Ready to test the generator?</h4>
                  <p className="text-xs text-blue-100 mt-1">
                    Load a sample discovery call and export an exact-layout proposal.
                  </p>
                </div>
                <Link
                  href="/tool"
                  className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-4 py-2 rounded-lg text-xs transition shrink-0 ml-4 shadow-xs"
                >
                  Launch Tool →
                </Link>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              {contactSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto">
                    Thanks for reaching out, <strong>{contactName}</strong>. I will review your message
                    and get back to you shortly at <strong>{contactEmail}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName("");
                      setContactEmail("");
                      setContactMessage("");
                    }}
                    className="mt-2 inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Send a Direct Message</h3>

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Alex Henderson"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
                    >
                      Your Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="alex@agency.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
                    >
                      Message or Project Brief
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe your project, custom AI tool requirement, or question..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl text-sm transition shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer mt-2"
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
          6. FOOTER
         ───────────────────────────────────────────────────────────── */}
      <footer className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <Link
                href="/"
                className="text-base font-bold text-slate-900 flex items-center gap-1.5"
              >
                <span>ScopeLock AI</span>
                <span>🎯</span>
              </Link>
              <p className="text-xs text-slate-500 mt-1">
                © 2026 ScopeLock AI — Built by Priyam Medhi at NIT Silchar.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition">
                Home
              </Link>
              <Link href="/tool" className="hover:text-blue-600 transition">
                Generator Tool
              </Link>
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
                className="hover:text-blue-600 transition flex items-center gap-1"
              >
                <GithubIcon size={13} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
