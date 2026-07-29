"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const FAQ_ITEMS = [
  {
    category: "Getting Started",
    question: "What is Builder by HotCode AI?",
    answer:
      "Builder by HotCode AI is an AI-powered website generator that turns plain English descriptions into production-ready websites in seconds. You describe your vision, and our AI builds a complete, responsive website with clean TypeScript code, modern design, and full responsiveness.",
  },
  {
    category: "Getting Started",
    question: "Do I need coding experience to use Builder?",
    answer:
      "No coding experience is required. Simply describe what you want in plain English and our AI handles all the code. However, if you are a developer, you can also export the full source code and customize it however you like.",
  },
  {
    category: "Getting Started",
    question: "How long does it take to generate a website?",
    answer:
      "Most websites are generated in under 60 seconds. Complex sites with many sections may take slightly longer, but you will typically have a live preview ready within a minute of submitting your prompt.",
  },
  {
    category: "Credits & Billing",
    question: "How does the credit system work?",
    answer:
      "Each website generation costs 1 credit. You start with 50 free credits every month, which renew automatically. If you need more, you can purchase credit packs starting at $10 for 100 credits. Credits never expire, so you can use them at your own pace.",
  },
  {
    category: "Credits & Billing",
    question: "Do unused credits roll over?",
    answer:
      "Purchased credits never expire and roll over indefinitely. Free monthly credits reset each month and do not carry over, so make sure to use them before your billing cycle renews.",
  },
  {
    category: "Credits & Billing",
    question: "Is there a free plan?",
    answer:
      "Yes. Every account starts on the free Starter plan, which includes 50 credits per month at no cost. No credit card is required to get started. You can upgrade to a paid plan at any time for more credits and additional features.",
  },
  {
    category: "Credits & Billing",
    question: "Can I get a refund?",
    answer:
      "We offer refunds on unused purchased credits within 14 days of purchase. Free credits are not refundable. Please contact our support team at support@hotcode.ai to request a refund.",
  },
  {
    category: "Features & Output",
    question: "What kind of websites can I build?",
    answer:
      "You can build virtually any type of website: landing pages, portfolios, SaaS marketing sites, e-commerce storefronts, blogs, dashboards, and more. Our AI is trained on a wide variety of website types and design patterns.",
  },
  {
    category: "Features & Output",
    question: "What technology stack does the generated code use?",
    answer:
      "All generated websites use Next.js 14 with the App Router, TypeScript, and Tailwind CSS. The output is clean, typed, production-ready code that you can deploy directly to Vercel or any other hosting provider.",
  },
  {
    category: "Features & Output",
    question: "Can I export and own the source code?",
    answer:
      "Absolutely. With any paid credit pack, you can download the full source code of your generated website. The code is yours to keep, modify, and deploy anywhere. There are no ongoing licensing fees.",
  },
  {
    category: "Features & Output",
    question: "Can I edit the generated website after it is created?",
    answer:
      "Yes. You can re-prompt the AI to make changes, or you can export the source code and edit it directly in your own editor. The live preview updates in real time as you iterate.",
  },
  {
    category: "Deployment",
    question: "How do I deploy my generated website?",
    answer:
      "You can deploy directly to Vercel with one click from within the Builder interface. Alternatively, export the source code and deploy to any platform that supports Next.js, including Netlify, Railway, Render, or your own server.",
  },
  {
    category: "Deployment",
    question: "Do I need a Vercel account to deploy?",
    answer:
      "A Vercel account is required for one-click Vercel deployment, but it is free to create. You can also export the code and deploy to any other platform without a Vercel account.",
  },
  {
    category: "Privacy & Security",
    question: "Is my data and prompt information kept private?",
    answer:
      "Yes. Your prompts and generated websites are private to your account by default. We do not share your data with third parties or use it to train our models without your explicit consent.",
  },
  {
    category: "Privacy & Security",
    question: "Who owns the websites I generate?",
    answer:
      "You own all websites you generate using Builder. The generated code and design are yours to use commercially, modify, and distribute as you see fit.",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(FAQ_ITEMS.map((f) => f.category)))];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((f) => f.category === activeCategory);

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* Hero */}
      <Reveal>
        <section className="pt-20 pb-12 text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-sm font-medium mb-6">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Help Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know about Builder. Can&apos;t find an answer?{" "}
            <Link href="/contact" className="text-[var(--brand-primary)] hover:underline font-medium">
              Contact us
            </Link>
            .
          </p>
        </section>
      </Reveal>

      {/* Category Filter */}
      <Reveal delay={0.05}>
        <section className="pb-10 px-4">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
                  activeCategory === cat
                    ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[var(--brand-primary)]/40 hover:text-[var(--brand-primary)]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Accordion */}
      <Reveal delay={0.1}>
        <section className="pb-24 px-4">
          <motion.div
            className="max-w-3xl mx-auto divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((item, i) => (
              <motion.div key={`${item.category}-${item.question}`} variants={fadeInUp}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-150"
                  aria-expanded={openIndex === i}
                >
                  <div className="flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)] mb-1 block">
                      {item.category}
                    </span>
                    <span className="font-semibold text-gray-900 text-base leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0 transition-transform duration-300",
                      openIndex === i && "rotate-180 text-[var(--brand-primary)]"
                    )}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={
                    openIndex === i
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="max-w-3xl mx-auto text-center py-16 text-gray-400">
              No questions found in this category.
            </div>
          )}
        </section>
      </Reveal>

      {/* Still have questions CTA */}
      <Reveal delay={0.05}>
        <section className="pb-24 px-4">
          <div className="max-w-3xl mx-auto rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-purple-700 p-px shadow-[0_8px_32px_-8px_rgba(109,40,217,0.4)]">
            <div className="rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-purple-700 px-8 py-12 text-center relative overflow-hidden">
              {/* Decorative stars */}
              {[
                { top: "15%", left: "8%", size: 4 },
                { top: "70%", left: "5%", size: 3 },
                { top: "25%", right: "10%", size: 5 },
                { top: "75%", right: "8%", size: 3 },
                { top: "50%", left: "20%", size: 2 },
                { top: "40%", right: "22%", size: 2 },
              ].map((star, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    top: star.top,
                    left: "left" in star ? star.left : undefined,
                    right: "right" in star ? star.right : undefined,
                    width: star.size,
                    height: star.size,
                  }}
                />
              ))}

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-sm font-medium mb-5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Still have questions?</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                We&apos;re here to help
              </h2>
              <p className="text-white/75 text-base mb-8 max-w-md mx-auto leading-relaxed">
                Can&apos;t find what you&apos;re looking for? Our team is happy to answer any questions you have about Builder.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg"
              >
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}