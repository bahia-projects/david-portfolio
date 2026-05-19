import type { Metadata } from "next";
import Link from "next/link";
import ImageLightbox from "./components/ImageLightbox";
import JsonLd from "./components/JsonLd";
import { createPageMetadata, createPersonJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description:
    "Senior Product Manager building scalable platform systems, AI automations, workflow infrastructure, and modern web experiences for enterprise digital products.",
  path: "/",
  imageAlt: "David Bahia portfolio hero image",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#111111]">
      <JsonLd data={createPersonJsonLd()} />
      <nav className="border-b border-black/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-5xl font-extrabold tracking-tight">
            David Bahia
          </Link>

          <div className="flex gap-6 text-sm">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/portfolio" className="hover:underline">
              Portfolio
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto grid min-h-[40vh] max-w-6xl items-center gap-6 px-6 py-5 md:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-black/50">
            Product Platforms · AI Systems · Workflow Automation
          </p>

          <h1 className="max-w-4xl text-2xl font-semibold leading-[0.95] tracking-tight md:text-5xl">
            Moving platforms forward with scaleable systems, AI tools and integrations and modern web experiences.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-black/70">
            Senior Product Manager focused on internal platforms, AI automations and workflows, 
            and revenue-driving tools.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/about"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/80"
            >
              About Me
            </a>

            <a
              href="/resume.pdf"
              download="David-Bahia-Resume.pdf"
              className="rounded-full border border-black/20 px-6 py-3 text-sm font-medium transition hover:border-black"
            >
              Résumé
            </a>

            <a
              href="/contact"
              className="rounded-full border border-black/20 px-6 py-3 text-sm font-medium transition hover:border-black"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="grid gap-4">
  <div className="aspect-[5/4] overflow-hidden rounded-sm border bg-black/10 shadow-sm">
            <ImageLightbox
              src="/images/hero.jpg"
              alt="Portfolio hero image"
            />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div className="aspect-square overflow-hidden rounded-sm bg-black/10">
              <ImageLightbox
                src="/images/work-1.jpg"
                alt="Portfolio image"
              />
    </div>

    <div className="aspect-square overflow-hidden rounded-sm bg-black/10">
              <ImageLightbox
                src="/images/workflow-2.jpg"
                alt="Portfolio image"
              />
    </div>
  </div>
</div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-xl bg-black p-8 text-white md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
            Current focus
          </p>

          <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Moving platforms into the AI future.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            I&apos;m focused on integrating platforms and workflows with AI to create a more efficient and effective way to work.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 bg-white/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            What I work on
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Content Systems</h3>
              <p className="mt-4 leading-7 text-black/65">
                CMS tools, editorial workflows, assignment systems, publishing
                automation, and reporting interfaces.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Revenue Workflows</h3>
              <p className="mt-4 leading-7 text-black/65">
                Product work tied to publishing throughput, syndication,
                ad impressions, affiliate outcomes, and operational scale.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">AI-Assisted Tools</h3>
              <p className="mt-4 leading-7 text-black/65">
                Practical AI workflows for content operations, image generation,
                automation, and internal tooling.
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}