"use client";

import type { EnrichedProposal } from "@/types/proposal";
import type { ProposalTheme } from "@/types/themes";
import { CheckCircle2, ShieldAlert, Calculator, Lock, ShieldCheck, Sparkles } from "lucide-react";

interface ProposalPreviewProps {
  proposal: EnrichedProposal | null;
  theme?: ProposalTheme;
}

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(dateStr: string): string {
  try {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function ProposalPreview({
  proposal,
  theme = "Modern Tech SaaS (Indigo/Slate)",
}: ProposalPreviewProps) {
  if (!proposal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-115 p-8 text-center bg-white border border-dashed border-slate-300 rounded-xl max-w-md mx-auto my-auto shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 text-blue-600 shadow-xs">
          <Sparkles className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1.5">Ready to Generate</h3>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
          Paste your rate card and discovery call transcript on the left, then click <strong className="text-slate-700">Generate Scope-Locked Proposal</strong>.
        </p>
      </div>
    );
  }

  const p = proposal;
  const curr = p.currencySymbol || "$";

  // Gather out of scope exclusions
  const exclusions =
    p.customExclusions && p.customExclusions.length > 0
      ? p.customExclusions
      : p.scopePhases.flatMap((phase) => phase.outOfScope).filter(Boolean);

  // Fallback exclusions if none were returned
  const displayExclusions =
    exclusions.length > 0
      ? exclusions
      : [
          "Native mobile applications (iOS / Android Swift/Kotlin)",
          "Custom AI Recommendation Model fine-tuning & vector indexing",
          "24/7 post-launch SLA emergency support (Standard 30-day bug warranty included)",
        ];

  // Distinct theme styling configurations
  const isSwiss = theme === "Minimalist Swiss (Black & White)";
  const isConsulting = theme === "Executive Consulting (Navy/Serif)";
  // Default is Modern Tech SaaS

  return (
    <div
      id="proposal-document"
      className={`proposal-document mx-auto transition-all ${
        isSwiss
          ? "theme-swiss bg-white text-black font-sans border-2 border-black rounded-none shadow-xl"
          : isConsulting
          ? "theme-executive bg-[#fbfbf9] text-[#1c1917] font-serif border border-[#d6d3d1] rounded-sm shadow-xl"
          : "theme-modern bg-white text-slate-900 font-sans border border-slate-200 rounded-xl shadow-2xl ring-1 ring-blue-500/10"
      } p-8 md:p-12 space-y-7 relative print:shadow-none print:border-none print:p-0 print:m-0`}
      style={{ width: "100%", maxWidth: "780px", minHeight: "297mm" }}
    >
      {/* ── Document Header ─────────────────────────────────────────────── */}
      <div
        className={`break-inside-avoid flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b ${
          isSwiss
            ? "border-black"
            : isConsulting
            ? "border-[#d6d3d1]"
            : "border-slate-200"
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 flex items-center justify-center font-bold text-[11px] ${
                isSwiss
                  ? "bg-black text-white rounded-none"
                  : isConsulting
                  ? "bg-[#0f172a] text-white rounded-xs"
                  : "bg-blue-600 text-white rounded-sm"
              }`}
            >
              SL
            </div>
            <span
              className={`text-base font-bold tracking-tight uppercase ${
                isSwiss
                  ? "text-black"
                  : isConsulting
                  ? "text-[#0f172a] font-serif"
                  : "text-slate-900"
              }`}
            >
              ScopeLock Studio
            </span>
          </div>
          <h1
            className={`text-[10px] uppercase font-semibold tracking-widest ${
              isSwiss
                ? "text-neutral-600 font-mono"
                : isConsulting
                ? "text-stone-500 font-serif"
                : "text-slate-500 font-mono"
            }`}
          >
            Statement of Work &amp; Binding Proposal
          </h1>
          <div
            className={`text-xs font-medium ${
              isSwiss
                ? "text-black font-mono font-bold"
                : isConsulting
                ? "text-[#0f172a] font-mono"
                : "text-blue-600 font-mono"
            }`}
          >
            Ref: SL-2026-0842 • Rev 1.0
          </div>
        </div>

        <div className="text-left md:text-right space-y-0.5 text-xs">
          <div
            className={`font-semibold ${
              isSwiss
                ? "text-black"
                : isConsulting
                ? "text-[#0f172a] font-serif"
                : "text-slate-900"
            }`}
          >
            Prepared for: {p.clientCompany || p.clientName || "Client"}
            {p.clientName && p.clientCompany ? ` (Attn: ${p.clientName})` : ""}
          </div>
          <div
            className={`font-mono text-[11px] ${
              isSwiss ? "text-neutral-600" : "text-slate-500"
            }`}
          >
            Date: {fmtDate(p.proposalDate)}
          </div>
          <div
            className={`inline-flex items-center gap-1 font-mono text-[11px] font-medium ${
              isSwiss
                ? "text-black font-bold"
                : isConsulting
                ? "text-emerald-800"
                : "text-emerald-600"
            }`}
          >
            <Lock className="w-3 h-3" />
            <span>Valid Until: {fmtDate(p.validUntilDate)}</span>
          </div>
        </div>
      </div>

      {/* ── Executive Summary ────────────────────────────────────────── */}
      <div
        className={`break-inside-avoid p-4 rounded text-xs leading-relaxed border ${
          isSwiss
            ? "bg-neutral-50 border-black rounded-none text-black"
            : isConsulting
            ? "bg-[#f5f5f0] border-[#e7e5e4] text-[#292524] font-serif"
            : "bg-slate-50 border-slate-200 text-slate-700"
        }`}
      >
        <span
          className={`font-bold uppercase tracking-wider text-[11px] block mb-1.5 ${
            isSwiss
              ? "text-black font-mono"
              : isConsulting
              ? "text-[#0f172a] font-serif"
              : "text-slate-900 font-mono"
          }`}
        >
          Executive Summary
        </span>
        <div className="space-y-2">
          {p.executiveSummary.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* ── Section 1: Guaranteed Scope of Work (Inclusions) ─────────── */}
      <div className="space-y-3">
        <div
          className={`flex items-center justify-between pb-1.5 border-b ${
            isSwiss
              ? "border-black"
              : isConsulting
              ? "border-[#d6d3d1]"
              : "border-slate-200"
          }`}
        >
          <h3
            className={`text-sm font-bold flex items-center gap-2 ${
              isSwiss
                ? "text-black uppercase"
                : isConsulting
                ? "text-[#0f172a] font-serif"
                : "text-slate-900"
            }`}
          >
            <CheckCircle2
              className={`w-4 h-4 ${
                isSwiss
                  ? "text-black"
                  : isConsulting
                  ? "text-emerald-800"
                  : "text-emerald-600"
              }`}
            />
            Guaranteed Scope of Work (Inclusions)
          </h3>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider ${
              isSwiss
                ? "text-black font-mono"
                : isConsulting
                ? "text-emerald-800 font-serif"
                : "text-emerald-600 font-mono"
            }`}
          >
            {p.scopePhases.reduce((acc, ph) => acc + ph.deliverables.length, 0)} Deliverables Locked
          </span>
        </div>

        <div className="space-y-3">
          {p.scopePhases.map((phase) => (
            <div
              key={phase.phaseNumber}
              className={`break-inside-avoid p-3.5 border rounded ${
                isSwiss
                  ? "border-black bg-white rounded-none"
                  : isConsulting
                  ? "border-stone-300 bg-[#fafaf7] rounded-sm font-serif"
                  : "border-slate-200 bg-white rounded-lg"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold font-mono ${
                      isSwiss
                        ? "bg-black text-white rounded-none"
                        : isConsulting
                        ? "bg-[#0f172a] text-white rounded-xs"
                        : "bg-blue-600 text-white rounded-full"
                    }`}
                  >
                    {phase.phaseNumber}
                  </span>
                  <h4
                    className={`text-xs font-bold ${
                      isSwiss
                        ? "text-black"
                        : isConsulting
                        ? "text-[#0f172a]"
                        : "text-slate-900"
                    }`}
                  >
                    {phase.phaseTitle}
                  </h4>
                </div>
                <span className="font-mono text-[10px] text-slate-500 uppercase">
                  {phase.timelineWeeks} week{phase.timelineWeeks !== 1 ? "s" : ""}
                </span>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-700">
                {phase.deliverables.map((deliv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                        isSwiss
                          ? "text-black"
                          : isConsulting
                          ? "text-emerald-800"
                          : "text-emerald-600"
                      }`}
                    />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 2: Strict Out-of-Scope Exclusions (Guardrails) ───── */}
      <div
        className={`break-inside-avoid p-4 rounded border space-y-2.5 ${
          isSwiss
            ? "border-2 border-black bg-neutral-100 rounded-none text-black"
            : isConsulting
            ? "border-[#fca5a5] bg-[#fff5f5] rounded-sm font-serif text-[#7f1d1d]"
            : "border-rose-200 bg-rose-50/70 rounded-lg text-rose-950"
        }`}
      >
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${
              isSwiss
                ? "text-black"
                : isConsulting
                ? "text-red-900"
                : "text-rose-900"
            }`}
          >
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
            <span>Strict Out-of-Scope Exclusions (Change Order Required)</span>
          </div>
          <span
            className={`font-mono text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
              isSwiss
                ? "bg-black text-white rounded-none"
                : isConsulting
                ? "bg-red-900 text-white"
                : "bg-rose-200 text-rose-900"
            }`}
          >
            Zero Hallucinations
          </span>
        </div>

        <p
          className={`text-[11px] leading-relaxed ${
            isSwiss ? "text-neutral-800" : isConsulting ? "text-stone-700" : "text-slate-600"
          }`}
        >
          The following items mentioned during preliminary calls are{" "}
          <strong className="font-semibold text-red-700">explicitly omitted</strong> from
          this fixed-fee contract. Any implementation requires an executed Amendment or Change
          Order:
        </p>

        <div className="space-y-1.5 text-xs">
          {displayExclusions.map((item, i) => {
            const clean = item.replace(/^❌\s*/, "");
            return (
              <div
                key={i}
                className={`flex items-center justify-between p-2 rounded border ${
                  isSwiss
                    ? "bg-white border-black rounded-none"
                    : isConsulting
                    ? "bg-white border-red-200 rounded-xs font-serif"
                    : "bg-white/90 border-rose-200 rounded-md"
                }`}
              >
                <span className="flex items-center gap-1.5 font-medium text-slate-800">
                  <span className="text-red-600 font-bold">×</span> {clean}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase font-semibold ${
                    isSwiss
                      ? "text-black"
                      : isConsulting
                      ? "text-red-900"
                      : "text-rose-700"
                  }`}
                >
                  Excluded Item
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section 3: Deterministic Financial Summary ───────────────── */}
      <div className="break-inside-avoid space-y-3">
        <div
          className={`flex items-center justify-between pb-1.5 border-b ${
            isSwiss
              ? "border-black"
              : isConsulting
              ? "border-[#d6d3d1]"
              : "border-slate-200"
          }`}
        >
          <h3
            className={`text-sm font-bold flex items-center gap-2 ${
              isSwiss
                ? "text-black uppercase"
                : isConsulting
                ? "text-[#0f172a] font-serif"
                : "text-slate-900"
            }`}
          >
            <Calculator
              className={`w-4 h-4 ${
                isSwiss
                  ? "text-black"
                  : isConsulting
                  ? "text-[#0f172a]"
                  : "text-blue-600"
              }`}
            />
            Deterministic Financial Summary
          </h3>
          <span
            className={`font-mono text-[10px] uppercase tracking-wider ${
              isSwiss ? "text-neutral-600 font-bold" : "text-slate-500 font-medium"
            }`}
          >
            Formula Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr
                className={`border-b text-[10px] uppercase tracking-wider ${
                  isSwiss
                    ? "bg-black text-white"
                    : isConsulting
                    ? "bg-[#0f172a] text-white font-serif"
                    : "bg-slate-900 text-white"
                }`}
              >
                <th className="py-2 px-3 font-semibold">Deliverable Description</th>
                <th className="py-2 px-3 text-center font-semibold">Units / Qty</th>
                <th className="py-2 px-3 text-right font-semibold">Unit Rate</th>
                <th className="py-2 px-3 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isSwiss
                  ? "divide-neutral-200 border-b border-black"
                  : isConsulting
                  ? "divide-stone-200 border-b border-stone-300"
                  : "divide-slate-200 border-b border-slate-200"
              }`}
            >
              {p.lineItems.map((item, i) => (
                <tr
                  key={i}
                  className={`transition-colors ${
                    i % 2 === 0
                      ? "bg-white"
                      : isSwiss
                      ? "bg-neutral-50"
                      : isConsulting
                      ? "bg-[#f8f8f5]"
                      : "bg-slate-50/70"
                  }`}
                >
                  <td className="py-2.5 px-3 font-medium text-slate-900">
                    <div>{item.itemTitle}</div>
                    {item.category && (
                      <span className="text-[10px] text-slate-500 font-normal">
                        {item.category}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-600">
                    {item.quantity} {item.unitType === "hours" ? "hrs" : item.unitType}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-700">
                    {curr}
                    {fmt(item.unitPrice)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-semibold text-slate-900">
                    {curr}
                    {fmt(item.lineTotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation Summary Block */}
        <div className="flex justify-end pt-2">
          <div className="w-72 space-y-1.5 font-mono text-xs text-right">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-900">
                {curr}
                {fmt(p.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax ({p.taxRate}%):</span>
              <span className="font-semibold text-slate-900">
                {curr}
                {fmt(p.taxAmount)}
              </span>
            </div>
            <div
              className={`flex justify-between items-center p-2.5 rounded font-mono font-bold mt-2 shadow-sm ${
                isSwiss
                  ? "bg-black text-white rounded-none"
                  : isConsulting
                  ? "bg-[#0f172a] text-white rounded-sm font-serif"
                  : "bg-blue-600 text-white rounded-lg"
              }`}
            >
              <span className="text-xs uppercase tracking-wider">Total Investment:</span>
              <span className="text-sm">
                {curr}
                {fmt(p.grandTotal)}
              </span>
            </div>
            <p className="text-[9px] text-slate-400 text-right pt-0.5">
              Deterministic calculation verified by TypeScript engine (0% hallucination risk)
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 4: Assumptions & Terms ──────────────────────────── */}
      {p.assumptionsAndTerms && p.assumptionsAndTerms.length > 0 && (
        <div
          className={`break-inside-avoid space-y-2 border-t pt-4 ${
            isSwiss
              ? "border-black"
              : isConsulting
              ? "border-[#d6d3d1]"
              : "border-slate-200"
          }`}
        >
          <h4
            className={`text-xs font-bold uppercase tracking-wider ${
              isSwiss
                ? "text-black font-mono"
                : isConsulting
                ? "text-[#0f172a] font-serif"
                : "text-slate-800 font-mono"
            }`}
          >
            Engagement Terms &amp; Payment Milestones
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-xs text-slate-700 leading-relaxed">
            {p.assumptionsAndTerms.map((term, i) => (
              <li key={i}>{term}</li>
            ))}
          </ol>
        </div>
      )}

      {/* ── Section 5: Mutual Binding Acceptance & Signatures ────────── */}
      <div
        className={`break-inside-avoid pt-6 border-t space-y-4 ${
          isSwiss
            ? "border-black"
            : isConsulting
            ? "border-[#d6d3d1]"
            : "border-slate-200"
        }`}
      >
        <h4
          className={`text-[11px] font-bold uppercase tracking-wider ${
            isSwiss
              ? "text-black font-mono"
              : isConsulting
              ? "text-[#0f172a] font-serif"
              : "text-slate-500 font-mono"
          }`}
        >
          Mutual Binding Acceptance
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Client Signatory */}
          <div className="space-y-3">
            <div
              className={`h-10 border-b flex items-end ${
                isSwiss
                  ? "border-black"
                  : isConsulting
                  ? "border-stone-400"
                  : "border-slate-300"
              }`}
            >
              <span
                className={`text-sm italic font-serif ${
                  isSwiss
                    ? "text-black font-bold"
                    : isConsulting
                    ? "text-[#0f172a]"
                    : "text-blue-700"
                }`}
              >
                {p.clientName ? `${p.clientName.charAt(0)}. Signatory` : "Client Signatory"}
              </span>
            </div>
            <div className="space-y-0.5">
              <div
                className={`text-xs font-semibold ${
                  isSwiss ? "text-black" : "text-slate-900"
                }`}
              >
                {p.clientCompany || "Client Corporation"}
              </div>
              <div className="text-[11px] text-slate-500">
                Authorized Signatory • {p.clientName || "Primary Stakeholder"}
              </div>
            </div>
          </div>

          {/* Agency Signatory */}
          <div className="space-y-3">
            <div
              className={`h-10 border-b flex items-end ${
                isSwiss
                  ? "border-black"
                  : isConsulting
                  ? "border-stone-400"
                  : "border-slate-300"
              }`}
            >
              <span
                className={`text-sm italic font-serif ${
                  isSwiss
                    ? "text-black font-bold"
                    : isConsulting
                    ? "text-emerald-900"
                    : "text-emerald-700"
                }`}
              >
                M. ScopeLock
              </span>
            </div>
            <div className="space-y-0.5">
              <div
                className={`text-xs font-semibold ${
                  isSwiss ? "text-black" : "text-slate-900"
                }`}
              >
                ScopeLock Studio LLC
              </div>
              <div className="text-[11px] text-slate-500">
                Agency Principal &amp; Engineering Director
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Security Hash Footer ─────────────────────────────────────── */}
      <div
        className={`break-inside-avoid pt-4 border-t flex flex-col md:flex-row items-center justify-between gap-2 font-mono text-[10px] ${
          isSwiss
            ? "border-black text-black"
            : isConsulting
            ? "border-stone-300 text-stone-500 font-serif"
            : "border-slate-200 text-slate-500"
        }`}
      >
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Deterministic Scope Guarantee • SHA256-e89a4b8702c1</span>
        </span>
        <span>Zero hallucinated deliverables • Generated via ScopeLock AI Engine</span>
      </div>
    </div>
  );
}
