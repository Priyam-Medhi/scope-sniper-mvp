import type { ProposalData, EnrichedProposal, EnrichedLineItem } from "@/types/proposal";

/**
 * Deterministic math layer — NO LLM-generated totals.
 * Takes raw Gemini-extracted data (quantity + unitPrice per line item)
 * and computes lineTotal, subtotal, taxAmount, and grandTotal in TypeScript.
 */
export function computeProposalTotals(
  raw: ProposalData,
  taxRate: number
): EnrichedProposal {
  const enrichedItems: EnrichedLineItem[] = raw.lineItems.map((item) => ({
    ...item,
    lineTotal: roundCents(item.quantity * item.unitPrice),
  }));

  const subtotal = roundCents(
    enrichedItems.reduce((sum, item) => sum + item.lineTotal, 0)
  );

  const taxAmount = roundCents(subtotal * (taxRate / 100));
  const grandTotal = roundCents(subtotal + taxAmount);

  return {
    ...raw,
    lineItems: enrichedItems,
    subtotal,
    taxRate,
    taxAmount,
    grandTotal,
  };
}

/** Round to 2 decimal places to avoid floating point drift. */
function roundCents(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Re-compute totals from an already-enriched proposal (used by the tweak panel).
 */
export function recomputeTotals(proposal: EnrichedProposal): EnrichedProposal {
  const enrichedItems: EnrichedLineItem[] = proposal.lineItems.map((item) => ({
    ...item,
    lineTotal: roundCents(item.quantity * item.unitPrice),
  }));

  const subtotal = roundCents(
    enrichedItems.reduce((sum, item) => sum + item.lineTotal, 0)
  );

  const taxAmount = roundCents(subtotal * (proposal.taxRate / 100));
  const grandTotal = roundCents(subtotal + taxAmount);

  return {
    ...proposal,
    lineItems: enrichedItems,
    subtotal,
    taxAmount,
    grandTotal,
  };
}

