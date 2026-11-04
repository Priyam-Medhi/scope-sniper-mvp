"use client";

import { useState, useCallback } from "react";
import {
  FileText,
  Sparkles,
  Settings2,
  Download,
  Loader2,
  ClipboardPaste,
  AlertCircle,
  Palette,
} from "lucide-react";
import ProposalPreview from "@/components/ProposalPreview";
import TweakPanel from "@/components/TweakPanel";
import { recomputeTotals } from "@/lib/math";
import { SAMPLE_TRANSCRIPT, DEFAULT_RATE_CARD } from "@/lib/sample-data";
import { PROPOSAL_THEMES, type ProposalTheme } from "@/types/themes";
import type { EnrichedProposal } from "@/types/proposal";

type LeftTab = "input" | "tweak";

export default function HomePage() {
  // ── State ──────────────────────────────────────────────────────────
  const [transcript, setTranscript] = useState("");
  const [rateCard, setRateCard] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [proposal, setProposal] = useState<EnrichedProposal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leftTab, setLeftTab] = useState<LeftTab>("input");
  const [theme, setTheme] = useState<ProposalTheme>("Modern Tech SaaS (Indigo/Slate)");

  // ── Generate proposal via API ─────────────────────────────────────
  const generate = useCallback(async () => {
    if (!transcript.trim()) {
      setError("Please paste a sales call transcript first.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, rateCard, taxRate }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error ${res.status}`);
      }
      const data: EnrichedProposal = await res.json();
      setProposal(data);
      setLeftTab("tweak");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setLoading(false);
    }
  }, [transcript, rateCard, taxRate]);

  // ── Tweak handler (recomputes math) ───────────────────────────────
  const handleTweak = useCallback((updated: EnrichedProposal) => {
    setProposal(recomputeTotals(updated));
  }, []);

  // ── PDF Export ────────────────────────────────────────────────────
  const exportPDF = useCallback(() => {
    window.print();
  }, []);

  // ── Load sample ───────────────────────────────────────────────────
  const loadSample = useCallback(() => {
    setTranscript(SAMPLE_TRANSCRIPT);
    setRateCard(DEFAULT_RATE_CARD);
    setTaxRate(8);
  }, []);

  // ── Render ────────────────────────────────────────────────────────

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 print:bg-white print:text-black">
      {/* ── Top Bar ──────────────────────────────────────────────── */}
      <header className="shrink-0 h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-5 print:hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <FileText size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white">ScopeLock AI</h1>
            <p className="text-[10px] text-slate-400 -mt-0.5">Transcript → Exact-Layout Proposal</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {proposal && (
            <button
              onClick={exportPDF}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Download size={13} />
              Export Exact-Layout PDF
            </button>
          )}
        </div>
      </header>

      {/* ── Split Pane ───────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden print:block">
        {/* ── LEFT PANE ──────────────────────────────────────────── */}
        <div className="w-110 shrink-0 border-r border-slate-800 flex flex-col bg-slate-900/60 print:hidden">
          {/* Tab Bar */}
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setLeftTab("input")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                leftTab === "input"
                  ? "text-indigo-400 border-b-2 border-indigo-500 bg-slate-800/30"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <ClipboardPaste size={13} />
              Transcript & Rate Card
            </button>
            <button
              onClick={() => setLeftTab("tweak")}
              disabled={!proposal}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                leftTab === "tweak"
                  ? "text-indigo-400 border-b-2 border-indigo-500 bg-slate-800/30"
                  : "text-slate-400 hover:text-slate-300"
              } ${!proposal ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <Settings2 size={13} />
              Quick-Tweak Data
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {leftTab === "input" && (
              <>
                {/* Transcript */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">Sales Call Transcript</label>
                    <button
                      onClick={loadSample}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                    >
                      Load Sample Discovery Call
                    </button>
                  </div>
                  <textarea
                    className="w-full h-56 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                    placeholder="Paste your sales call transcript here…"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                  />
                </div>

                {/* Rate Card */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Company Rate Card / Pricing Matrix
                  </label>
                  <textarea
                    className="w-full h-40 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono placeholder:text-slate-500 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                    value={rateCard}
                    onChange={(e) => setRateCard(e.target.value)}
                  />
                </div>

                {/* Tax Rate */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    className="w-28 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-2 bg-red-900/30 border border-red-800/50 rounded-lg p-3 text-xs text-red-300">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={generate}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Generating Proposal…
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      Generate Proposal
                    </>
                  )}
                </button>
              </>
            )}

            {leftTab === "tweak" && proposal && (
              <TweakPanel proposal={proposal} onChange={handleTweak} />
            )}

            {leftTab === "tweak" && !proposal && (
              <div className="flex items-center justify-center h-40 text-slate-500 text-xs">
                Generate a proposal first to tweak the data.
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT PANE (PDF Preview & Theme Switcher) ──────────── */}
        <div className="flex-1 overflow-y-auto bg-slate-950 print:bg-white print:overflow-visible flex flex-col">
          {/* Theme Switcher Toggle Bar (sticky above PDF preview) */}
          <div className="shrink-0 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 print:hidden sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <Palette size={15} className="text-indigo-400" />
              <span className="text-xs font-semibold text-slate-300">Proposal Theme:</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {PROPOSAL_THEMES.map((t) => {
                const isActive = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-800 text-white shadow-sm ring-1 ring-slate-700 font-semibold"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                    }`}
                    title={t.description}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        t.id === "Minimalist Swiss (Black & White)"
                          ? "bg-white ring-1 ring-black"
                          : t.id === "Modern Tech SaaS (Indigo/Slate)"
                          ? "bg-indigo-500"
                          : "bg-blue-300 ring-1 ring-blue-900"
                      }`}
                    />
                    <span>{t.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Proposal Document Canvas */}
          <div className="flex-1 py-8 px-6 print:p-0">
            <ProposalPreview proposal={proposal} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}
