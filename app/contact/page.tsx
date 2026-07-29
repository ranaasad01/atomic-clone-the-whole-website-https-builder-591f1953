"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, MessageCircle, Send, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Static data ─────────────────────────────────────────────────────────────

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
    iconWrapClass: "bg-violet-100 text-violet-600",
  },
  {
    icon: Clock,
    title: "Response time",
    value: "Within 24 hours",
    description: "We reply on business days",
    iconWrapClass: "bg-blue-100 text-blue-600",
  },
];

const SOCIAL_LINKS = [
  {
    icon: MessageCircle,
    label: "Twitter / X",
    handle: "@hotcodeai",
    href: "https://twitter.com/hotcodeai",
    iconWrapClass: "bg-sky-100 text-sky-600",
  },
  {
    icon: MessageCircle,
    label: "GitHub",
    handle: "hotcodeai",
    href: "https://github.com/hotcodeai",
    iconWrapClass: "bg-gray-100 text-gray-700",
  },
  {
    icon: MessageCircle,
    label: "Discord",
    handle: "Join our community",
    href: "https://discord.gg/hotcodeai",
    iconWrapClass: "bg-indigo-100 text-indigo-600",
  },
];

const WHY_CONTACT = [
  "Technical support",
  "Billing questions",
  "Feature requests",
  "Partnership inquiries",
];

// ─── Input class helper ───────────────────────────────────────────────────────
const inputClass =
  "w-full rounded-xl border border-[#EDE9FE] px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all duration-200 placeholder:text-gray-400";

// ─── Page ────────────────────────────────────────────────────────────────────
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

  const validate = (): boolean => {
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <main className="min-h-screen bg-[#F5F3FF]">
      {/* ── Hero ── */}
      <Reveal>
        <section className="pt-24 pb-14 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-white text-violet-600 text-sm font-medium mb-6 shadow-sm">
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight text-balance mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed text-pretty">
            Have a question or need help? We&apos;d love to hear from you.
          </p>
        </section>
      </Reveal>

      {/* ── Two-column layout ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ── LEFT: Contact info ── */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Info cards */}
            {CONTACT_INFO.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="flex items-start gap-4 bg-white rounded-2xl border border-[#EDE9FE] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(124,58,237,0.08)]"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconWrapClass}`}
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {item.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-[#EDE9FE] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(124,58,237,0.08)]"
            >
              <p className="text-sm font-semibold text-gray-700 mb-4">
                Find us online
              </p>
              <div className="flex flex-col gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-[#EDE9FE] px-4 py-3 hover:border-[#7C3AED]/30 hover:bg-[#F5F3FF] transition-all duration-200 group"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${social.iconWrapClass}`}
                    >
                      <social.icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 leading-none">
                        {social.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {social.handle}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#7C3AED] transition-colors duration-200" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Why contact us */}
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl bg-[#EDE9FE] border border-violet-200 p-5"
            >
              <p className="text-sm font-semibold text-[#7C3AED] mb-3">
                Why contact us?
              </p>
              <ul className="flex flex-col gap-2">
                {WHY_CONTACT.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Contact form ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <div className="bg-white rounded-2xl border border-[#EDE9FE] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(124,58,237,0.10)] p-8">
              {isSuccess ? (
                /* ── Success state ── */
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8 text-green-600" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Message sent!
                  </h2>
                  <p className="text-gray-500 text-sm mb-8">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#EDE9FE] text-sm font-medium text-[#7C3AED] hover:bg-[#F5F3FF] transition-all duration-200"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Send us a message
                  </h2>

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select a subject</option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      className={`${inputClass} min-h-[140px] resize-y`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_2px_8px_rgba(124,58,237,0.30)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.40)]"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
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
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <Reveal>
        <section className="relative overflow-hidden bg-[#7C3AED] py-20 px-4">
          {/* Sparkle background dots */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {[
              { top: "12%", left: "8%", size: 3 },
              { top: "30%", left: "18%", size: 2 },
              { top: "60%", left: "5%", size: 4 },
              { top: "80%", left: "22%", size: 2 },
              { top: "15%", right: "10%", size: 3 },
              { top: "45%", right: "6%", size: 2 },
              { top: "70%", right: "18%", size: 4 },
              { top: "88%", right: "30%", size: 2 },
            ].map((star, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  top: star.top,
                  left: (star as { left?: string }).left,
                  right: (star as { right?: string }).right,
                  width: star.size,
                  height: star.size,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Free to get started</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-balance mb-8">
              Start building for free
            </h2>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-white text-[#7C3AED] font-semibold px-7 py-3.5 rounded-xl hover:bg-[#F5F3FF] transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.20)] text-sm"
            >
              Start Building Free
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
