# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
clone the whole website https://builder.hotcode.ai

## Goal
Build a pixel-perfect visual clone of builder.hotcode.ai — an AI website generator SaaS — with Home, Pricing, Examples, FAQ, and Contact pages using Next.js 14, TypeScript, and Tailwind CSS.

## Project type
landing-page

## Design system — match this exactly
- Color tokens: `--background: #F5F3FF`, `--foreground: #111827`, `--muted: #6B7280`, `--primary: #7C3AED`, `--accent: #A78BFA`, `--border: #EDE9FE`
- Fonts: Inter

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`apiPage`, `changelog`, `contact`, `cta`, `cta-banner`, `docs`, `examples`, `faq`, `faqTeaser`, `features`, `finalCta`, `footer`, `hero`, `howItWorks`, `nav`, `pricing`, `pricingPage`, `signin`, `tutorial`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
