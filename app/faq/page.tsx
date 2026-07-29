"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown, Search, Sparkles, ArrowRight } from 'lucide-react';
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

// ─── Variants ────────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  category: string;
  items: FaqItem[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FAQ_DATA: FaqCategory[] = [
  {
    category: "General",
    items: [
      {
        q: "What is Builder by HotCode AI?",
        a: "Builder by HotCode AI is an AI-powered website generator that turns plain English descriptions into fully functional, production-ready websites in under 60 seconds.",
      },
      {
        q: "Do I need coding experience?",
        a: "Not at all. Simply describe your vision in plain English and the AI handles all the code. Developers can also export the full source code.",
      },
      {
        q: "What kinds of websites can I build?",
        a: "Portfolios, landing pages, SaaS products, e-commerce stores, blogs, dashboards, agency sites, and more. If you can describe it, Builder can generate it.",
      },
      {
        q: "How long does generation take?",
        a: "Most websites are generated in under 60 seconds. The AI processes your prompt, writes code, applies styling, and renders a live preview in real time.",
      },
    ],
  },
  {
    category: "Pricing",
    items: [
      {
        q: "How does the credit system work?",
        a: "Each website generation costs 1 credit. Free accounts receive 50 credits per month. Purchased credit packs never expire.",
      },
      {
        q: "Is there a free plan?",
        a: "Yes. The Starter plan is completely free with 50 credits every month. No credit card required.",
      },
      {
        q: "Do unused credits roll over?",
        a: "Purchased credit packs never expire. Monthly free credits reset each billing cycle.",
      },
      {
        q: "Can I upgrade or downgrade?",
        a: "Yes, change your plan anytime from account settings. Changes take effect immediately.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "What tech stack does Builder use?",
        a: "Builder generates Next.js 14 websites with TypeScript, Tailwind CSS, and modern React patterns. All code is production-ready.",
      },
      {
        q: "Can I export the source code?",
        a: "Yes. Download a complete ZIP of your project and deploy anywhere — Vercel, Netlify, GitHub Pages, or your own server.",
      },
      {
        q: "Does it support custom domains?",
        a: "Custom domain support is available on Pro and Scale plans. Connect any domain you own.",
      },
      {
        q: "Is the generated code SEO-friendly?",
        a: "Yes. All generated sites include proper meta tags, semantic HTML, Open Graph tags, and follow SEO best practices.",
      },
    ],
  },
  {
    category: "Account",
    items: [
      {
        q: "How do I get started?",
        a: "Click Start Building, describe your website, and the AI generates it instantly. No account required for the first generation.",
      },
      {
        q: "Can I share my generated websites?",
        a: "Yes. Each generated website gets a unique preview URL you can share with anyone.",
      },
      {
        q: "How do I cancel my subscription?",
        a: "Cancel anytime from your account settings. You keep access until the end of your billing period.",
      },
    ],
  },
];

const CATEGORIES = ["All", "General", "Pricing", "Technical", "Account"] as const;
type Category = (typeof CATEGORIES)[number];

// ─── Accordion Item ───────────────────────────────────────────────────────────
function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "border border-[#EDE9FE] rounded-xl overflow-hidden bg-white transition-shadow duration-200",
        isOpen
          ? "shadow-[0_4px_16px_-4px_rgba(124,58,237,0.12)]"
          : "shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "text-sm font-semibold leading-snug transition-colors duration-200",
            isOpen ? "text-[#7C3AED]" : "text-[#111827] group-hover:text-[#7C3AED]"
          )}
        >
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-colors duration-200",
              isOpen ? "text-[#7C3AED]" : "text-[#6B7280]"
            )}
            aria-hidden="true"
          />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-[#6B7280] leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FaqPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter logic
  const filteredData = FAQ_DATA.map((group) => {
    const matchesCategory =
      activeCategory === "All" || group.category === activeCategory;
    if (!matchesCategory) return null;

    const query = searchQuery.trim().toLowerCase();
    const filteredItems = query
      ? group.items.filter((item) => item.q.toLowerCase().includes(query))
      : group.items;

    if (filteredItems.length === 0) return null;
    return { ...group, items: filteredItems };
  }).filter(Boolean) as FaqCategory[];

  const totalVisible = filteredData.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <main className="min-h-screen bg-[#F5F3FF]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-16 px-4">
        {/* Background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(167,139,250,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Sparkle dots */}
        {[
          { top: "18%", left: "8%", size: 6 },
          { top: "30%", left: "92%", size: 4 },
          { top: "60%", left: "5%", size: 3 },
          { top: "70%", left: "95%", size: 5 },
        ].map((dot, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#A78BFA] opacity-30"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
            }}
            aria-hidden="true"
          />
        ))}

        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EDE9FE] bg-white text-[#7C3AED] text-xs font-semibold mb-6 shadow-[0_1px_4px_rgba(124,58,237,0.08)]">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Help Center
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight text-balance mb-4">
              Frequently Asked Questions
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[#6B7280] text-lg leading-relaxed text-pretty mb-10">
              Everything you need to know about Builder by HotCode AI.
            </p>
          </Reveal>

          {/* Search */}
          <Reveal delay={0.15}>
            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#EDE9FE] bg-white text-sm text-[#111827] placeholder-[#9CA3AF] shadow-[0_1px_3px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#A78BFA] transition-all duration-200"
                aria-label="Search FAQ questions"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Category Tabs ── */}
      <section className="px-4 pb-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                    activeCategory === cat
                      ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-[0_2px_8px_rgba(124,58,237,0.3)]"
                      : "bg-white text-[#6B7280] border-[#EDE9FE] hover:border-[#A78BFA] hover:text-[#7C3AED]"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          {filteredData.length === 0 ? (
            <Reveal>
              <div className="text-center py-16">
                <p className="text-[#6B7280] text-base">
                  No questions match your search. Try a different term.
                </p>
              </div>
            </Reveal>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              {filteredData.map((group) => (
                <motion.div key={group.category} variants={itemVariants}>
                  {/* Category heading */}
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] mb-4 pl-1">
                    {group.category}
                  </h2>
                  <div className="space-y-3">
                    {group.items.map((item) => {
                      const key = `${group.category}::${item.q}`;
                      return (
                        <AccordionItem
                          key={key}
                          item={item}
                          isOpen={!!openItems[key]}
                          onToggle={() => toggleItem(key)}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Result count when searching */}
          {searchQuery.trim() && totalVisible > 0 && (
            <p className="text-center text-xs text-[#9CA3AF] mt-8">
              Showing {totalVisible} result{totalVisible !== 1 ? "s" : ""} for &ldquo;{searchQuery.trim()}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="px-4 pb-24">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl border border-[#EDE9FE] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(124,58,237,0.10)] px-8 py-12">
            <div className="w-12 h-12 rounded-xl bg-[#EDE9FE] flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-5 h-5 text-[#7C3AED]" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827] tracking-tight mb-2">
              Still have questions?
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed mb-8">
              Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold shadow-[0_2px_8px_rgba(124,58,237,0.3)] hover:bg-[#6D28D9] hover:shadow-[0_4px_16px_rgba(124,58,237,0.4)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/50"
              >
                Contact Support
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#EDE9FE] bg-white text-[#7C3AED] text-sm font-semibold hover:border-[#A78BFA] hover:bg-[#F5F3FF] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/30"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
