"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, Tag, User, ChevronRight, Sparkles, Code2, Zap, Globe, BookOpen } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const BLOG_POSTS = [
  {
    id: 1,
    slug: "build-websites-with-ai-in-seconds",
    title: "Build Production-Ready Websites with AI in Seconds",
    excerpt: "Discover how Builder by HotCode AI transforms plain English descriptions into fully functional, production-ready websites with clean TypeScript code and modern design.",
    category: "Product",
    author: "HotCode Team",
    date: "2024-12-15",
    readTime: "5 min read",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c92d8ad8fa2f434aa93c5bf63e2129db.webp",
    featured: true,
    tags: ["AI", "Web Development", "No-Code"],
  },
  {
    id: 2,
    slug: "nextjs-app-router-best-practices",
    title: "Next.js App Router: Best Practices for 2024",
    excerpt: "A deep dive into the Next.js 14 App Router — server components, streaming, parallel routes, and how Builder leverages these patterns to generate optimal code.",
    category: "Engineering",
    author: "Alex Rivera",
    date: "2024-12-10",
    readTime: "8 min read",
    image: "https://github.blog/wp-content/uploads/2025/04/copilot-claude-prd-design.png?resize=1024%2C576",
    featured: false,
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    id: 3,
    slug: "from-prompt-to-production-workflow",
    title: "From Prompt to Production: The Builder Workflow",
    excerpt: "Walk through the complete journey of generating a website — from writing your first prompt to exporting clean code and deploying to Vercel in under a minute.",
    category: "Tutorial",
    author: "Sarah Kim",
    date: "2024-12-05",
    readTime: "6 min read",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e762e884255644eb8642a96b5f46c14e.png",
    featured: false,
    tags: ["Tutorial", "Deployment", "Vercel"],
  },
  {
    id: 4,
    slug: "tailwind-css-design-system-tips",
    title: "Building a Cohesive Design System with Tailwind CSS",
    excerpt: "Learn how to create consistent, scalable design systems using Tailwind CSS tokens, custom properties, and the patterns Builder uses to generate visually polished sites.",
    category: "Design",
    author: "Marcus Chen",
    date: "2024-11-28",
    readTime: "7 min read",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/faad65f4f75b4bdc8be87cacbe4dae0a.png",
    featured: false,
    tags: ["Tailwind CSS", "Design", "CSS"],
  },
  {
    id: 5,
    slug: "ai-code-generation-quality",
    title: "Why AI-Generated Code Quality Matters",
    excerpt: "Not all AI code generators are equal. We explore what separates production-ready output from throwaway prototypes — and how Builder ensures every line is clean, typed, and maintainable.",
    category: "Engineering",
    author: "HotCode Team",
    date: "2024-11-20",
    readTime: "9 min read",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/1b04659009154883af35bc988b60c2c3.jpg",
    featured: false,
    tags: ["AI", "Code Quality", "TypeScript"],
  },
  {
    id: 6,
    slug: "framer-motion-animations-guide",
    title: "Smooth Animations with Framer Motion in React",
    excerpt: "A practical guide to adding tasteful, performant animations to your React apps using Framer Motion — the same animation library Builder uses in every generated site.",
    category: "Tutorial",
    author: "Priya Patel",
    date: "2024-11-14",
    readTime: "10 min read",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/150f2b4efc634ea1b1f74ea45eb53d62.jpg",
    featured: false,
    tags: ["Framer Motion", "Animation", "React"],
  },
  {
    id: 7,
    slug: "landing-page-conversion-tips",
    title: "10 Landing Page Patterns That Actually Convert",
    excerpt: "Analyze the design patterns behind high-converting landing pages — hero composition, social proof placement, CTA hierarchy — and how to prompt Builder to generate them.",
    category: "Design",
    author: "Sarah Kim",
    date: "2024-11-07",
    readTime: "7 min read",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ff3bc8c2202f4505a4ab0610c27316a9.png",
    featured: false,
    tags: ["Design", "Conversion", "Landing Pages"],
  },
  {
    id: 8,
    slug: "typescript-strict-mode-benefits",
    title: "Why We Ship TypeScript Strict Mode by Default",
    excerpt: "Every site Builder generates uses TypeScript with strict mode enabled. Here is why that decision matters for long-term maintainability and how it catches bugs before they ship.",
    category: "Engineering",
    author: "Alex Rivera",
    date: "2024-10-30",
    readTime: "6 min read",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/5eef8d2737f3499f9116214530338de6.png",
    featured: false,
    tags: ["TypeScript", "Engineering", "Best Practices"],
  },
];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))] as const;

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Product: <Sparkles className="h-4 w-4" />,
  Engineering: <Code2 className="h-4 w-4" />,
  Tutorial: <BookOpen className="h-4 w-4" />,
  Design: <Globe className="h-4 w-4" />,
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = BLOG_POSTS.find((p) => p.featured);
  const filtered = BLOG_POSTS.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch && !p.featured;
  });

  return (
    <main className="min-h-screen bg-[#f5f5fa]">
      {/* Hero / Header */}
      <Reveal>
        <section className="pt-20 pb-12 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-200 bg-white text-purple-700 text-sm font-medium mb-6 shadow-sm">
            <BookOpen className="h-3.5 w-3.5" />
            Builder Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Insights, tutorials, and updates
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Learn how to build better websites faster. Tips on AI, design, engineering, and everything in between.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
            />
          </div>
        </section>
      </Reveal>

      {/* Category Filter */}
      <Reveal delay={0.05}>
        <section className="px-4 pb-10">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-600"
                }`}
              >
                {cat !== "All" && CATEGORY_ICONS[cat]}
                {cat}
              </button>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Featured Post */}
      {featuredPost && activeCategory === "All" && !searchQuery && (
        <Reveal delay={0.08}>
          <section className="px-4 pb-14">
            <div className="max-w-5xl mx-auto">
              <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_48px_-12px_rgba(0,0,0,0.1)] grid md:grid-cols-2"
                >
                  <div className="relative h-64 md:h-auto overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-semibold">
                        <Zap className="h-3 w-3" />
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                        {featuredPost.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-purple-700 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(featuredPost.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 group-hover:gap-2.5 transition-all">
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>
          </section>
        </Reveal>
      )}

      {/* Post Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <Reveal>
              <div className="text-center py-20">
                <Search className="h-10 w-10 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No articles found</p>
                <p className="text-gray-400 text-sm mt-1">Try a different search term or category.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="mt-6 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            </Reveal>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((post, i) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <motion.article
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_24px_-8px_rgba(0,0,0,0.08)] h-full flex flex-col"
                    >
                      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold border border-gray-100">
                            {CATEGORY_ICONS[post.category]}
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-purple-700 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <Reveal>
        <section className="px-4 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 p-10 text-center text-white shadow-xl shadow-purple-200">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 80%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/90 text-sm font-medium mb-5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Stay in the loop
                </div>
                <h2 className="text-3xl font-extrabold mb-3 tracking-tight">
                  Get the latest from Builder
                </h2>
                <p className="text-white/80 text-base mb-8 max-w-md mx-auto leading-relaxed">
                  New articles on AI, web development, and design delivered to your inbox. No spam, unsubscribe anytime.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
                >
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-white text-purple-700 font-semibold text-sm hover:bg-purple-50 transition-colors whitespace-nowrap flex items-center gap-1.5 justify-center"
                  >
                    Subscribe
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Bottom CTA */}
      <Reveal>
        <section className="px-4 pb-24 text-center">
          <p className="text-gray-500 text-sm mb-4">Ready to build your next website?</p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-200"
          >
            Start Building for Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </Reveal>
    </main>
  );
}