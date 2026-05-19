import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/about", siteConfig.url).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/portfolio", siteConfig.url).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/contact", siteConfig.url).toString(),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
