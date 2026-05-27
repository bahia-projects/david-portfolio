function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "David Bahia",
  tagline: "Product Management and AI Innovation",
  description:
    "Senior Product Manager focused on platform systems, AI automation, workflow infrastructure, and revenue-driving digital products.",
  url: getSiteUrl(),
  locale: "en_US",
  ogImage: "/images/hero-banner.png",
  email: "davidhbahia@gmail.com",
  phone: "+1-415-937-8585",
  linkedIn: "https://www.linkedin.com/in/david-bahia/",
  location: {
    name: "Portland, Oregon",
    addressLocality: "Portland",
    addressRegion: "OR",
    addressCountry: "US",
  },
  keywords: [
    "David Bahia",
    "product manager",
    "platform products",
    "AI automation",
    "workflow systems",
    "content systems",
    "product leadership",
    "Portland",
    "blog",
  ],
} as const;
