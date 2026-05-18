import type { Metadata } from "next";
import { siteConfig } from "./site";

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path = "",
  image = siteConfig.ogImage,
  imageAlt = `${siteConfig.name} portfolio`,
  noIndex = false,
  absoluteTitle = false,
}: CreatePageMetadataOptions): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = new URL(canonicalPath, siteConfig.url).toString();
  const pageTitle = absoluteTitle
    ? title
    : title === siteConfig.name
      ? title
      : `${title} | ${siteConfig.name}`;

  return {
    title: absoluteTitle ? { absolute: pageTitle } : pageTitle,
    description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function createPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    jobTitle: siteConfig.tagline,
    description: siteConfig.description,
    image: new URL(siteConfig.ogImage, siteConfig.url).toString(),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.addressLocality,
      addressRegion: siteConfig.location.addressRegion,
      addressCountry: siteConfig.location.addressCountry,
    },
    sameAs: [siteConfig.linkedIn],
    knowsAbout: [
      "Product Management",
      "Platform Systems",
      "AI Automation",
      "Workflow Infrastructure",
      "Content Systems",
    ],
  };
}

export function createWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: "en-US",
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };
}

export function createAboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `About ${siteConfig.name}`,
    description:
      "Professional background of David Bahia, Senior Product Manager with experience across enterprise digital platforms.",
    url: new URL("/about", siteConfig.url).toString(),
    mainEntity: createPersonJsonLd(),
  };
}

export function createContactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${siteConfig.name}`,
    description:
      "Contact David Bahia for product leadership, platform systems, AI automation, and collaboration.",
    url: new URL("/contact", siteConfig.url).toString(),
    mainEntity: createPersonJsonLd(),
  };
}
