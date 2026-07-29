export interface NavLink {
  label: string;
  href: string;
  key: string;
  isButton?: boolean;
  isSecondary?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Pricing", href: "/pricing", key: "pricing" },
  { label: "Examples", href: "/examples", key: "examples" },
  { label: "FAQ", href: "/faq", key: "faq" },
  { label: "Contact Us", href: "/contact", key: "contact" },
];

export const authLinks: NavLink[] = [
  { label: "Sign In", href: "/signin", key: "signin", isSecondary: true },
  { label: "Start Building", href: "/pricing", key: "startBuilding", isButton: true },
];

export const APP_NAME = "Builder by HotCode AI";
export const APP_TAGLINE = "Turn any idea into a production-ready website in seconds.";
export const APP_SHORT_NAME = "Builder";

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Home", href: "/" },
      { label: "Pricing", href: "/pricing" },
      { label: "Examples", href: "/examples" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Tutorial", href: "/tutorial" },
      { label: "Blog", href: "/blog" },
      { label: "API Reference", href: "/api" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export const socialLinks = [
  { label: "Twitter / X", href: "https://twitter.com/hotcodeai" },
  { label: "GitHub", href: "https://github.com/hotcodeai" },
  { label: "Discord", href: "https://discord.gg/hotcodeai" },
];