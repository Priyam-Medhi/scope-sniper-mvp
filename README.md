# ScopeLock AI 🎯

A micro-SaaS application that instantly converts messy agency sales call transcripts into pixel-perfect, exact-layout PDF proposals. Built to eliminate scope creep, prevent LLM math hallucinations, and automate pricing matrices.

## 🚀 Live Demo

**[Try ScopeLock AI Live](https://scope-sniper-mvp.vercel.app)**

## ✨ Core Features

* **AI Transcript Extraction:** Leverages the Gemini API to parse unstructured discovery calls and map them to fixed rate cards.
* **Anti-Scope-Creep Guardrails:** Explicitly separates client requests into "Deliverables" and "Out of Scope" sections based on the conversation context.
* **Deterministic Math Engine:** TypeScript backend handles all pricing calculations (subtotals, dynamic tax rates, grand totals) to guarantee zero AI math hallucinations.
* **Locked PDF Rendering:** Generates professional, multi-page PDFs using `@react-pdf/renderer` that protect table layouts and signature blocks from awkward page breaks.
* **One-Click Theming:** Features 3 locked Tailwind CSS visual themes (Minimalist Swiss, Modern Tech SaaS, and Executive Consulting).

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **AI Integration:** Google Gemini API (`@google/genai`)
* **PDF Engine:** `@react-pdf/renderer`
* **Deployment:** Vercel & GitHub Actions
