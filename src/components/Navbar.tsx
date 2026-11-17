"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sparkles, User } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Generator Tool", href: "/tool" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Pricing", href: "/#pricing" },
    { name: "About Founder", href: "/#about" },
    { name: "Feedback", href: "/#feedback" },
    { name: "Contact Us", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-900 hover:text-blue-600 transition tracking-tight group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              SL
            </div>
            <div className="flex items-center gap-1.5 font-bold text-lg">
              <span>ScopeLock</span>
              <span className="text-blue-600">.ai</span>
            </div>
          </Link>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold tracking-wider uppercase border border-blue-200">
            Micro-SaaS
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/tool"
                ? pathname === "/tool"
                : link.href === "/"
                ? pathname === "/"
                : false;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200/60"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button & Profile Badge */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <Link
            href="/tool"
            className="inline-flex items-center gap-1.5 h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all"
          >
            <Sparkles size={14} />
            <span>Launch Tool →</span>
          </Link>
          <div
            className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center"
            title="Executive Mode"
          >
            <User size={15} />
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/tool"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium text-xs transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles size={15} />
              <span>Launch Tool →</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
