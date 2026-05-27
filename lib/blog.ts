import type { Document } from "@contentful/rich-text-types";
import type { Entry } from "contentful";
import { getContentfulClient, isContentfulConfigured } from "@/lib/contentful";

export const BLOG_POST_CONTENT_TYPE = "blogPost";

type ContentfulAsset = {
  fields?: {
    title?: string;
    file?: {
      url?: string;
      details?: {
        image?: {
          width?: number;
          height?: number;
        };
      };
    };
  };
};

type BlogPostFields = {
  title?: string;
  slug?: string;
  summary?: string;
  body?: Document;
  featuredImage?: ContentfulAsset;
  publishedDate?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  summary?: string;
  body: Document;
  publishedDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
};

function assetUrl(url: string): string {
  return url.startsWith("//") ? `https:${url}` : url;
}

function mapBlogPostEntry(entry: Entry): BlogPost | null {
  const {
    title,
    slug,
    summary,
    body,
    featuredImage,
    publishedDate,
    seoTitle,
    seoDescription,
  } = entry.fields as BlogPostFields;
  if (!title || !slug || !body) {
    return null;
  }

  const imageFile = featuredImage?.fields?.file;
  const imageDetails = imageFile?.details?.image;

  return {
    slug,
    title,
    summary,
    body,
    publishedDate,
    seoTitle,
    seoDescription,
    featuredImage: imageFile?.url
      ? {
          url: assetUrl(imageFile.url),
          alt: featuredImage?.fields?.title ?? title,
          width: imageDetails?.width,
          height: imageDetails?.height,
        }
      : undefined,
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!isContentfulConfigured()) {
    return [];
  }

  const client = getContentfulClient();
  const { items } = await client.getEntries({
    content_type: BLOG_POST_CONTENT_TYPE,
    order: ["-fields.publishedDate"],
    include: 2,
  });

  return items
    .map((entry) => mapBlogPostEntry(entry))
    .filter((post): post is BlogPost => post !== null);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isContentfulConfigured()) {
    return null;
  }

  const client = getContentfulClient();
  const { items } = await client.getEntries({
    content_type: BLOG_POST_CONTENT_TYPE,
    "fields.slug": slug,
    limit: 1,
    include: 2,
  });

  const entry = items[0];
  if (!entry) {
    return null;
  }

  return mapBlogPostEntry(entry);
}

export function formatBlogDate(dateString?: string): string | undefined {
  if (!dateString) {
    return undefined;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateString));
}
