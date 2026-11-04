export type ProposalTheme =
  | "Minimalist Swiss (Black & White)"
  | "Modern Tech SaaS (Indigo/Slate)"
  | "Executive Consulting (Navy/Serif)";

export interface ThemeOption {
  id: ProposalTheme;
  label: string;
  accentColor: string;
  description: string;
}

export const PROPOSAL_THEMES: ThemeOption[] = [
  {
    id: "Minimalist Swiss (Black & White)",
    label: "Minimalist Swiss",
    accentColor: "bg-black text-white",
    description: "Monochrome, stark geometric grids, and high-contrast precision",
  },
  {
    id: "Modern Tech SaaS (Indigo/Slate)",
    label: "Modern Tech SaaS",
    accentColor: "bg-indigo-600 text-white",
    description: "Modern product aesthetic with indigo highlights and slate cards",
  },
  {
    id: "Executive Consulting (Navy/Serif)",
    label: "Executive Consulting",
    accentColor: "bg-[#0f172a] text-slate-100",
    description: "Classic boardroom aesthetic with serif typography and deep navy",
  },
];

