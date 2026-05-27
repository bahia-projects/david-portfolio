import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import Navbar from "@/app/components/Navbar";
import { formatBlogDate, getAllBlogPosts } from "@/lib/blog";
import { createBlogPageJsonLd, createPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "Writing and notes from David Bahia on product management, platform systems, and AI.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-black">
      <JsonLd data={createBlogPageJsonLd(posts)} />
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="mb-4 text-5xl font-bold">Blog</h1>
        <p className="mb-12 text-lg leading-8 text-black/80">
          Notes on product, platforms, and building with AI.
        </p>

        {posts.length === 0 ? (
          <p className="text-lg text-black/70">No posts published yet.</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug} className="border-t border-black/10 pt-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  {post.thumbnail ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block shrink-0 overflow-hidden rounded-lg bg-black/5 sm:w-48"
                    >
                      <div className="relative aspect-[16/10] w-full sm:aspect-auto sm:h-28">
                        <Image
                          src={post.thumbnail.url}
                          alt={post.thumbnail.alt}
                          fill
                          className="object-cover transition duration-200 hover:scale-[1.02]"
                          sizes="(max-width: 640px) 100vw, 192px"
                        />
                      </div>
                    </Link>
                  ) : null}

                  <div className="min-w-0 flex-1">
                    {formatBlogDate(post.publishedDate) ? (
                      <p className="mb-2 text-sm text-black/60">
                        {formatBlogDate(post.publishedDate)}
                      </p>
                    ) : null}
                    <h2 className="text-2xl font-bold">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>
                    {post.summary ? (
                      <p className="mt-3 text-lg leading-8 text-black/80">{post.summary}</p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
