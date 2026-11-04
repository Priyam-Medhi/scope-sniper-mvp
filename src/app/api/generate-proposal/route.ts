import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { proposalResponseSchema, type ProposalData } from "@/types/proposal";
import { computeProposalTotals } from "@/lib/math";

// Models to attempt in order: satisfies architecture requirement while ensuring high availability
const CANDIDATE_MODELS = [
  "gemini-2.5-flash",
  "gemini-3.8-flash",
  "gemini-3-flash-preview",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transcript, rateCard, taxRate } = body as {
      transcript: string;
      rateCard: string;
      taxRate: number;
    };

    if (!transcript || !rateCard) {
      return NextResponse.json(
        { error: "Missing transcript or rateCard." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are an elite agency operations director with 20 years of experience scoping digital projects.

Your task:
1. Carefully read the sales call transcript below.
2. Extract EVERY deliverable, feature, and task discussed on the call.
3. Organize deliverables into logical, sequential project phases.
4. Map each deliverable to the user's Rate Card pricing matrix—match categories and hourly/fixed rates EXACTLY as listed.
5. For each phase, explicitly list out-of-scope items to protect against scope creep.
6. Write a concise 2-paragraph executive summary: Paragraph 1 covers the client's core pain point; Paragraph 2 covers the desired ROI outcome.
7. Include realistic assumptions and terms (payment milestones, revision limits, IP ownership, communication cadence).

CRITICAL RULES:
- Do NOT invent line item prices. Use ONLY the prices from the provided Rate Card.
- Do NOT compute totals, subtotals, or tax. Only provide quantity and unitPrice.
- Be thorough—if a deliverable was discussed on the call, it MUST appear in a phase.
- Set proposalDate to today's date and validUntilDate to 30 days from today.`;

    const userPrompt = `## Sales Call Transcript
${transcript}

## Rate Card / Pricing Matrix
${rateCard}

Generate a structured project proposal based on the transcript above, using the rate card for pricing.`;

    let rawText: string | undefined;
    let lastError: unknown;

    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: userPrompt,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: proposalResponseSchema,
          },
        });

        if (response.text) {
          rawText = response.text;
          break;
        }
      } catch (err) {
        console.warn(`Model ${model} attempt failed, trying fallback:`, err instanceof Error ? err.message : err);
        lastError = err;
      }
    }

    if (!rawText) {
      throw lastError || new Error("Gemini returned an empty response.");
    }

    const rawProposal: ProposalData = JSON.parse(rawText);

    // Deterministic math — NO LLM-computed totals
    const enriched = computeProposalTotals(rawProposal, taxRate ?? 0);

    return NextResponse.json(enriched);
  } catch (err: unknown) {
    console.error("Proposal generation error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
