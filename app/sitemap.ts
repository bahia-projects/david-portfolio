import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const posts = await getAllBlogPosts();

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
    {
      url: new URL("/blog", siteConfig.url).toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
      lastModified: post.publishedDate
        ? new Date(post.publishedDate)
        : lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
