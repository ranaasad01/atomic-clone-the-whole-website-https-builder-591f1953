"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin, Clock, MessageCircle as Twitter, Code2 as Github, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const CONTACT_TOPICS = [
  "General Inquiry",
  "Technical Support",
  "Billing & Credits",
  "Feature Request",
  "Partnership",
  "Other",
] as const;

type ContactTopic = (typeof CONTACT_TOPICS)[number];

interface FormState {
  name: string;
  email: string;
  topic: ContactTopic;
  message: string;
}

interface FormStatus {
  type: "idle" | "submitting" | "success" | "error";
  message: string;
}

export default function ContactPage() {
  const t = useTranslations();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    topic: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email address";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 20) newErrors.message = "Message must be at least 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus({ type: "submitting", message: "" });
    await new Promise((r) => setTimeout(r, 1400));
    setStatus({
      type: "success",
      message: "Thanks for reaching out! We'll get back to you within 24 hours.",
    });
    setForm({ name: "", email: "", topic: "General Inquiry", message: "" });
    setErrors({});
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* Hero */}
      <Reveal>
        <section className="pt-20 pb-12 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-purple-700 text-sm font-medium mb-6">
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            {t("contact.badge")}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-balance mb-4">
            {t("contact.hero.title")}
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed text-pretty">
            {t("contact.hero.subtitle")}
          </p>
        </section>
      </Reveal>

      {/* Main content: form + sidebar */}
      <section className="max-w-5xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Contact Form */}
        <Reveal className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] p-8">
            {status.type === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center text-center py-12 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{t("contact.form.successTitle")}</h2>
                <p className="text-gray-500 max-w-sm leading-relaxed">{status.message}</p>
                <button
                  onClick={() => setStatus({ type: "idle", message: "" })}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-[var(--brand-primary)] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  {t("contact.form.sendAnother")}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{t("contact.form.heading")}</h2>
                <p className="text-sm text-gray-400 mb-4">{t("contact.form.subheading")}</p>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("contact.form.nameLabel")}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder={t("contact.form.namePlaceholder")}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 ${
                      errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" aria-hidden="true" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("contact.form.emailLabel")}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder={t("contact.form.emailPlaceholder")}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 ${
                      errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" aria-hidden="true" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Topic */}
                <div>
                  <label htmlFor="contact-topic" className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("contact.form.topicLabel")}
                  </label>
                  <select
                    id="contact-topic"
                    value={form.topic}
                    onChange={(e) => handleChange("topic", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 outline-none transition-all focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 appearance-none cursor-pointer"
                  >
                    {CONTACT_TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("contact.form.messageLabel")}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder={t("contact.form.messagePlaceholder")}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 resize-none ${
                      errors.message ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" aria-hidden="true" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {status.type === "error" && (
                  <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {status.message}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status.type === "submitting"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-primary)] text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status.type === "submitting" ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      {t("contact.form.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {t("contact.form.submit")}
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </Reveal>

        {/* Sidebar */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Reveal delay={0.08}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">{t("contact.sidebar.contactInfo")}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="h-4 w-4 text-purple-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{t("contact.sidebar.emailLabel")}</p>
                    <a href="mailto:support@hotcode.ai" className="text-sm text-gray-800 font-medium hover:text-purple-600 transition-colors">
                      support@hotcode.ai
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{t("contact.sidebar.responseLabel")}</p>
                    <p className="text-sm text-gray-800 font-medium">{t("contact.sidebar.responseTime")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4 text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{t("contact.sidebar.locationLabel")}</p>
                    <p className="text-sm text-gray-800 font-medium">{t("contact.sidebar.location")}</p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] p-6">
              <h3 className="text-base font-bold text-gray-900 mb-1">{t("contact.sidebar.communityTitle")}</h3>
              <p className="text-sm text-gray-400 mb-4">{t("contact.sidebar.communitySubtitle")}</p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://twitter.com/hotcodeai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <Twitter className="h-4 w-4 text-sky-500" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {t("contact.sidebar.twitter")}
                  </span>
                </a>
                <a
                  href="https://github.com/hotcodeai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <Github className="h-4 w-4 text-gray-700" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {t("contact.sidebar.github")}
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-6 text-white">
              <h3 className="text-base font-bold mb-1">{t("contact.sidebar.faqTitle")}</h3>
              <p className="text-sm text-purple-100 mb-4 leading-relaxed">{t("contact.sidebar.faqSubtitle")}</p>
              <a
                href="/faq"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-semibold transition-colors"
              >
                {t("contact.sidebar.faqCta")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ teaser */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-4 pb-24">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-100 bg-purple-50 text-purple-600 text-xs font-medium mb-3">
                  <MessageSquare className="h-3 w-3" aria-hidden="true" />
                  {t("contact.faqTeaser.badge")}
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
                  {t("contact.faqTeaser.title")}
                </h2>
                <p className="text-gray-500 text-sm">{t("contact.faqTeaser.subtitle")}</p>
              </div>
              <motion.a
                href="/faq"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-primary)] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                {t("contact.faqTeaser.cta")}
              </motion.a>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}