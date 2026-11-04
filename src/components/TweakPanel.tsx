"use client";

import type { EnrichedProposal, ScopePhase, EnrichedLineItem } from "@/types/proposal";
import { Trash2, Plus } from "lucide-react";

interface TweakPanelProps {
  proposal: EnrichedProposal;
  onChange: (updated: EnrichedProposal) => void;
}

export default function TweakPanel({ proposal, onChange }: TweakPanelProps) {
  // ── Helpers ──────────────────────────────────────────────────────

  function updateField<K extends keyof EnrichedProposal>(key: K, value: EnrichedProposal[K]) {
    onChange({ ...proposal, [key]: value });
  }

  function updatePhase(idx: number, updated: Partial<ScopePhase>) {
    const phases = proposal.scopePhases.map((p, i) => (i === idx ? { ...p, ...updated } : p));
    onChange({ ...proposal, scopePhases: phases });
  }

  function removePhase(idx: number) {
    onChange({ ...proposal, scopePhases: proposal.scopePhases.filter((_, i) => i !== idx) });
  }

  function addPhase() {
    const next: ScopePhase = {
      phaseNumber: proposal.scopePhases.length + 1,
      phaseTitle: "New Phase",
      timelineWeeks: 1,
      deliverables: ["Deliverable"],
      outOfScope: ["TBD"],
    };
    onChange({ ...proposal, scopePhases: [...proposal.scopePhases, next] });
  }

  function updateLineItem(idx: number, updated: Partial<EnrichedLineItem>) {
    const items = proposal.lineItems.map((item, i) =>
      i === idx ? { ...item, ...updated } : item
    );
    onChange({ ...proposal, lineItems: items });
  }

  function removeLineItem(idx: number) {
    onChange({ ...proposal, lineItems: proposal.lineItems.filter((_, i) => i !== idx) });
  }

  function addLineItem() {
    const next: EnrichedLineItem = {
      itemTitle: "New Item",
      category: "General",
      description: "",
      quantity: 1,
      unitType: "hours",
      unitPrice: 100,
      lineTotal: 100,
    };
    onChange({ ...proposal, lineItems: [...proposal.lineItems, next] });
  }

  function updateTerm(idx: number, value: string) {
    const terms = [...proposal.assumptionsAndTerms];
    terms[idx] = value;
    onChange({ ...proposal, assumptionsAndTerms: terms });
  }

  function removeTerm(idx: number) {
    onChange({ ...proposal, assumptionsAndTerms: proposal.assumptionsAndTerms.filter((_, i) => i !== idx) });
  }

  function addTerm() {
    onChange({ ...proposal, assumptionsAndTerms: [...proposal.assumptionsAndTerms, "New term"] });
  }

  // ── Render ───────────────────────────────────────────────────────

  return (
    <div className="space-y-6 text-sm">
      {/* ── Project Info ──────────────────────────────────────────── */}
      <section>
        <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Project Info</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Client Name" value={proposal.clientName} onChange={(v) => updateField("clientName", v)} />
          <Field label="Company" value={proposal.clientCompany} onChange={(v) => updateField("clientCompany", v)} />
          <Field label="Project Title" value={proposal.projectTitle} onChange={(v) => updateField("projectTitle", v)} className="col-span-2" />
          <Field label="Proposal Date" value={proposal.proposalDate} onChange={(v) => updateField("proposalDate", v)} />
          <Field label="Valid Until" value={proposal.validUntilDate} onChange={(v) => updateField("validUntilDate", v)} />
        </div>
      </section>

      {/* ── Executive Summary ─────────────────────────────────────── */}
      <section>
        <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Executive Summary</h3>
        <textarea
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 text-xs resize-y min-h-25 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={proposal.executiveSummary}
          onChange={(e) => updateField("executiveSummary", e.target.value)}
          rows={5}
        />
      </section>

      {/* ── Scope Phases ──────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">Scope Phases</h3>
          <button onClick={addPhase} className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300">
            <Plus size={12} /> Add Phase
          </button>
        </div>
        <div className="space-y-3">
          {proposal.scopePhases.map((phase, i) => (
            <div key={i} className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                    {phase.phaseNumber}
                  </span>
                  <input
                    className="bg-transparent border-b border-slate-500 text-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-400 w-48"
                    value={phase.phaseTitle}
                    onChange={(e) => updatePhase(i, { phaseTitle: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className="bg-slate-700/50 border border-slate-600 rounded px-2 py-0.5 text-slate-200 text-xs w-14 text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={phase.timelineWeeks}
                    onChange={(e) => updatePhase(i, { timelineWeeks: Number(e.target.value) || 0 })}
                    min={1}
                  />
                  <span className="text-[10px] text-slate-400">wks</span>
                  <button onClick={() => removePhase(i)} className="text-red-400 hover:text-red-300 ml-1">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="text-[11px] text-slate-400">
                <span className="text-green-400 font-medium">Deliverables:</span>{" "}
                <EditableList
                  items={phase.deliverables}
                  onChange={(items) => updatePhase(i, { deliverables: items })}
                />
              </div>
              <div className="text-[11px] text-slate-400">
                <span className="text-red-400 font-medium">Out of Scope:</span>{" "}
                <EditableList
                  items={phase.outOfScope}
                  onChange={(items) => updatePhase(i, { outOfScope: items })}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Line Items ────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">Line Items</h3>
          <button onClick={addLineItem} className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300">
            <Plus size={12} /> Add Item
          </button>
        </div>
        <div className="space-y-2">
          {proposal.lineItems.map((item, i) => (
            <div key={i} className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <input
                  className="bg-transparent border-b border-slate-500 text-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-400 flex-1 mr-2"
                  value={item.itemTitle}
                  onChange={(e) => updateLineItem(i, { itemTitle: e.target.value })}
                />
                <button onClick={() => removeLineItem(i)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={12} />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Category</label>
                  <input
                    className="w-full bg-slate-700/50 border border-slate-600 rounded px-2 py-0.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={item.category}
                    onChange={(e) => updateLineItem(i, { category: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Qty</label>
                  <input
                    type="number"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded px-2 py-0.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(i, { quantity: Number(e.target.value) || 0 })}
                    min={0}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Unit</label>
                  <select
                    className="w-full bg-slate-700/50 border border-slate-600 rounded px-2 py-0.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={item.unitType}
                    onChange={(e) => updateLineItem(i, { unitType: e.target.value as "hours" | "fixed" | "retainer" })}
                  >
                    <option value="hours">hours</option>
                    <option value="fixed">fixed</option>
                    <option value="retainer">retainer</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Rate ($)</label>
                  <input
                    type="number"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded px-2 py-0.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={item.unitPrice}
                    onChange={(e) => updateLineItem(i, { unitPrice: Number(e.target.value) || 0 })}
                    min={0}
                  />
                </div>
              </div>
              <div className="mt-1.5 text-right text-[11px] text-slate-400">
                Line total: <span className="text-slate-200 font-medium">${(item.quantity * item.unitPrice).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Assumptions & Terms ───────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">Assumptions & Terms</h3>
          <button onClick={addTerm} className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300">
            <Plus size={12} /> Add Term
          </button>
        </div>
        <div className="space-y-1.5">
          {proposal.assumptionsAndTerms.map((term, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 w-4 text-right shrink-0">{i + 1}.</span>
              <input
                className="flex-1 bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={term}
                onChange={(e) => updateTerm(i, e.target.value)}
              />
              <button onClick={() => removeTerm(i)} className="text-red-400 hover:text-red-300">
                <Trash2 size={10} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Totals Summary ────────────────────────────────────────── */}
      <section className="bg-indigo-900/30 border border-indigo-700/50 rounded-lg p-4 space-y-1">
        <div className="flex justify-between text-xs text-slate-300">
          <span>Subtotal</span>
          <span className="font-medium">${proposal.subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between text-xs text-slate-300">
          <span>Tax ({proposal.taxRate}%)</span>
          <span className="font-medium">${proposal.taxAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-indigo-300 border-t border-indigo-600/50 pt-2 mt-1">
          <span>Grand Total</span>
          <span>${proposal.grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        </div>
      </section>
    </div>
  );
}

// ─── Inline editable string list ──────────────────────────────────────────

function EditableList({ items, onChange }: { items: string[]; onChange: (items: string[]) => void }) {
  return (
    <div className="mt-1 space-y-1">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          <span className="text-slate-500">•</span>
          <input
            className="flex-1 bg-transparent border-b border-slate-600/50 text-slate-300 text-[11px] focus:outline-none focus:border-indigo-400"
            value={item}
            onChange={(e) => {
              const copy = [...items];
              copy[i] = e.target.value;
              onChange(copy);
            }}
          />
          <button
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="text-red-400/60 hover:text-red-300"
          >
            <Trash2 size={10} />
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, ""])}
        className="text-[10px] text-indigo-400/70 hover:text-indigo-300 ml-3"
      >
        + add
      </button>
    </div>
  );
}

// ─── Simple text field ────────────────────────────────────────────────────

function Field({ label, value, onChange, className = "" }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-[10px] text-slate-400 block mb-0.5">{label}</label>
      <input
        className="w-full bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

