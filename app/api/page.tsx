"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { Code, Key, Zap, Shield, Copy, Check, ChevronRight, Terminal, FileCode, Globe, Lock, ArrowRight, Activity, AlertCircle } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const ENDPOINTS = [
  {
    method: "POST",
    path: "/v1/generate",
    description: "Generate a complete website from a natural language prompt.",
    badge: "Core",
    badgeColor: "bg-violet-100 text-violet-700",
  },
  {
    method: "GET",
    path: "/v1/projects",
    description: "List all projects associated with your API key.",
    badge: "Projects",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    method: "GET",
    path: "/v1/projects/:id",
    description: "Retrieve a single project by its unique identifier.",
    badge: "Projects",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    method: "DELETE",
    path: "/v1/projects/:id",
    description: "Permanently delete a project and all associated assets.",
    badge: "Projects",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    method: "POST",
    path: "/v1/projects/:id/export",
    description: "Export a project as a downloadable ZIP archive.",
    badge: "Export",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    method: "GET",
    path: "/v1/credits",
    description: "Check your remaining credit balance and usage history.",
    badge: "Account",
    badgeColor: "bg-amber-100 text-amber-700",
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-emerald-100 text-emerald-700",
  POST: "bg-violet-100 text-violet-700",
  DELETE: "bg-red-100 text-red-700",
  PATCH: "bg-amber-100 text-amber-700",
};

const CODE_EXAMPLE = `curl -X POST https://api.builder.hotcode.ai/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A modern SaaS landing page for a project management tool",
    "style": "minimal-editorial",
    "pages": ["home", "pricing", "contact"]
  }'`;

const RESPONSE_EXAMPLE = `{
  "id": "proj_01hx9k2m3n4p5q6r7s8t",
  "status": "completed",
  "url": "https://preview.builder.hotcode.ai/proj_01hx9k2m3n4p5q6r7s8t",
  "pages": ["home", "pricing", "contact"],
  "credits_used": 3,
  "created_at": "2024-01-15T10:30:00Z"
}`;

const FEATURES = [
  {
    icon: Zap,
    title: "Fast Generation",
    description: "Websites generated in under 60 seconds via a single API call.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "All requests authenticated with scoped API keys and HTTPS.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: Globe,
    title: "REST API",
    description: "Standard REST endpoints with JSON request and response bodies.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Activity,
    title: "Usage Tracking",
    description: "Monitor credit consumption and request history in real time.",
    color: "bg-emerald-100 text-emerald-600",
  },
];

const RATE_LIMITS = [
  { plan: "Starter", requests: "60 / hour", concurrent: "2", priority: "Standard" },
  { plan: "Builder", requests: "300 / hour", concurrent: "5", priority: "Standard" },
  { plan: "Pro", requests: "1,000 / hour", concurrent: "10", priority: "High" },
  { plan: "Scale", requests: "Unlimited", concurrent: "Unlimited", priority: "Dedicated" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white/90 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-white/10"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function ApiPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* Hero */}
      <Reveal>
        <section className="pt-24 pb-16 px-4 text-center bg-gradient-to-b from-violet-50/60 to-[var(--bg-base)]">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-200 bg-white text-violet-700 text-sm font-medium mb-6">
              <Code className="h-3.5 w-3.5" />
              {t("apiPage.hero.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight text-balance mb-4">
              {t("apiPage.hero.title")}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed text-pretty mb-8 max-w-xl mx-auto">
              {t("apiPage.hero.subtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm"
              >
                {t("apiPage.hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm"
              >
                <FileCode className="h-4 w-4" />
                {t("apiPage.hero.docsLink")}
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Features */}
      <Reveal>
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={fadeInUp}
                  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${f.color}`}>
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{f.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Authentication */}
      <Reveal>
        <section className="py-16 px-4 bg-gray-50/60">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-violet-100 text-violet-600">
                <Key className="h-4.5 w-4.5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t("apiPage.auth.title")}</h2>
            </div>
            <p className="text-gray-500 mb-6 max-w-2xl">{t("apiPage.auth.description")}</p>
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.12),0_16px_48px_-12px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 text-white/40 text-xs font-mono">Authorization header</span>
                </div>
                <CopyButton text={`Authorization: Bearer YOUR_API_KEY`} />
              </div>
              <pre className="p-5 text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                <span className="text-white/50">Authorization: </span>
                <span className="text-violet-300">Bearer </span>
                <span className="text-amber-300">YOUR_API_KEY</span>
              </pre>
            </div>
            <div className="mt-4 flex items-start gap-2 text-sm text-gray-500">
              <Lock className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" />
              <span>{t("apiPage.auth.note")}</span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Quick Start */}
      <Reveal>
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-amber-100 text-amber-600">
                <Terminal className="h-4.5 w-4.5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t("apiPage.quickstart.title")}</h2>
            </div>
            <p className="text-gray-500 mb-8 max-w-2xl">{t("apiPage.quickstart.description")}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Request */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{t("apiPage.quickstart.requestLabel")}</p>
                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.12),0_16px_48px_-12px_rgba(0,0,0,0.2)] h-full">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                      <span className="ml-2 text-white/40 text-xs font-mono">cURL</span>
                    </div>
                    <CopyButton text={CODE_EXAMPLE} />
                  </div>
                  <pre className="p-5 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                    {CODE_EXAMPLE}
                  </pre>
                </div>
              </div>

              {/* Response */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{t("apiPage.quickstart.responseLabel")}</p>
                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.12),0_16px_48px_-12px_rgba(0,0,0,0.2)] h-full">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                      <span className="ml-2 text-white/40 text-xs font-mono">200 OK</span>
                    </div>
                    <CopyButton text={RESPONSE_EXAMPLE} />
                  </div>
                  <pre className="p-5 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                    {RESPONSE_EXAMPLE}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Endpoints */}
      <Reveal>
        <section className="py-16 px-4 bg-gray-50/60">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-100 text-blue-600">
                <Globe className="h-4.5 w-4.5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t("apiPage.endpoints.title")}</h2>
            </div>
            <p className="text-gray-500 mb-8 max-w-2xl">{t("apiPage.endpoints.description")}</p>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)]">
              {ENDPOINTS.map((ep, i) => (
                <div
                  key={ep.path}
                  className={`flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 ${
                    i < ENDPOINTS.length - 1 ? "border-b border-gray-100" : ""
                  } hover:bg-gray-50/60 transition-colors duration-150`}
                >
                  <span
                    className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-xs font-bold font-mono shrink-0 ${
                      METHOD_COLORS[ep.method] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <code className="text-sm font-mono text-gray-800 shrink-0">{ep.path}</code>
                  <span className="text-gray-500 text-sm flex-1">{ep.description}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${ep.badgeColor}`}>
                    {ep.badge}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/docs"
                className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors duration-200"
              >
                {t("apiPage.endpoints.viewFull")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Rate Limits */}
      <Reveal>
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600">
                <Activity className="h-4.5 w-4.5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t("apiPage.rateLimits.title")}</h2>
            </div>
            <p className="text-gray-500 mb-8 max-w-2xl">{t("apiPage.rateLimits.description")}</p>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)]">
              <div className="grid grid-cols-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <span>{t("apiPage.rateLimits.colPlan")}</span>
                <span>{t("apiPage.rateLimits.colRequests")}</span>
                <span>{t("apiPage.rateLimits.colConcurrent")}</span>
                <span>{t("apiPage.rateLimits.colPriority")}</span>
              </div>
              {RATE_LIMITS.map((row, i) => (
                <div
                  key={row.plan}
                  className={`grid grid-cols-4 px-5 py-4 text-sm ${
                    i < RATE_LIMITS.length - 1 ? "border-b border-gray-100" : ""
                  } hover:bg-gray-50/60 transition-colors duration-150`}
                >
                  <span className="font-semibold text-gray-800">{row.plan}</span>
                  <span className="text-gray-600 font-mono">{row.requests}</span>
                  <span className="text-gray-600 font-mono">{row.concurrent}</span>
                  <span className="text-gray-600">{row.priority}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-2 text-sm text-gray-500">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" />
              <span>{t("apiPage.rateLimits.note")}</span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="py-16 px-4 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-violet-800 px-8 py-14 text-center shadow-[0_4px_24px_rgba(109,40,217,0.3)]">
              {/* Decorative dots */}
              <div className="pointer-events-none absolute inset-0 opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white"
                    style={{
                      left: `${(i * 37 + 5) % 100}%`,
                      top: `${(i * 53 + 10) % 100}%`,
                    }}
                  />
                ))}
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-sm font-medium mb-5">
                  <Zap className="h-3.5 w-3.5" />
                  {t("apiPage.cta.badge")}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                  {t("apiPage.cta.title")}
                </h2>
                <p className="text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
                  {t("apiPage.cta.subtitle")}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-6 py-3 rounded-xl hover:bg-violet-50 transition-all duration-200 text-sm shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                  >
                    {t("apiPage.cta.primary")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/docs"
                    className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 text-sm"
                  >
                    {t("apiPage.cta.secondary")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}