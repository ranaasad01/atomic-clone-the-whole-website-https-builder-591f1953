"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ChevronDown, ChevronRight, Check, Sparkles, Code2, Eye, Download, ArrowRight, BookOpen, Clock, Star, Zap, Globe, FileText } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const TUTORIAL_STEPS = [
  {
    id: 1,
    number: "01",
    title: "Describe your vision",
    description:
      "Type what you want in plain English. Be as specific or as broad as you like. Mention your brand, style, colors, and content.",
    icon: FileText,
    color: "bg-violet-500",
    tips: [
      "Include your brand name and industry",
      "Mention the style you want (minimal, bold, colorful)",
      "Describe key sections you need",
      "Add any specific features or functionality",
    ],
    example:
      '"Build a modern SaaS landing page for a project management tool called TaskFlow. Use a dark theme with purple accents. Include a hero, features section, pricing, and testimonials."',
  },
  {
    id: 2,
    number: "02",
    title: "AI generates your site",
    description:
      "Our AI builds a complete, responsive website with real code in under a minute. Every component is production-ready.",
    icon: Sparkles,
    color: "bg-blue-500",
    tips: [
      "Generation takes under 60 seconds",
      "Full Next.js + TypeScript codebase",
      "Tailwind CSS for styling",
      "Mobile-first responsive design",
    ],
    example:
      "The AI writes clean, typed code with proper component structure, semantic HTML, and accessibility built in from the start.",
  },
  {
    id: 3,
    number: "03",
    title: "Preview and refine",
    description:
      "See your website come to life instantly. Request changes in plain English and watch the AI update your site in real time.",
    icon: Eye,
    color: "bg-emerald-500",
    tips: [
      "Live preview updates instantly",
      "Request changes in plain English",
      "Edit individual sections",
      "Compare before and after",
    ],
    example:
      '"Make the hero section taller and change the CTA button color to orange. Add a subtle gradient background."',
  },
  {
    id: 4,
    number: "04",
    title: "Export and deploy",
    description:
      "Download the full source code and deploy anywhere. One-click Vercel deployment or export as a ZIP for any host.",
    icon: Download,
    color: "bg-orange-500",
    tips: [
      "Download full source code",
      "One-click Vercel deployment",
      "Export as ZIP archive",
      "No vendor lock-in",
    ],
    example:
      "Your exported project is a standard Next.js app. Open it in VS Code, run npm install, and you are ready to go.",
  },
];

const VIDEO_CHAPTERS = [
  { time: "0:00", title: "Introduction and overview" },
  { time: "0:45", title: "Writing your first prompt" },
  { time: "2:10", title: "Understanding the generated output" },
  { time: "3:30", title: "Requesting changes and refinements" },
  { time: "5:00", title: "Exporting and deploying your site" },
  { time: "6:20", title: "Tips for better prompts" },
];

const PROMPT_TIPS = [
  {
    icon: Star,
    title: "Be specific about style",
    description:
      "Mention design styles like minimal, bold, dark, colorful, or reference sites you admire.",
    badge: "Style",
    badgeColor: "bg-violet-100 text-violet-700",
  },
  {
    icon: Globe,
    title: "Name your sections",
    description:
      "List the sections you need: hero, features, pricing, testimonials, FAQ, contact form.",
    badge: "Structure",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: Zap,
    title: "Include your brand",
    description:
      "Give your brand name, tagline, and key value propositions so the copy feels real.",
    badge: "Content",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Code2,
    title: "Specify functionality",
    description:
      "Mention interactive elements like carousels, accordions, modals, or forms you need.",
    badge: "Features",
    badgeColor: "bg-orange-100 text-orange-700",
  },
];

const EXAMPLE_PROMPTS = [
  {
    category: "Portfolio",
    color: "border-violet-200 bg-violet-50",
    tagColor: "bg-violet-100 text-violet-700",
    prompt:
      "Build a minimal portfolio for a UX designer named Sarah Kim. Dark background, white text, large project thumbnails, smooth hover animations. Include About, Work, and Contact sections.",
  },
  {
    category: "SaaS Landing",
    color: "border-blue-200 bg-blue-50",
    tagColor: "bg-blue-100 text-blue-700",
    prompt:
      "Create a SaaS landing page for an AI writing tool called Quill. Purple and white color scheme. Hero with animated text, 6 feature cards, 3-tier pricing, and a testimonials carousel.",
  },
  {
    category: "E-commerce",
    color: "border-emerald-200 bg-emerald-50",
    tagColor: "bg-emerald-100 text-emerald-700",
    prompt:
      "Design a product landing page for a premium coffee brand called Roast & Co. Warm browns and cream tones. Full-bleed hero image, product grid, subscription section, and Instagram feed.",
  },
];

const FAQ_ITEMS = [
  {
    question: "How long does it take to generate a website?",
    answer:
      "Most websites are generated in under 60 seconds. Complex sites with many sections may take up to 90 seconds. You will see a live progress indicator while the AI works.",
  },
  {
    question: "Can I edit the generated code?",
    answer:
      "Yes. You can export the full source code and edit it in any code editor. The output is standard Next.js with TypeScript and Tailwind CSS, so any developer can work with it immediately.",
  },
  {
    question: "What if I do not like the first result?",
    answer:
      "Simply describe what you want changed and the AI will update your site. You can refine as many times as you need within your credit allowance. Each refinement uses one credit.",
  },
  {
    question: "Do I need coding experience?",
    answer:
      "No coding experience is required to generate and preview your site. If you want to customize the exported code further, basic familiarity with React or Next.js is helpful but not required.",
  },
  {
    question: "Where can I deploy my site?",
    answer:
      "You can deploy to Vercel with one click directly from the builder. Alternatively, export the ZIP and deploy to Netlify, Railway, Render, or any host that supports Node.js.",
  },
];

export default function TutorialPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <main className="min-h-screen bg-[#f5f5fa]">
      {/* Hero */}
      <Reveal>
        <section className="pt-20 pb-16 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-white text-violet-600 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Getting Started Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-5 text-balance">
            Learn to build with{" "}
            <span className="text-[var(--brand-primary)]">AI</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
            Everything you need to go from idea to production-ready website in
            under a minute. Follow along with our step-by-step guide.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--brand-primary)] text-white font-semibold hover:opacity-90 transition-all duration-200"
            >
              Start Building <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/examples"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              View Examples
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-violet-400" /> 7 min read
            </span>
            <span className="flex items-center gap-1.5">
              <Play className="w-4 h-4 text-violet-400" /> Video included
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-violet-400" /> Beginner friendly
            </span>
          </div>
        </section>
      </Reveal>

      {/* Step-by-step walkthrough */}
      <Reveal>
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                How it works
              </h2>
              <p className="text-gray-500 text-lg">
                From idea to live website in four simple steps
              </p>
            </div>

            {/* Step tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {TUTORIAL_STEPS.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeStep === i
                      ? "bg-[var(--brand-primary)] text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      activeStep === i
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {step.id}
                  </span>
                  {step.title}
                </button>
              ))}
            </div>

            {/* Active step detail */}
            {TUTORIAL_STEPS[activeStep] && (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.1)] overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-8 md:p-10">
                    <div
                      className={`w-12 h-12 rounded-xl ${TUTORIAL_STEPS[activeStep].color} flex items-center justify-center mb-5`}
                    >
                      {(() => {
                        const Icon = TUTORIAL_STEPS[activeStep].icon;
                        return <Icon className="w-6 h-6 text-white" />;
                      })()}
                    </div>
                    <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">
                      Step {TUTORIAL_STEPS[activeStep].number}
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                      {TUTORIAL_STEPS[activeStep].title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-6">
                      {TUTORIAL_STEPS[activeStep].description}
                    </p>
                    <ul className="space-y-2.5">
                      {TUTORIAL_STEPS[activeStep].tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </span>
                          <span className="text-sm text-gray-600">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-950 p-8 md:p-10 flex flex-col justify-center">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                      Example
                    </div>
                    <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                      <p className="text-gray-300 text-sm leading-relaxed font-mono">
                        {TUTORIAL_STEPS[activeStep].example}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() =>
                          setActiveStep((p) =>
                            p > 0 ? p - 1 : TUTORIAL_STEPS.length - 1
                          )
                        }
                        className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm font-medium hover:bg-gray-700 transition-colors"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() =>
                          setActiveStep((p) =>
                            p < TUTORIAL_STEPS.length - 1 ? p + 1 : 0
                          )
                        }
                        className="px-4 py-2 rounded-lg bg-[var(--brand-primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Next step
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </Reveal>

      {/* Video tutorial */}
      <Reveal>
        <section className="py-16 px-4 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Watch the full tutorial
              </h2>
              <p className="text-gray-500 text-lg">
                A complete walkthrough from prompt to deployed website
              </p>
            </div>

            {/* Video player mock */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)] mb-8">
              <div className="relative bg-gray-950 aspect-video flex items-center justify-center">
                <img
                  src="/images/tutorial-video-preview.jpg"
                  alt="Tutorial video preview showing the Builder interface"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="relative z-10 w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-200"
                  aria-label="Play tutorial video"
                >
                  <Play className="w-8 h-8 text-[var(--brand-primary)] ml-1" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <div className="flex-1 h-1 bg-white/20 rounded-full">
                    <div className="w-0 h-full bg-[var(--brand-primary)] rounded-full" />
                  </div>
                  <span className="text-white/70 text-xs font-mono">
                    0:00 / 7:32
                  </span>
                </div>
              </div>
            </div>

            {/* Chapters */}
            <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-700">
                  Video chapters
                </span>
              </div>
              {VIDEO_CHAPTERS.map((chapter, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-gray-100 transition-colors text-left border-b border-gray-100 last:border-0"
                >
                  <span className="text-xs font-mono text-[var(--brand-primary)] font-semibold w-10 flex-shrink-0">
                    {chapter.time}
                  </span>
                  <span className="text-sm text-gray-700">{chapter.title}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Prompt writing tips */}
      <Reveal>
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Write better prompts
              </h2>
              <p className="text-gray-500 text-lg">
                The quality of your prompt directly shapes the quality of your
                site
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {PROMPT_TIPS.map((tip, i) => {
                const Icon = tip.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <span
                      className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 ${tip.badgeColor}`}
                    >
                      {tip.badge}
                    </span>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {tip.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Example prompts */}
      <Reveal>
        <section className="py-16 px-4 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Example prompts to try
              </h2>
              <p className="text-gray-500 text-lg">
                Copy any of these to get started immediately
              </p>
            </div>

            <div className="space-y-5">
              {EXAMPLE_PROMPTS.map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div
                    className={`rounded-2xl border p-6 ${item.color} transition-all duration-200 hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span
                          className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-3 ${item.tagColor}`}
                        >
                          {item.category}
                        </span>
                        <p className="text-gray-700 text-sm leading-relaxed font-mono">
                          &ldquo;{item.prompt}&rdquo;
                        </p>
                      </div>
                      <Link
                        href="/pricing"
                        className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--brand-primary)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                      >
                        Try this <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Common questions
              </h2>
              <p className="text-gray-500 text-lg">
                Quick answers to help you get started
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-semibold text-gray-900 text-sm">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="px-6 pb-5"
                    >
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <Link
                href="/faq"
                className="text-sm text-[var(--brand-primary)] font-semibold hover:underline inline-flex items-center gap-1"
              >
                View all FAQs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="py-16 px-4 pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl bg-[var(--brand-primary)] p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white"
                    style={{
                      left: `${(i * 37 + 10) % 100}%`,
                      top: `${(i * 53 + 15) % 100}%`,
                    }}
                  />
                ))}
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-5">
                  <Sparkles className="w-4 h-4" /> Start for free
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-balance">
                  Ready to build your first site?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
                  Start generating production-ready websites in seconds with AI.
                  No credit card required.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[var(--brand-primary)] font-bold text-base hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Start Building <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}