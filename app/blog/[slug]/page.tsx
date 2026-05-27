import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ContentfulRichText from "@/app/components/ContentfulRichText";
import Navbar from "@/app/components/Navbar";
import {
  formatBlogDate,
  getAllBlogPosts,
  getBlogPostBySlug,
} from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return createPageMetadata({
      title: "Post not found",
      description: "This blog post could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  const title = post.seoTitle ?? post.title;
  const description =
    post.seoDescription ?? post.summary ?? siteConfig.description;
  const image = post.featuredImage?.url ?? siteConfig.ogImage;

  return createPageMetadata({
    title,
    description,
    path: `/blog/${post.slug}`,
    image,
    imageAlt: post.featuredImage?.alt ?? post.title,
    absoluteTitle: Boolean(post.seoTitle),
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const publishedLabel = formatBlogDate(post.publishedDate);

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-black">
      <Navbar />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-10">
          {publishedLabel ? (
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-black/60">
              {publishedLabel}
            </p>
          ) : null}
          <h1 className="text-5xl font-bold leading-tight">{post.title}</h1>
          {post.summary ? (
            <p className="mt-6 text-xl leading-8 text-black/80">{post.summary}</p>
          ) : null}
        </header>

        {post.featuredImage ? (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-lg bg-black/5">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        ) : null}

        <ContentfulRichText document={post.body} />
      </article>
    </main>
  );
}
