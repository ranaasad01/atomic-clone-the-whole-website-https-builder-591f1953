"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Zap, Code2, Globe, Download, ChevronRight, Search, FileText, Terminal, Settings, Star, ArrowRight, Check, Info, AlertCircle, Sparkles, Layout, GitBranch, FileCode } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const DOC_SECTIONS = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Zap,
    color: "bg-violet-500",
    articles: [
      { title: "Quick Start Guide", slug: "quick-start", readTime: "3 min" },
      { title: "Creating Your First Website", slug: "first-website", readTime: "5 min" },
      { title: "Understanding Credits", slug: "credits", readTime: "2 min" },
      { title: "Account Setup", slug: "account-setup", readTime: "4 min" },
    ],
  },
  {
    id: "prompting",
    label: "Writing Prompts",
    icon: Sparkles,
    color: "bg-blue-500",
    articles: [
      { title: "Prompt Best Practices", slug: "prompt-best-practices", readTime: "6 min" },
      { title: "Describing Your Brand", slug: "brand-description", readTime: "4 min" },
      { title: "Specifying Layout & Style", slug: "layout-style", readTime: "5 min" },
      { title: "Iterating on Results", slug: "iterating", readTime: "3 min" },
    ],
  },
  {
    id: "customization",
    label: "Customization",
    icon: Settings,
    color: "bg-emerald-500",
    articles: [
      { title: "Editing Generated Code", slug: "editing-code", readTime: "7 min" },
      { title: "Changing Colors & Fonts", slug: "colors-fonts", readTime: "4 min" },
      { title: "Adding Custom Sections", slug: "custom-sections", readTime: "5 min" },
      { title: "Responsive Design Tips", slug: "responsive", readTime: "6 min" },
    ],
  },
  {
    id: "deployment",
    label: "Export & Deploy",
    icon: Download,
    color: "bg-orange-500",
    articles: [
      { title: "Exporting Your Code", slug: "exporting", readTime: "3 min" },
      { title: "Deploying to Vercel", slug: "deploy-vercel", readTime: "5 min" },
      { title: "Deploying to Netlify", slug: "deploy-netlify", readTime: "5 min" },
      { title: "Custom Domain Setup", slug: "custom-domain", readTime: "6 min" },
    ],
  },
  {
    id: "api",
    label: "API Reference",
    icon: Code2,
    color: "bg-pink-500",
    articles: [
      { title: "Authentication", slug: "api-auth", readTime: "4 min" },
      { title: "Generate Endpoint", slug: "api-generate", readTime: "8 min" },
      { title: "Projects Endpoint", slug: "api-projects", readTime: "6 min" },
      { title: "Webhooks", slug: "api-webhooks", readTime: "5 min" },
    ],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    icon: AlertCircle,
    color: "bg-red-500",
    articles: [
      { title: "Common Errors", slug: "common-errors", readTime: "5 min" },
      { title: "Build Failures", slug: "build-failures", readTime: "4 min" },
      { title: "Preview Not Loading", slug: "preview-issues", readTime: "3 min" },
      { title: "Contact Support", slug: "support", readTime: "1 min" },
    ],
  },
];

const POPULAR_ARTICLES = [
  { title: "Quick Start Guide", section: "Getting Started", readTime: "3 min", slug: "quick-start" },
  { title: "Prompt Best Practices", section: "Writing Prompts", readTime: "6 min", slug: "prompt-best-practices" },
  { title: "Deploying to Vercel", section: "Export & Deploy", readTime: "5 min", slug: "deploy-vercel" },
  { title: "Understanding Credits", section: "Getting Started", readTime: "2 min", slug: "credits" },
  { title: "Editing Generated Code", section: "Customization", readTime: "7 min", slug: "editing-code" },
  { title: "API Authentication", section: "API Reference", readTime: "4 min", slug: "api-auth" },
];

const CODE_EXAMPLE = `// Generate a website via the Builder API
const response = await fetch("https://api.builder.hotcode.ai/v1/generate", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: "A modern SaaS landing page for a project management tool",
    style: "minimal-editorial",
    pages: ["home", "pricing", "contact"],
  }),
});

const { project_id, preview_url } = await response.json();
console.log("Preview:", preview_url);`;

export default function DocsPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("getting-started");

  const filteredSections = DOC_SECTIONS.map((section) => ({
    ...section,
    articles: section.articles.filter((a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((s) => s.articles.length > 0 || searchQuery === "");

  const activeDoc = DOC_SECTIONS.find((s) => s.id === activeSection) ?? DOC_SECTIONS[0];

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-purple-50/40 to-[var(--bg-base)] pt-20 pb-16 text-center">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-violet-400/20"
                style={{
                  width: `${6 + (i % 5) * 4}px`,
                  height: `${6 + (i % 5) * 4}px`,
                  top: `${10 + (i * 17) % 80}%`,
                  left: `${5 + (i * 23) % 90}%`,
                }}
              />
            ))}
          </div>
          <div className="relative mx-auto max-w-3xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-1.5 text-sm text-violet-700 mb-6 shadow-sm">
              <BookOpen className="h-4 w-4" />
              <span>{t("docs.hero.badge")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              {t("docs.hero.title")}
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              {t("docs.hero.subtitle")}
            </p>
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("docs.search.placeholder")}
                className="w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 py-3.5 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Popular Articles */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t("docs.popular.title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_ARTICLES.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={`/docs/${article.slug}`}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(109,40,217,0.10)] hover:border-violet-200 transition-all duration-200 group"
                >
                  <FileText className="h-5 w-5 text-violet-500 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 group-hover:text-violet-700 transition-colors text-sm leading-snug">
                      {article.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {article.section} · {article.readTime} read
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-violet-400 ml-auto shrink-0 mt-0.5 transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Main Docs Layout */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Reveal className="lg:w-64 shrink-0">
            <nav className="sticky top-24 rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 px-2">
                {t("docs.sidebar.sections")}
              </p>
              <ul className="space-y-1">
                {DOC_SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 text-left ${
                          isActive
                            ? "bg-violet-50 text-violet-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <span className={`${section.color} rounded-lg p-1.5 shrink-0`}>
                          <Icon className="h-3.5 w-3.5 text-white" />
                        </span>
                        {section.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Reveal>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <Reveal>
              <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-8 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`${activeDoc.color} rounded-xl p-2.5`}>
                    <activeDoc.icon className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{activeDoc.label}</h2>
                    <p className="text-sm text-gray-400">{activeDoc.articles.length} articles</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(searchQuery
                    ? filteredSections.find((s) => s.id === activeSection)?.articles ?? activeDoc.articles
                    : activeDoc.articles
                  ).map((article, i) => (
                    <motion.div
                      key={article.slug}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35, ease: "easeOut" }}
                      whileHover={{ x: 4 }}
                    >
                      <Link
                        href={`/docs/${article.slug}`}
                        className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 hover:bg-violet-50 hover:border-violet-200 px-4 py-3.5 transition-all duration-150 group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-gray-400 group-hover:text-violet-500 transition-colors" />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-violet-700 transition-colors">
                            {article.title}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0 ml-2">{article.readTime}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Quick Start Inline Preview */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-8 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-violet-500" />
                  <h3 className="text-lg font-bold text-gray-900">{t("docs.quickstart.title")}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-6">{t("docs.quickstart.subtitle")}</p>
                <ol className="space-y-5">
                  {[
                    {
                      step: "1",
                      title: t("docs.quickstart.step1.title"),
                      desc: t("docs.quickstart.step1.desc"),
                      color: "bg-violet-500",
                    },
                    {
                      step: "2",
                      title: t("docs.quickstart.step2.title"),
                      desc: t("docs.quickstart.step2.desc"),
                      color: "bg-blue-500",
                    },
                    {
                      step: "3",
                      title: t("docs.quickstart.step3.title"),
                      desc: t("docs.quickstart.step3.desc"),
                      color: "bg-emerald-500",
                    },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-4">
                      <span className={`${item.color} rounded-full h-8 w-8 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5`}>
                        {item.step}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-800">{item.title}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            {/* API Code Example */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-8 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="h-5 w-5 text-violet-500" />
                  <h3 className="text-lg font-bold text-gray-900">{t("docs.api.title")}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-5">{t("docs.api.subtitle")}</p>
                <div className="rounded-xl bg-gray-950 overflow-x-auto">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-xs text-white/40 font-mono">generate.ts</span>
                  </div>
                  <pre className="p-5 text-sm text-green-300 font-mono leading-relaxed overflow-x-auto whitespace-pre">
                    {CODE_EXAMPLE}
                  </pre>
                </div>
                <div className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-blue-700">{t("docs.api.note")}</p>
                </div>
              </div>
            </Reveal>

            {/* Feature Highlights */}
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">{t("docs.features.title")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Globe, color: "text-emerald-500", bg: "bg-emerald-50", title: t("docs.features.f1.title"), desc: t("docs.features.f1.desc") },
                    { icon: Code2, color: "text-blue-500", bg: "bg-blue-50", title: t("docs.features.f2.title"), desc: t("docs.features.f2.desc") },
                    { icon: Layout, color: "text-violet-500", bg: "bg-violet-50", title: t("docs.features.f3.title"), desc: t("docs.features.f3.desc") },
                    { icon: GitBranch, color: "text-orange-500", bg: "bg-orange-50", title: t("docs.features.f4.title"), desc: t("docs.features.f4.desc") },
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                      <span className={`${feat.bg} rounded-lg p-2 shrink-0 h-fit`}>
                        <feat.icon className={`h-4 w-4 ${feat.color}`} />
                      </span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{feat.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-8 py-14 text-center shadow-[0_8px_40px_rgba(109,40,217,0.35)]">
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/10"
                  style={{
                    width: `${8 + (i % 4) * 6}px`,
                    height: `${8 + (i % 4) * 6}px`,
                    top: `${5 + (i * 19) % 85}%`,
                    left: `${3 + (i * 27) % 94}%`,
                  }}
                />
              ))}
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 mb-5">
                <Star className="h-4 w-4" />
                <span>{t("docs.cta.badge")}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
                {t("docs.cta.title")}
              </h2>
              <p className="text-white/75 mb-8 max-w-md mx-auto leading-relaxed">
                {t("docs.cta.subtitle")}
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-violet-700 hover:bg-violet-50 transition-colors shadow-lg"
              >
                {t("docs.cta.button")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}