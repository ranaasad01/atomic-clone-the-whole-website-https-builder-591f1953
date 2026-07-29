"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, Code2 as Github } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

export default function SignInPage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError(t("signin.errorEmail"));
      return;
    }
    if (!password.trim()) {
      setError(t("signin.errorPassword"));
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-[var(--brand-purple)]/10 blur-[120px]" />
      </div>

      {/* Floating dots decoration */}
      {[
        { top: "8%", left: "12%", size: 6 },
        { top: "15%", left: "80%", size: 4 },
        { top: "70%", left: "6%", size: 5 },
        { top: "80%", left: "88%", size: 4 },
        { top: "40%", left: "92%", size: 3 },
        { top: "55%", left: "3%", size: 3 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full bg-[var(--brand-purple)]/30"
          style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <Reveal className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-purple)] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <span className="text-lg font-bold text-[var(--text-primary)]">{t("signin.brand")}</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_32px_-8px_rgba(0,0,0,0.10)] p-8">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-1 tracking-tight">
            {t("signin.heading")}
          </h1>
          <p className="text-sm text-[var(--text-muted)] text-center mb-6">
            {t("signin.subheading")}
          </p>

          {/* OAuth buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="button"
              className="flex items-center justify-center gap-2.5 w-full py-2.5 px-4 rounded-xl border border-black/[0.08] bg-white text-sm font-medium text-[var(--text-primary)] hover:bg-gray-50 transition-all duration-200"
              onClick={() => {}}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              {t("signin.continueGoogle")}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="button"
              className="flex items-center justify-center gap-2.5 w-full py-2.5 px-4 rounded-xl border border-black/[0.08] bg-white text-sm font-medium text-[var(--text-primary)] hover:bg-gray-50 transition-all duration-200"
              onClick={() => {}}
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              {t("signin.continueGithub")}
            </motion.button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-black/[0.06]" />
            <span className="text-xs text-[var(--text-muted)]">{t("signin.orEmail")}</span>
            <div className="flex-1 h-px bg-black/[0.06]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-[var(--text-primary)]">
                {t("signin.emailLabel")}
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
                  aria-hidden="true"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("signin.emailPlaceholder")}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/[0.08] bg-gray-50 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-purple)]/30 focus:border-[var(--brand-purple)]/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-[var(--text-primary)]">
                  {t("signin.passwordLabel")}
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[var(--brand-purple)] hover:underline transition-all"
                >
                  {t("signin.forgotPassword")}
                </Link>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
                  aria-hidden="true"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("signin.passwordPlaceholder")}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-black/[0.08] bg-gray-50 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-purple)]/30 focus:border-[var(--brand-purple)]/50 transition-all duration-200"
                />
                <button
                  type="button"
                  aria-label={showPassword ? t("signin.hidePassword") : t("signin.showPassword")}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Eye className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p role="alert" className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[var(--brand-purple)] text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 mt-1"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  {t("signin.signingIn")}
                </>
              ) : (
                <>
                  {t("signin.signInButton")}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </motion.button>

            {/* Demo bypass */}
            <button
              type="button"
              onClick={() => { window.location.href = "/"; }}
              className="text-xs text-center text-[var(--text-muted)] hover:text-[var(--brand-purple)] transition-colors underline underline-offset-2"
            >
              {t("signin.continueDemo")}
            </button>
          </form>
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-[var(--text-muted)] mt-6">
          {t("signin.noAccount")}{" "}
          <Link
            href="/pricing"
            className="text-[var(--brand-purple)] font-medium hover:underline transition-all"
          >
            {t("signin.signUpLink")}
          </Link>
        </p>

        {/* Trust badges */}
        <Reveal delay={0.15}>
          <div className="flex items-center justify-center gap-6 mt-8">
            {(["signin.trust1", "signin.trust2", "signin.trust3"] as const).map((key) => (
              <div key={key} className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.707 6.207l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L7 8.086l3.293-3.293a1 1 0 011.414 1.414z"/>
                </svg>
                {t(key)}
              </div>
            ))}
          </div>
        </Reveal>
      </Reveal>
    </main>
  );
}