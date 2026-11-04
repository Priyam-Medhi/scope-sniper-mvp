<!-- markdownlint-disable MD041 MD003 -->
---

trigger: always_on
---

---

trigger: always_on

---

# Project Architecture & Guardrails

1. **Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Zod.
2. **Gemini SDK**: ALWAYS use the official `@google/genai` SDK (`import { GoogleGenAI, Type } from '@google/genai'`). NEVER use the legacy `@google/generative-ai` package.
3. **Model**: Use `gemini-2.5-flash` with `responseMimeType: "application/json"` and a strict `responseSchema`.
4. **No LLM Math**: Gemini must ONLY extract `quantity` (hours/units) and `unitPrice` from the rate card. All `lineTotal`, `subtotal`, `tax`, and `grandTotal` values MUST be calculated deterministically in TypeScript after parsing the JSON.
5. **Exact-Layout PDF Rules**: The proposal preview and PDF export must enforce strict page-break CSS (`break-inside-avoid` on all SOW cards, pricing tables, and signature blocks) so tables never fracture across pages.
