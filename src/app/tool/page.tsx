"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileEdit,
  BadgeCheck,
  Moon,
  Sun,
  RotateCcw,
  Sliders,
  FileSpreadsheet,
  Mic,
  Sparkles,
  Loader2,
  ListOrdered,
  Trash2,
  Plus,
  ShieldAlert,
  FileText,
  Download,
  AlertCircle,
} from "lucide-react";
import ProposalPreview from "@/components/ProposalPreview";
import { recomputeTotals } from "@/lib/math";
import {
  SAMPLE_ACME_RATE_CARD,
  SAMPLE_ACME_TRANSCRIPT,
} from "@/lib/sample-data";
import { PROPOSAL_THEMES, type ProposalTheme } from "@/types/themes";
import type { EnrichedProposal, EnrichedLineItem } from "@/types/proposal";

export default function ToolPage() {
  // ── State ──────────────────────────────────────────────────────────
  const [proposal, setProposal] = useState<EnrichedProposal | null>(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [rateCard, setRateCard] = useState("");
  const [taxRate, setTaxRate] = useState(8.5);
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<ProposalTheme>("Minimalist Swiss (Black & White)");
  const [darkPreview, setDarkPreview] = useState(false);
  const [zoom, setZoom] = useState<number>(1.0);
  const [newExclusionInput, setNewExclusionInput] = useState("");

  // Currency symbol resolution
  const currencySymbol =
    currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$";

  // ── Project Title Sync ────────────────────────────────────────────
  const handleProjectTitleChange = (newTitle: string) => {
    setProjectTitle(newTitle);
    if (proposal) {
      setProposal({
        ...proposal,
        projectTitle: newTitle,
      });
    }
  };

  // ── Recalculate deterministic totals ──────────────────────────────
  const updateProposalData = useCallback(
    (updated: EnrichedProposal) => {
      const enriched = recomputeTotals({
        ...updated,
        taxRate,
        currencySymbol,
      });
      setProposal(enriched);
    },
    [taxRate, currencySymbol]
  );

  // ── Line Items Handlers ───────────────────────────────────────────
  const updateLineItem = (index: number, updates: Partial<EnrichedLineItem>) => {
    if (!proposal) return;
    const items = proposal.lineItems.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    );
    updateProposalData({ ...proposal, lineItems: items });
  };

  const removeLineItem = (index: number) => {
    if (!proposal) return;
    if (proposal.lineItems.length <= 1) {
      alert("Proposals must contain at least one billable scope item.");
      return;
    }
    const items = proposal.lineItems.filter((_, i) => i !== index);
    updateProposalData({ ...proposal, lineItems: items });
  };

  const addLineItem = () => {
    if (!proposal) return;
    const newItem: EnrichedLineItem = {
      itemTitle: "New Contract Deliverable",
      category: "Development",
      description: "Custom project requirement",
      quantity: 10,
      unitType: "hours",
      unitPrice: 125,
      lineTotal: 1250,
    };
    updateProposalData({
      ...proposal,
      lineItems: [...proposal.lineItems, newItem],
    });
  };

  // ── Tax Rate & Currency Handlers ──────────────────────────────────
  const handleTaxRateChange = (newRate: number) => {
    setTaxRate(newRate);
    if (!proposal) return;
    updateProposalData({ ...proposal, taxRate: newRate });
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    const sym = newCurrency === "EUR" ? "€" : newCurrency === "GBP" ? "£" : "$";
    if (!proposal) return;
    setProposal({
      ...proposal,
      currencySymbol: sym,
    });
  };

  // ── Exclusion Tags Handlers ───────────────────────────────────────
  const getExclusionsList = (): string[] => {
    if (proposal?.customExclusions && proposal.customExclusions.length > 0) {
      return proposal.customExclusions;
    }
    if (proposal?.scopePhases) {
      return proposal.scopePhases.flatMap((p) => p.outOfScope).filter(Boolean);
    }
    return [
      "Native iOS & Android Mobile Apps",
      "Custom AI Recommendation Model",
      "Unmetered Post-Launch Maintenance",
    ];
  };

  const removeExclusionTag = (index: number) => {
    if (!proposal) return;
    const current = getExclusionsList();
    const updated = current.filter((_, i) => i !== index);
    setProposal({
      ...proposal,
      customExclusions: updated,
    });
  };

  const addExclusionTag = () => {
    const val = newExclusionInput.trim();
    if (!val || !proposal) return;
    const current = getExclusionsList();
    const updated = [...current, val];
    setProposal({
      ...proposal,
      customExclusions: updated,
    });
    setNewExclusionInput("");
  };

  // ── Generate Proposal via Gemini API ──────────────────────────────
  const generate = useCallback(async () => {
    if (!transcript.trim()) {
      setError("Please paste a sales call transcript first.");
      return;
    }
    if (!rateCard.trim()) {
      setError("Please provide your agency rate card.");
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
      data.currencySymbol = currencySymbol;
      setProposal(data);
      if (data.projectTitle) {
        setProjectTitle(data.projectTitle);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setLoading(false);
    }
  }, [transcript, rateCard, taxRate, currencySymbol]);

  // ── Load Sample Rates & Transcript ────────────────────────────────
  const loadSampleRates = () => {
    setRateCard(SAMPLE_ACME_RATE_CARD);
  };

  const loadSampleTranscript = () => {
    setTranscript(SAMPLE_ACME_TRANSCRIPT);
  };

  // ── Reset Workspace ───────────────────────────────────────────────
  const resetWorkspace = () => {
    if (window.confirm("Reset workspace line items and inputs to initial defaults?")) {
      setProposal(null);
      setProjectTitle("");
      setTranscript("");
      setRateCard("");
      setTaxRate(8.5);
      setCurrency("USD");
      setTheme("Minimalist Swiss (Black & White)");
      setDarkPreview(false);
      setZoom(1.0);
      setError(null);
      setNewExclusionInput("");
    }
  };

  // ── PDF Print Export ──────────────────────────────────────────────
  const exportPDF = () => {
    if (!proposal) return;
    window.print();
  };

  // Document file name
  const safeDocName = (projectTitle || proposal?.projectTitle || "Draft")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .substring(0, 24);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 print:bg-white print:text-black">
      {/* ── Top Workspace Utility Bar ──────────────────────────────── */}
      <div className="w-full bg-white border-b border-slate-200 px-4 md:px-6 py-2 flex flex-wrap items-center justify-between gap-3 shadow-xs z-20 print:hidden">
        {/* Left: Back Link & Title */}
        <div className="flex items-center gap-3 shrink-0 min-w-0">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <span className="text-slate-300 font-mono">/</span>

          <div className="relative flex items-center">
            <FileEdit className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              value={projectTitle || proposal?.projectTitle || ""}
              onChange={(e) => handleProjectTitleChange(e.target.value)}
              placeholder="Untitled Project Proposal"
              title="Click to edit project title"
              className="text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200/70 focus:bg-white px-2.5 pl-8 py-1 rounded-md transition-all outline-none focus:ring-1 focus:ring-blue-500 w-64 md:w-96 truncate"
            />
          </div>
        </div>

        {/* Center: Segmented Theme Control */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-0.5 rounded-full flex items-center shadow-inner border border-slate-200">
            {PROPOSAL_THEMES.map((t) => {
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-white text-blue-600 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full inline-block ${
                      isActive ? "bg-blue-600" : "bg-transparent"
                    }`}
                  />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Controls & Badges */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[11px] font-semibold border border-emerald-200">
            <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Math Verified</span>
          </div>

          <button
            type="button"
            onClick={() => setDarkPreview(!darkPreview)}
            title="Toggle Dark Preview Canvas"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-all cursor-pointer border border-slate-200"
          >
            {darkPreview ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light Preview</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-600" />
                <span>Dark Preview</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={resetWorkspace}
            title="Reset workspace inputs to initial defaults"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer border border-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* ── Main Split-Screen Workspace Container ─────────────────── */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden print:block">
        {/* ── LEFT PANE: Configuration & Line Controls (Fixed ~460px) ── */}
        <aside className="w-full lg:w-[460px] shrink-0 bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden print:hidden">
          {/* Subheader */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
            <div>
              <h2 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                <Sliders className="w-4 h-4 text-blue-600" />
                Proposal Configuration
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Paste discovery notes to lock contract boundary &amp; prevent creep.
              </p>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 font-bold uppercase rounded">
              v2.4 Core
            </span>
          </div>

          {/* Scrollable Control Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Section 1: Agency Rate Card */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                  Agency Rate Card
                </label>
                <button
                  type="button"
                  onClick={loadSampleRates}
                  className="font-mono text-[11px] text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 hover:underline cursor-pointer"
                >
                  Load Sample Rates
                </button>
              </div>
              <textarea
                value={rateCard}
                onChange={(e) => setRateCard(e.target.value)}
                placeholder="Paste your agency hourly or fixed rates here..."
                rows={4}
                className="w-full p-2.5 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none leading-relaxed placeholder:font-sans placeholder:text-slate-400"
              />
            </div>

            {/* Section 2: Discovery Call Transcript */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-blue-600" />
                  Discovery Call Transcript
                </label>
                <button
                  type="button"
                  onClick={loadSampleTranscript}
                  className="font-mono text-[11px] text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 hover:underline cursor-pointer"
                >
                  Sample Transcript
                </button>
              </div>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste your raw discovery call transcript or meeting notes here..."
                rows={5}
                className="w-full p-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none leading-relaxed placeholder:text-slate-400"
              />
            </div>

            {/* Primary Generation Button */}
            <div>
              <button
                type="button"
                onClick={generate}
                disabled={loading}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg flex flex-col items-center justify-center gap-0.5 active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="inline-flex items-center gap-1.5">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing Transcript &amp; Locking Scope...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      Generate Scope-Locked Proposal
                    </>
                  )}
                </span>
                <span className="font-mono text-[10px] opacity-90 font-normal">
                  Calculates deterministic totals &amp; flags out-of-scope risks
                </span>
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-md p-2.5 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Section 3: Line Item Scope Controls (Live Tweak) - Hidden until proposal exists */}
            {proposal && (
              <div className="border-t border-slate-200 pt-4 space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <ListOrdered className="w-4 h-4 text-blue-600" />
                    Line Item Scope Controls
                  </h3>
                  <span className="font-mono text-[11px] text-slate-500">
                    {proposal.lineItems.length} Items locked
                  </span>
                </div>

                {/* Line Items List */}
                <div className="space-y-2">
                  {proposal.lineItems.map((item, index) => (
                    <div
                      key={index}
                      className="p-2.5 bg-slate-50 rounded-md border border-slate-200 flex flex-col gap-1.5 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={item.itemTitle}
                          onChange={(e) =>
                            updateLineItem(index, { itemTitle: e.target.value })
                          }
                          className="text-xs font-semibold text-slate-900 bg-transparent border-0 outline-none flex-1 focus:bg-white px-1 py-0.5 rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeLineItem(index)}
                          title="Remove line item"
                          className="text-slate-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between font-mono text-xs text-slate-600 gap-2">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateLineItem(index, {
                                quantity: Number(e.target.value) || 0,
                              })
                            }
                            className="w-12 bg-white border border-slate-200 rounded px-1 py-0.5 text-center font-mono text-xs outline-none focus:border-blue-500"
                          />
                          <span>{item.unitType === "hours" ? "hrs @" : "units @"}</span>
                          <span>{currencySymbol}</span>
                          <input
                            type="number"
                            min="1"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateLineItem(index, {
                                unitPrice: Number(e.target.value) || 0,
                              })
                            }
                            className="w-14 bg-white border border-slate-200 rounded px-1 py-0.5 text-center font-mono text-xs outline-none focus:border-blue-500"
                          />
                          <span>/{item.unitType === "hours" ? "hr" : "unit"}</span>
                        </div>
                        <div className="font-mono font-bold text-slate-900">
                          {currencySymbol}
                          {(item.lineTotal || 0).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Line Item Button */}
                <button
                  type="button"
                  onClick={addLineItem}
                  className="w-full py-1.5 border border-dashed border-blue-400 text-blue-600 hover:bg-blue-50 text-xs font-medium rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line Item</span>
                </button>

                {/* Tax & Currency Settings */}
                <div className="p-3 bg-slate-50 rounded-md border border-slate-200 space-y-2">
                  <span className="font-mono text-[10px] text-slate-700 font-bold uppercase tracking-wider block">
                    Tax &amp; Currency Settings
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-600 block mb-1">
                        State Tax Rate (%)
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          min="0"
                          max="30"
                          step="0.1"
                          value={taxRate}
                          onChange={(e) =>
                            handleTaxRateChange(Number(e.target.value) || 0)
                          }
                          className="w-full font-mono text-xs bg-white border border-slate-200 rounded px-2 py-1 pr-6 outline-none focus:border-blue-500"
                        />
                        <span className="absolute right-2 font-mono text-slate-400 text-[11px] pointer-events-none">
                          %
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-600 block mb-1">
                        Currency
                      </label>
                      <select
                        value={currency}
                        onChange={(e) => handleCurrencyChange(e.target.value)}
                        className="w-full font-mono text-xs bg-white border border-slate-200 rounded px-2 py-1 outline-none focus:border-blue-500"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD ($)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Out-of-Scope Exclusions (Guardrails) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                      Out-of-Scope Exclusions (Guardrails)
                    </label>
                    <span className="font-mono text-[10px] text-red-700 font-bold tracking-wider uppercase bg-red-100 px-1.5 py-0.5 rounded">
                      Prevents Creep
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {getExclusionsList().map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-800 font-mono text-[11px] font-medium border border-red-200"
                      >
                        <span>❌ {item.replace(/^❌\s*/, "")}</span>
                        <button
                          type="button"
                          onClick={() => removeExclusionTag(idx)}
                          className="hover:opacity-70 text-[13px] leading-none ml-1 cursor-pointer font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add Exclusion Tag Input */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <input
                      type="text"
                      value={newExclusionInput}
                      onChange={(e) => setNewExclusionInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addExclusionTag();
                        }
                      }}
                      placeholder="+ Add custom exclusion boundary..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={addExclusionTag}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded transition-colors cursor-pointer border border-slate-200"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ── RIGHT PANE: Live Interactive PDF Preview ─────────────── */}
        <section
          className={`flex-1 p-4 md:p-6 overflow-y-auto flex flex-col items-center transition-colors duration-200 print:bg-white print:p-0 ${
            darkPreview ? "bg-slate-950" : "bg-slate-100"
          }`}
        >
          {/* Top Preview Action Toolbar */}
          <div className="w-full max-w-[780px] mb-4 flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-xs print:hidden">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">
                  {proposal ? `Proposal_${safeDocName}_v1.pdf` : "Proposal_Draft.pdf"}
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
                  <span>A4 Document</span>
                  <span>•</span>
                  <span>Theme: {theme}</span>
                </div>
              </div>
            </div>

            {/* Zoom Control Chips */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded border border-slate-200">
              <button
                type="button"
                onClick={() => setZoom(0.85)}
                className={`px-2 py-0.5 rounded font-mono text-xs transition-colors cursor-pointer ${
                  zoom === 0.85
                    ? "bg-white text-blue-600 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                85%
              </button>
              <button
                type="button"
                onClick={() => setZoom(1.0)}
                className={`px-2 py-0.5 rounded font-mono text-xs transition-colors cursor-pointer ${
                  zoom === 1.0
                    ? "bg-white text-blue-600 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                100%
              </button>
              <button
                type="button"
                onClick={() => setZoom(1.15)}
                className={`px-2 py-0.5 rounded font-mono text-xs transition-colors cursor-pointer ${
                  zoom === 1.15
                    ? "bg-white text-blue-600 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                115%
              </button>
            </div>

            {/* Right CTA */}
            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1 font-mono text-xs text-emerald-700 font-medium">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                TS Verified
              </span>
              <button
                type="button"
                onClick={exportPDF}
                disabled={!proposal}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all ${
                  proposal
                    ? "bg-blue-600 hover:bg-blue-700 text-white active:scale-95 cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Live Document Paper Canvas Container */}
          <div
            className="w-full max-w-[780px] transition-transform duration-200 origin-top flex justify-center print:max-w-none print:transform-none"
            style={{ transform: `scale(${zoom})` }}
          >
            <ProposalPreview proposal={proposal} theme={theme} />
          </div>
        </section>
      </div>
    </div>
  );
}
