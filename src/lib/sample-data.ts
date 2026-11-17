import type { EnrichedProposal } from "@/types/proposal";

export const SAMPLE_TRANSCRIPT = `[Sales Call Transcript — QuantumLeap Fitness x Apex Digital Agency]
[Date: November 4, 2026 | Duration: 42 minutes]

SARAH (Apex Agency): Thanks for hopping on, Marcus. I've been looking forward to diving into what QuantumLeap Fitness needs.

MARCUS (QuantumLeap CEO): Absolutely, Sarah. So here's the deal — we've grown to 12 gym locations across three states, and our tech stack is a complete mess. Members are churning because the experience is fragmented. Our app is basically a glorified class schedule from 2019.

SARAH: Walk me through the pain points your members are experiencing.

MARCUS: First, the onboarding flow is terrible. New members sign up at the front desk on paper forms, then someone manually enters it into our system. Half the time there are typos in emails so they never get their welcome sequence. We need a fully digital onboarding flow — mobile-first, ideally with QR code check-in at the gym.

SARAH: Got it. Digital onboarding with QR check-in. What about the existing member experience?

MARCUS: That's the big one. We want a complete member portal redesign. Right now members can't track their workouts, can't see their progress, can't book personal training sessions online. We want workout tracking with AI-powered recommendations — like "based on your last 10 sessions, here's what you should focus on next week." We also want integration with wearables — Apple Watch, Fitbit, Garmin.

SARAH: AI-powered workout recommendations and wearable sync — those are significant features. Let me make sure I capture this right. What about the business side?

MARCUS: We need a proper admin dashboard. Right now our gym managers are using three different tools. I want one unified dashboard where they can see real-time occupancy per location, revenue per member segment, churn prediction — basically, I want to know which members are about to cancel before they do. AI-driven churn prediction would be a game-changer.

SARAH: Churn prediction is a great use case for AI. We've built similar models before. What about payments and billing?

MARCUS: Yes — we need Stripe integration for recurring billing. Right now we're on some legacy payment processor and it's a nightmare. Members should be able to upgrade, downgrade, pause, or cancel their membership right from the app. And we need proper invoicing for our corporate wellness clients — about 30 companies send their employees to us.

SARAH: Corporate billing module too. And content — are you planning any digital content?

MARCUS: Great question — yes. We want to launch on-demand workout videos. We've been filming classes for months. We need a video streaming platform built into the app — think a mini Netflix for fitness. Categories, search, favoriting, progress tracking through video courses. Eventually we might do live streaming but that can be phase two or even a later project.

SARAH: Smart to phase that. Let me ask about branding — are you looking for a full rebrand or working with existing brand guidelines?

MARCUS: We just finished a rebrand last quarter with another agency. So we have a complete brand kit — logos, typography, color system, the works. We just need you to apply it consistently across the new platform. But we DO need UI/UX design for all the new screens. Wireframes, high-fidelity mockups, prototyping, user testing — the whole nine yards.

SARAH: Perfect. And timeline — what are you working with?

MARCUS: We're announcing the new platform at our annual member appreciation event in April. So we need everything live by end of March. I know that's aggressive.

SARAH: It's tight but doable if we phase it correctly. Based on everything you've described, I'm thinking we break this into four phases: Discovery & UX Design, Core Platform Development, AI Features & Integrations, and Launch & QA. I'll have a detailed proposal with exact pricing on your desk by end of week.

MARCUS: That sounds great. Budget-wise, we've allocated between 150 and 200K for this project. And one more thing — we need ongoing support after launch. Monthly retainer for bug fixes, feature updates, and monitoring the AI models.

SARAH: Absolutely, we'll include a post-launch retainer option. I think we're aligned. Let me get this proposal put together.

MARCUS: Looking forward to it. Thanks, Sarah.`;

export const DEFAULT_RATE_CARD = `## Agency Rate Card — Apex Digital

| Category              | Role / Service            | Rate       | Unit     |
|-----------------------|---------------------------|------------|----------|
| UI/UX Design          | Senior UX Designer        | $80/hr     | hours    |
| UI/UX Design          | UI Design & Prototyping   | $85/hr     | hours    |
| Frontend Development  | React / React Native Dev  | $100/hr    | hours    |
| Backend Development   | Node.js / API Engineer    | $110/hr    | hours    |
| Full-Stack Development| Full-Stack Engineer       | $105/hr    | hours    |
| AI / ML Integration   | AI/ML Engineer            | $130/hr    | hours    |
| DevOps & Cloud        | Cloud / DevOps Engineer   | $115/hr    | hours    |
| QA & Testing          | QA Engineer               | $75/hr     | hours    |
| Project Management    | Technical PM              | $90/hr     | hours    |
| Video Platform        | Streaming Infrastructure  | $5,000     | fixed    |
| Post-Launch Support   | Monthly Retainer          | $4,500/mo  | retainer |
| Strategy & Discovery  | Discovery Workshop        | $3,500     | fixed    |`;

export const SAMPLE_ACME_RATE_CARD = `Senior Full-Stack Engineering: $125/hr
UI/UX Design System: $95/hr
Cloud Infrastructure & DevOps: $140/hr
Project Management & QA: $85/hr
AI Solutions Architect: $165/hr`;

export const SAMPLE_ACME_TRANSCRIPT = `Client (Acme VP): We need a complete portal rebuild with Next.js, Postgres, and Stripe subscriptions. We also mentioned maybe doing an iOS app and custom AI recommendations if budget permits, but our immediate launch date is in 8 weeks. We cannot exceed $16k upfront.`;

export const DEFAULT_PROPOSAL: EnrichedProposal = {
  clientName: "VP of Product",
  clientCompany: "Acme Corp",
  projectTitle: "Acme Corp — Full-Stack Web Platform & API Redesign",
  proposalDate: "2026-10-24",
  validUntilDate: "2026-11-07",
  executiveSummary:
    "ScopeLock AI has parsed discovery notes from Oct 23. This proposal outlines the guaranteed deliverables, fixed pricing model, and explicit out-of-scope boundaries to ensure on-time delivery within the target 8-week launch window without unbudgeted scope drift.\n\nBy leveraging deterministic scoping and modular Next.js architecture, this engagement guarantees zero surprise costs and total alignment on production timelines.",
  scopePhases: [
    {
      phaseNumber: 1,
      phaseTitle: "Core Web Platform Architecture",
      timelineWeeks: 2,
      deliverables: [
        "Next.js 15 App Router setup, server actions, and high-performance caching layer",
        "Responsive desktop and mobile UI components built with Tailwind CSS",
      ],
      outOfScope: [
        "Native mobile applications (iOS / Android Swift/Kotlin)",
      ],
    },
    {
      phaseNumber: 2,
      phaseTitle: "Secure Stripe Billing & Subscriptions",
      timelineWeeks: 2,
      deliverables: [
        "Tiered pricing model checkout, customer portal, and robust webhook synchronization",
        "Automated recurring invoice generation and failed-payment handling",
      ],
      outOfScope: [
        "Custom crypto or multi-currency escrow payment gateways",
      ],
    },
    {
      phaseNumber: 3,
      phaseTitle: "Production PostgreSQL & ORM Modeling",
      timelineWeeks: 2,
      deliverables: [
        "Automated schema migrations, indexing strategies, and automated backup routines",
        "Role-based access control (RBAC) and audited session management",
      ],
      outOfScope: [
        "Legacy data scraping or unindexed manual CSV record conversions",
      ],
    },
    {
      phaseNumber: 4,
      phaseTitle: "Cloud Deployment & CI/CD Pipelines",
      timelineWeeks: 2,
      deliverables: [
        "Production containerization, preview deployments on AWS/Vercel, and health check alerts",
        "Staging and production environment automated regression suites",
      ],
      outOfScope: [
        "Custom AI Recommendation Model fine-tuning & vector indexing",
        "24/7 post-launch SLA emergency support (Standard 30-day bug warranty included)",
      ],
    },
  ],
  lineItems: [
    {
      itemTitle: "Next.js Frontend Architecture",
      category: "Frontend Development",
      description: "Full modern App Router setup with responsive views",
      quantity: 40,
      unitType: "hours",
      unitPrice: 125,
      lineTotal: 5000,
    },
    {
      itemTitle: "PostgreSQL Schema & Stripe Billing API",
      category: "Backend Development",
      description: "Database modeling and end-to-end checkout integration",
      quantity: 35,
      unitType: "hours",
      unitPrice: 125,
      lineTotal: 4375,
    },
    {
      itemTitle: "Design System & Component Library",
      category: "UI/UX Design",
      description: "Accessible design tokens, typography scale, and layout kits",
      quantity: 25,
      unitType: "hours",
      unitPrice: 95,
      lineTotal: 2375,
    },
    {
      itemTitle: "Cloud Deployment & CI/CD Pipelines",
      category: "DevOps & Cloud",
      description: "Automated pipelines, staging environments, and monitoring",
      quantity: 15,
      unitType: "hours",
      unitPrice: 140,
      lineTotal: 2100,
    },
  ],
  subtotal: 13850,
  taxRate: 8.5,
  taxAmount: 1177.25,
  grandTotal: 15027.25,
  customExclusions: [
    "Native iOS & Android Mobile Apps",
    "Custom AI Recommendation Model",
    "Unmetered Post-Launch Maintenance",
  ],
  currencySymbol: "$",
  assumptionsAndTerms: [
    "50% upfront deposit required prior to project kickoff; 50% due upon production deployment.",
    "Scope changes require a written and signed Change Order before implementation.",
    "Client will provide required brand assets, API credentials, and feedback within 48 hours.",
  ],
};

