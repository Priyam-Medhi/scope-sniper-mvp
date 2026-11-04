import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScopeLock AI — Sales Call to Proposal Builder",
  description: "Transform sales call transcripts into pixel-perfect, exact-layout PDF proposals with AI-powered scope extraction and deterministic pricing.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
