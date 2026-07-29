"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, MessageCircle as Twitter, Code2 as Github, MessageCircle, Send, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { useTranslations } from "next-intl";

const SUBJECTS = [
  "General Inquiry",
  "Technical Support",
  "Billing & Credits",
  "Feature Request",
  "Bug Report",
  "Partnership",
  "Other",
];

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email us",
    value: "hello@hotcode.ai",
    description: "Send us an email anytime",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: Clock,
    title: "Response time",
    value: "Within 24 hours",
    description: "We reply on business days",
    color: "bg-blue-100 text-blue-600",
  },
];

const SOCIAL_LINKS = [
  {
    icon: Twitter,
    label: "Twitter / X",
    handle: "@hotcodeai",
    href: "https://twitter.com/hotcodeai",
    color: "bg-sky-100 text-sky-600",
    hoverBg: "hover:bg-sky-50",
  },
  {
    icon: Github,
    label: "GitHub",
    handle: "hotcodeai",
    href: "https://github.com/hotcodeai",
    color: "bg-gray-100 text-gray-700",
    hoverBg: "hover:bg-gray-50",
  },
  {
    icon: MessageCircle,
    label: "Discord",
    handle: "Join our community",
    href: "https://discord.gg/hotcodeai",
    color: "bg-indigo-100 text-indigo-600",
    hoverBg: "hover:bg-indigo-50",
  },
];

export default function ContactPage() {
  const t = useTranslations();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.subject) newErrors.subject = "Please select a subject";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <main className="min-h-screen bg-[#f5f5fa]">
      {/* Page Header */}
      <Reveal>
        <section className="pt-20 pb-12 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-white text-violet-600 text-sm font-medium mb-6">
            <Mail className="w-3.5 h-3.5" />
            <span>{t("contact.badge")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            {t("contact.heading")}
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            {t("contact.subheading")}
          </p>
        </section>
      </Reveal>

      {/* Two-column layout */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left column */}
          <Reveal className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t("contact.leftHeading")}
              </h2>
              <p className="text-gray-500 leading-relaxed">
                {t("contact.leftSubheading")}
              </p>
            </div>

            {/* Contact info cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col gap-4"
            >
              {CONTACT_INFO.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-5 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] flex items-start gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                      {item.title}
                    </p>
                    <p className="text-gray-900 font-semibold text-sm">{item.value}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social links */}
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">
                {t("contact.socialLabel")}
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="flex flex-col gap-3"
              >
                {SOCIAL_LINKS.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeInUp}
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 p-3 rounded-xl border border-black/5 bg-white transition-all duration-200 ${s.hoverBg} group`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.color}`}>
                      <s.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-medium text-sm">{s.label}</p>
                      <p className="text-gray-400 text-xs">{s.handle}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-violet-500 transition-colors duration-200" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </Reveal>

          {/* Right column — Contact form */}
          <Reveal className="lg:col-span-3" delay={0.1}>
            <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_-12px_rgba(0,0,0,0.12)] p-8">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t("contact.successTitle")}
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-sm">
                    {t("contact.successMessage")}
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-violet-600 font-medium text-sm hover:underline"
                  >
                    {t("contact.sendAnother")}
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {t("contact.formTitle")}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    {t("contact.formSubtitle")}
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                          {t("contact.fieldName")} <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t("contact.placeholderName")}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-300 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 ${
                            errors.name ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs">{errors.name}</p>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                          {t("contact.fieldEmail")} <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t("contact.placeholderEmail")}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-300 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 ${
                            errors.email ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        {t("contact.fieldSubject")} <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 appearance-none bg-no-repeat ${
                          errors.subject ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
                        } ${formData.subject === "" ? "text-gray-300" : "text-gray-900"}`}
                      >
                        <option value="" disabled>
                          {t("contact.placeholderSubject")}
                        </option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p className="text-red-500 text-xs">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">
                        {t("contact.fieldMessage")} <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("contact.placeholderMessage")}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-300 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 resize-none ${
                          errors.message ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(124,58,237,0.3)]"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin w-4 h-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            />
                          </svg>
                          <span>{t("contact.sending")}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{t("contact.submitButton")}</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Banner */}
      <Reveal>
        <section className="mx-4 mb-16 rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 relative">
          {/* Decorative dots */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { top: "15%", left: "8%", size: 3 },
              { top: "70%", left: "5%", size: 2 },
              { top: "30%", left: "92%", size: 3 },
              { top: "80%", left: "88%", size: 2 },
              { top: "50%", left: "50%", size: 2 },
              { top: "20%", left: "60%", size: 2 },
              { top: "65%", left: "30%", size: 3 },
            ].map((dot, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  top: dot.top,
                  left: dot.left,
                  width: dot.size * 4,
                  height: dot.size * 4,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 py-20 px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("contact.ctaBadge")}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {t("contact.ctaHeading")}
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              {t("contact.ctaSubheading")}
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-violet-700 font-semibold text-sm hover:bg-white/90 transition-all duration-200 shadow-lg"
            >
              {t("contact.ctaButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}