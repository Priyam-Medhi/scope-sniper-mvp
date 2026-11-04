"use client";

import type { EnrichedProposal } from "@/types/proposal";
import type { ProposalTheme } from "@/types/themes";

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

const THEME_STYLES: Record<
  ProposalTheme,
  {
    containerClass: string;
    headerBorder: string;
    headerTitle: string;
    headerSubtitle: string;
    metaText: string;
    metaValue: string;
    preparedForBox: string;
    preparedForLabel: string;
    preparedForName: string;
    preparedForCompany: string;
    projectBox: string;
    projectLabel: string;
    projectTitle: string;
    sectionTitle: string;
    sectionBorder: string;
    summaryText: string;
    phaseCard: string;
    phaseBadge: string;
    phaseTitle: string;
    phaseWeeks: string;
    deliverablesLabel: string;
    deliverablesBullet: string;
    deliverablesText: string;
    outOfScopeLabel: string;
    outOfScopeBullet: string;
    outOfScopeText: string;
    tableThead: string;
    tableHeadThFirst: string;
    tableHeadThLast: string;
    tableHeadTh: string;
    tableRowEven: string;
    tableRowOdd: string;
    tableItemTitle: string;
    tableItemCategory: string;
    tableItemRate: string;
    tableItemTotal: string;
    totalsBorder: string;
    subtotalLabel: string;
    subtotalValue: string;
    grandTotalRow: string;
    termsList: string;
    termsItem: string;
    signatureDivider: string;
    signatureHeading: string;
    signatureLabel: string;
    signatureLine: string;
    signatureHint: string;
  }
> = {
  "Minimalist Swiss (Black & White)": {
    containerClass: "theme-swiss font-sans text-black tracking-tight",
    headerBorder: "border-b-[3px] border-black pb-5 mb-6",
    headerTitle: "text-3xl font-black text-black tracking-tighter uppercase",
    headerSubtitle: "text-[10px] text-neutral-500 font-mono tracking-widest uppercase mt-1",
    metaText: "text-right text-xs text-neutral-600 font-mono space-y-0.5",
    metaValue: "text-black font-semibold",
    preparedForBox: "bg-white rounded-none p-4 border-2 border-black",
    preparedForLabel: "text-[9px] uppercase tracking-widest text-black font-mono font-bold mb-1",
    preparedForName: "font-black text-black tracking-tight",
    preparedForCompany: "text-sm text-neutral-700 font-medium",
    projectBox: "bg-black rounded-none p-4 border-2 border-black text-white",
    projectLabel: "text-[9px] uppercase tracking-widest text-neutral-400 font-mono font-bold mb-1",
    projectTitle: "font-black text-white tracking-tight",
    sectionTitle: "text-base font-black uppercase tracking-wider text-black",
    sectionBorder: "border-b-2 border-black pb-2 mb-3",
    summaryText: "text-sm text-neutral-900 leading-relaxed mb-3 font-normal",
    phaseCard: "border-2 border-black rounded-none p-4 bg-white",
    phaseBadge: "flex items-center justify-center w-7 h-7 bg-black text-white font-mono text-xs font-bold rounded-none",
    phaseTitle: "font-bold text-black text-sm tracking-tight",
    phaseWeeks: "text-[11px] font-mono text-neutral-500 uppercase",
    deliverablesLabel: "font-mono font-bold text-black mb-1 uppercase tracking-wider text-[10px]",
    deliverablesBullet: "text-black shrink-0 font-bold",
    deliverablesText: "text-neutral-900",
    outOfScopeLabel: "font-mono font-bold text-neutral-500 mb-1 uppercase tracking-wider text-[10px]",
    outOfScopeBullet: "text-neutral-400 shrink-0",
    outOfScopeText: "text-neutral-500",
    tableThead: "bg-black text-white font-mono",
    tableHeadThFirst: "text-left py-2 px-3 font-bold uppercase tracking-wider text-[10px]",
    tableHeadThLast: "text-right py-2 px-3 font-bold uppercase tracking-wider text-[10px]",
    tableHeadTh: "py-2 px-3 font-bold uppercase tracking-wider text-[10px]",
    tableRowEven: "bg-white border-b border-neutral-200",
    tableRowOdd: "bg-neutral-50 border-b border-neutral-200",
    tableItemTitle: "py-2.5 px-3 font-bold text-black",
    tableItemCategory: "py-2.5 px-3 text-neutral-600 font-mono text-[11px]",
    tableItemRate: "py-2.5 px-3 text-right text-neutral-800 font-mono",
    tableItemTotal: "py-2.5 px-3 text-right font-black text-black font-mono",
    totalsBorder: "mt-4 border-t-2 border-black pt-3 flex justify-end",
    subtotalLabel: "text-neutral-600 font-mono text-[11px] uppercase",
    subtotalValue: "font-bold text-black font-mono",
    grandTotalRow: "flex justify-between text-base font-black text-black border-t-2 border-black pt-2 mt-1 font-mono",
    termsList: "list-decimal list-inside space-y-1 text-xs text-neutral-800",
    termsItem: "leading-relaxed",
    signatureDivider: "border-t-2 border-black pt-6 mt-10",
    signatureHeading: "text-base font-black uppercase tracking-wider text-black mb-6",
    signatureLabel: "text-[9px] uppercase tracking-widest text-black font-mono font-bold",
    signatureLine: "border-b-2 border-black pb-1",
    signatureHint: "text-[9px] font-mono text-neutral-400",
  },

  "Modern Tech SaaS (Indigo/Slate)": {
    containerClass: "theme-modern font-sans text-slate-800",
    headerBorder: "border-b-2 border-indigo-600 pb-5 mb-6",
    headerTitle: "text-3xl font-bold text-slate-900 tracking-tight",
    headerSubtitle: "text-xs text-slate-400 mt-0.5 tracking-widest uppercase",
    metaText: "text-right text-xs text-slate-500 space-y-0.5",
    metaValue: "text-slate-700 font-medium",
    preparedForBox: "bg-slate-50 rounded-lg p-4 border border-slate-100",
    preparedForLabel: "text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-semibold",
    preparedForName: "font-semibold text-slate-900",
    preparedForCompany: "text-sm text-slate-600",
    projectBox: "bg-indigo-50 rounded-lg p-4 border border-indigo-100",
    projectLabel: "text-[10px] uppercase tracking-wider text-indigo-400 mb-1 font-semibold",
    projectTitle: "font-semibold text-indigo-900",
    sectionTitle: "text-lg font-bold text-slate-900",
    sectionBorder: "border-b border-slate-200 pb-2 mb-3",
    summaryText: "text-sm text-slate-700 leading-relaxed mb-3",
    phaseCard: "border border-slate-200 rounded-lg p-4",
    phaseBadge: "flex items-center justify-center w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold",
    phaseTitle: "font-semibold text-slate-900 text-sm",
    phaseWeeks: "text-[11px] text-slate-400",
    deliverablesLabel: "font-semibold text-green-700 mb-1 uppercase tracking-wider text-[10px]",
    deliverablesBullet: "text-green-500 shrink-0",
    deliverablesText: "text-slate-700",
    outOfScopeLabel: "font-semibold text-red-600 mb-1 uppercase tracking-wider text-[10px]",
    outOfScopeBullet: "text-red-400 shrink-0",
    outOfScopeText: "text-slate-500",
    tableThead: "bg-slate-800 text-white",
    tableHeadThFirst: "text-left py-2 px-3 font-semibold rounded-tl-lg",
    tableHeadThLast: "text-right py-2 px-3 font-semibold rounded-tr-lg",
    tableHeadTh: "py-2 px-3 font-semibold",
    tableRowEven: "bg-white",
    tableRowOdd: "bg-slate-50",
    tableItemTitle: "py-2 px-3 font-medium text-slate-800",
    tableItemCategory: "py-2 px-3 text-slate-500",
    tableItemRate: "py-2 px-3 text-right text-slate-700",
    tableItemTotal: "py-2 px-3 text-right font-medium text-slate-900",
    totalsBorder: "mt-3 border-t-2 border-slate-200 pt-3 flex justify-end",
    subtotalLabel: "text-slate-600",
    subtotalValue: "font-medium text-slate-800",
    grandTotalRow: "flex justify-between text-base font-bold text-indigo-700 border-t border-slate-200 pt-2 mt-1",
    termsList: "list-decimal list-inside space-y-1 text-xs text-slate-700",
    termsItem: "leading-relaxed",
    signatureDivider: "border-t-2 border-slate-200 pt-6 mt-10",
    signatureHeading: "text-lg font-bold text-slate-900 mb-6",
    signatureLabel: "text-[10px] uppercase tracking-wider text-slate-400 font-semibold",
    signatureLine: "border-b border-slate-300 pb-1",
    signatureHint: "text-[10px] text-slate-400",
  },

  "Executive Consulting (Navy/Serif)": {
    containerClass: "theme-executive font-serif text-[#0f172a]",
    headerBorder: "border-b-2 border-[#0f172a] pb-5 mb-6",
    headerTitle: "text-3xl font-serif font-bold text-[#0f172a] tracking-tight italic",
    headerSubtitle: "text-xs font-serif text-slate-500 mt-0.5 tracking-widest uppercase",
    metaText: "text-right text-xs font-serif text-slate-600 space-y-0.5",
    metaValue: "text-[#0f172a] font-semibold",
    preparedForBox: "bg-[#f8fafc] rounded-md p-4 border border-slate-300 shadow-xs",
    preparedForLabel: "text-[10px] uppercase tracking-wider text-slate-500 font-serif font-semibold mb-1",
    preparedForName: "font-serif font-bold text-[#0f172a]",
    preparedForCompany: "text-sm text-slate-600 font-serif",
    projectBox: "bg-[#0f172a] rounded-md p-4 border border-[#0f172a] text-white shadow-xs",
    projectLabel: "text-[10px] uppercase tracking-wider text-slate-300 font-serif font-medium mb-1",
    projectTitle: "font-serif font-bold text-white",
    sectionTitle: "text-lg font-serif font-bold text-[#0f172a]",
    sectionBorder: "border-b-2 border-slate-300 pb-2 mb-3",
    summaryText: "text-sm font-serif text-slate-800 leading-relaxed mb-3",
    phaseCard: "border border-slate-300 rounded-md p-4 bg-[#fbfcfd]",
    phaseBadge: "flex items-center justify-center w-7 h-7 rounded-md bg-[#0f172a] text-white text-xs font-serif font-bold shadow-xs",
    phaseTitle: "font-serif font-bold text-[#0f172a] text-sm",
    phaseWeeks: "text-[11px] font-serif text-slate-500 italic",
    deliverablesLabel: "font-serif font-semibold text-[#1e3a8a] mb-1 uppercase tracking-wider text-[10px]",
    deliverablesBullet: "text-[#1e3a8a] shrink-0 font-bold",
    deliverablesText: "text-slate-800 font-serif",
    outOfScopeLabel: "font-serif font-semibold text-slate-600 mb-1 uppercase tracking-wider text-[10px]",
    outOfScopeBullet: "text-slate-400 shrink-0",
    outOfScopeText: "text-slate-600 font-serif",
    tableThead: "bg-[#0f172a] text-white font-serif",
    tableHeadThFirst: "text-left py-2.5 px-3 font-semibold",
    tableHeadThLast: "text-right py-2.5 px-3 font-semibold",
    tableHeadTh: "py-2.5 px-3 font-semibold",
    tableRowEven: "bg-white border-b border-slate-200",
    tableRowOdd: "bg-[#f8fafc] border-b border-slate-200",
    tableItemTitle: "py-2 px-3 font-serif font-medium text-[#0f172a]",
    tableItemCategory: "py-2 px-3 text-slate-600 font-serif",
    tableItemRate: "py-2 px-3 text-right text-slate-700 font-serif",
    tableItemTotal: "py-2 px-3 text-right font-serif font-bold text-[#0f172a]",
    totalsBorder: "mt-4 border-t-2 border-[#0f172a] pt-3 flex justify-end",
    subtotalLabel: "text-slate-600 font-serif",
    subtotalValue: "font-serif font-medium text-[#0f172a]",
    grandTotalRow: "flex justify-between text-base font-serif font-bold text-[#0f172a] border-t border-slate-300 pt-2 mt-1",
    termsList: "list-decimal list-inside space-y-1 text-xs font-serif text-slate-800",
    termsItem: "leading-relaxed font-serif",
    signatureDivider: "border-t-2 border-[#0f172a] pt-6 mt-10",
    signatureHeading: "text-lg font-serif font-bold text-[#0f172a] mb-6",
    signatureLabel: "text-[10px] uppercase tracking-wider text-slate-500 font-serif font-semibold",
    signatureLine: "border-b border-slate-400 pb-1",
    signatureHint: "text-[10px] font-serif text-slate-400",
  },
};

export default function ProposalPreview({
  proposal,
  theme = "Modern Tech SaaS (Indigo/Slate)",
}: ProposalPreviewProps) {
  if (!proposal) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400 text-sm">
        <div className="text-center space-y-3">
          <div className="text-5xl opacity-40">📄</div>
          <p className="font-medium text-slate-500">Proposal preview will appear here</p>
          <p className="text-xs text-slate-400 max-w-xs">
            Paste a sales call transcript, configure your rate card, and click Generate to build your pixel-perfect proposal.
          </p>
        </div>
      </div>
    );
  }

  const p = proposal;
  const s = THEME_STYLES[theme] || THEME_STYLES["Modern Tech SaaS (Indigo/Slate)"];

  return (
    <div
      id="proposal-document"
      className={`proposal-document bg-white mx-auto shadow-2xl print:shadow-none ${s.containerClass}`}
      style={{ width: "210mm", minHeight: "297mm", padding: "20mm 22mm" }}
    >
      {/* ── Cover Header ─────────────────────────────────────────────── */}
      <div className="break-inside-avoid mb-8">
        <div className={`flex justify-between items-start ${s.headerBorder}`}>
          <div>
            <h1 className={s.headerTitle}>ScopeLock AI</h1>
            <p className={s.headerSubtitle}>Proposal & Statement of Work</p>
          </div>
          <div className={s.metaText}>
            <p>
              Date: <span className={s.metaValue}>{fmtDate(p.proposalDate)}</span>
            </p>
            <p>
              Valid Until: <span className={s.metaValue}>{fmtDate(p.validUntilDate)}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className={s.preparedForBox}>
            <p className={s.preparedForLabel}>Prepared For</p>
            <p className={s.preparedForName}>{p.clientName}</p>
            <p className={s.preparedForCompany}>{p.clientCompany}</p>
          </div>
          <div className={s.projectBox}>
            <p className={s.projectLabel}>Project</p>
            <p className={s.projectTitle}>{p.projectTitle}</p>
          </div>
        </div>
      </div>

      {/* ── Executive Summary ────────────────────────────────────────── */}
      <div className="break-inside-avoid mb-8">
        <div className={s.sectionBorder}>
          <h2 className={s.sectionTitle}>Executive Summary</h2>
        </div>
        {p.executiveSummary.split("\n\n").map((para, i) => (
          <p key={i} className={s.summaryText}>
            {para}
          </p>
        ))}
      </div>

      {/* ── Scope of Work Phases ─────────────────────────────────────── */}
      <div className="mb-8">
        <div className={s.sectionBorder}>
          <h2 className={s.sectionTitle}>Scope of Work</h2>
        </div>
        <div className="space-y-4">
          {p.scopePhases.map((phase) => (
            <div key={phase.phaseNumber} className={`break-inside-avoid ${s.phaseCard}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className={s.phaseBadge}>{phase.phaseNumber}</span>
                <div>
                  <h3 className={s.phaseTitle}>{phase.phaseTitle}</h3>
                  <p className={s.phaseWeeks}>
                    {phase.timelineWeeks} week{phase.timelineWeeks !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className={s.deliverablesLabel}>✓ Deliverables</p>
                  <ul className="space-y-1">
                    {phase.deliverables.map((d, i) => (
                      <li key={i} className={`flex gap-1.5 ${s.deliverablesText}`}>
                        <span className={s.deliverablesBullet}>•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={s.outOfScopeLabel}>✗ Out of Scope</p>
                  <ul className="space-y-1">
                    {phase.outOfScope.map((d, i) => (
                      <li key={i} className={`flex gap-1.5 ${s.outOfScopeText}`}>
                        <span className={s.outOfScopeBullet}>•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pricing Table ────────────────────────────────────────────── */}
      <div className="break-inside-avoid mb-8">
        <div className={s.sectionBorder}>
          <h2 className={s.sectionTitle}>Investment Summary</h2>
        </div>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className={s.tableThead}>
              <th className={s.tableHeadThFirst}>Item</th>
              <th className={`text-left ${s.tableHeadTh}`}>Category</th>
              <th className={`text-right ${s.tableHeadTh}`}>Qty</th>
              <th className={`text-center ${s.tableHeadTh}`}>Unit</th>
              <th className={`text-right ${s.tableHeadTh}`}>Rate</th>
              <th className={s.tableHeadThLast}>Total</th>
            </tr>
          </thead>
          <tbody>
            {p.lineItems.map((item, i) => (
              <tr key={i} className={i % 2 === 0 ? s.tableRowEven : s.tableRowOdd}>
                <td className={s.tableItemTitle}>{item.itemTitle}</td>
                <td className={s.tableItemCategory}>{item.category}</td>
                <td className="py-2 px-3 text-right">{item.quantity}</td>
                <td className="py-2 px-3 text-center">{item.unitType}</td>
                <td className={s.tableItemRate}>${fmt(item.unitPrice)}</td>
                <td className={s.tableItemTotal}>${fmt(item.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ── Totals ──────────────────────────────────────────────────── */}
        <div className={s.totalsBorder}>
          <div className="w-64 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className={s.subtotalLabel}>Subtotal</span>
              <span className={s.subtotalValue}>${fmt(p.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className={s.subtotalLabel}>Tax ({p.taxRate}%)</span>
              <span className={s.subtotalValue}>${fmt(p.taxAmount)}</span>
            </div>
            <div className={s.grandTotalRow}>
              <span>Grand Total</span>
              <span>${fmt(p.grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Assumptions & Terms ──────────────────────────────────────── */}
      <div className="break-inside-avoid mb-8">
        <div className={s.sectionBorder}>
          <h2 className={s.sectionTitle}>Assumptions & Terms</h2>
        </div>
        <ol className={s.termsList}>
          {p.assumptionsAndTerms.map((term, i) => (
            <li key={i} className={s.termsItem}>
              {term}
            </li>
          ))}
        </ol>
      </div>

      {/* ── Signature Block ──────────────────────────────────────────── */}
      <div className={`break-inside-avoid ${s.signatureDivider}`}>
        <h2 className={s.signatureHeading}>Acceptance & Authorization</h2>
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-8">
            <p className={s.signatureLabel}>Client</p>
            <div className={s.signatureLine}>
              <p className={s.signatureHint}>Signature</p>
            </div>
            <div className={s.signatureLine}>
              <p className={s.signatureHint}>Name & Title</p>
            </div>
            <div className={s.signatureLine}>
              <p className={s.signatureHint}>Date</p>
            </div>
          </div>
          <div className="space-y-8">
            <p className={s.signatureLabel}>Agency</p>
            <div className={s.signatureLine}>
              <p className={s.signatureHint}>Signature</p>
            </div>
            <div className={s.signatureLine}>
              <p className={s.signatureHint}>Name & Title</p>
            </div>
            <div className={s.signatureLine}>
              <p className={s.signatureHint}>Date</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
