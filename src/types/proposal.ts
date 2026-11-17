import { Type } from "@google/genai";

// ─── Core TypeScript Interfaces ─────────────────────────────────────────────

export interface ScopePhase {
  phaseNumber: number;
  phaseTitle: string;
  timelineWeeks: number;
  deliverables: string[];
  outOfScope: string[];
}

export interface LineItem {
  itemTitle: string;
  category: string;
  description: string;
  quantity: number;
  unitType: "hours" | "fixed" | "retainer";
  unitPrice: number;
}

/** Raw shape returned by Gemini (no computed totals). */
export interface ProposalData {
  clientName: string;
  clientCompany: string;
  projectTitle: string;
  proposalDate: string;
  validUntilDate: string;
  executiveSummary: string;
  scopePhases: ScopePhase[];
  lineItems: LineItem[];
  assumptionsAndTerms: string[];
}

/** Enriched line item with deterministic math. */
export interface EnrichedLineItem extends LineItem {
  lineTotal: number;
}

/** Final proposal returned to the frontend (includes deterministic totals). */
export interface EnrichedProposal extends Omit<ProposalData, "lineItems"> {
  lineItems: EnrichedLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  grandTotal: number;
  customExclusions?: string[];
  currencySymbol?: string;
}

// ─── Gemini responseSchema (google/genai Type format) ───────────────────────

export const proposalResponseSchema = {
  type: Type.OBJECT,
  properties: {
    clientName: { type: Type.STRING, description: "Name of the primary client contact from the call." },
    clientCompany: { type: Type.STRING, description: "Name of the client's company or organization." },
    projectTitle: { type: Type.STRING, description: "Short, descriptive project title." },
    proposalDate: { type: Type.STRING, description: "Today's date in YYYY-MM-DD format." },
    validUntilDate: { type: Type.STRING, description: "Proposal expiry date (30 days from today) in YYYY-MM-DD format." },
    executiveSummary: {
      type: Type.STRING,
      description:
        "Exactly 2 concise paragraphs. Paragraph 1: the client's core problem discussed on the call. Paragraph 2: the desired ROI outcome and how the proposed engagement addresses it. Separate paragraphs with a double newline.",
    },
    scopePhases: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phaseNumber: { type: Type.NUMBER, description: "Sequential phase number starting at 1." },
          phaseTitle: { type: Type.STRING, description: "Clear, concise phase title." },
          timelineWeeks: { type: Type.NUMBER, description: "Estimated duration in weeks." },
          deliverables: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Specific deliverables included in this phase.",
          },
          outOfScope: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Items explicitly NOT included in this phase to prevent scope creep.",
          },
        },
        required: ["phaseNumber", "phaseTitle", "timelineWeeks", "deliverables", "outOfScope"],
      },
      description: "Project broken into sequential phases.",
    },
    lineItems: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          itemTitle: { type: Type.STRING, description: "Name of the billable line item." },
          category: { type: Type.STRING, description: "Category (e.g., Design, Development, AI/ML, Project Management)." },
          description: { type: Type.STRING, description: "Brief description of the work." },
          quantity: { type: Type.NUMBER, description: "Number of hours or units." },
          unitType: {
            type: Type.STRING,
            enum: ["hours", "fixed", "retainer"],
            description: "Billing unit type.",
          },
          unitPrice: { type: Type.NUMBER, description: "Price per unit in dollars. Must match the provided rate card exactly." },
        },
        required: ["itemTitle", "category", "description", "quantity", "unitType", "unitPrice"],
      },
      description: "Itemized pricing line items mapped to the rate card.",
    },
    assumptionsAndTerms: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        "Key assumptions and terms: payment milestones, revision limits, IP ownership, communication cadence, etc.",
    },
  },
  required: [
    "clientName",
    "clientCompany",
    "projectTitle",
    "proposalDate",
    "validUntilDate",
    "executiveSummary",
    "scopePhases",
    "lineItems",
    "assumptionsAndTerms",
  ],
};

