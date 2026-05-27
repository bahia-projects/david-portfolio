import type { Metadata } from "next";
import Link from "next/link";
import ImageLightbox from "./components/ImageLightbox";
import NavLink from "./components/NavLink";
import ResumeDownloadLink from "./components/ResumeDownloadLink";
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
      <header className="relative h-56 w-full md:h-72">
        <img
          src="/images/hero-banner.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <nav className="relative z-10 w-full bg-transparent text-white">
          <div className="mx-auto flex max-w-6xl items-start justify-between px-6 py-5">
          <Link
            href="/"
            className="text-5xl font-extrabold tracking-tight md:text-9xl"
          >
            David Bahia
          </Link>

          <div className="flex flex-wrap gap-1 pt-2 text-base font-bold">
            <NavLink href="/about" variant="inverse">
              About
            </NavLink>
            <NavLink href="/portfolio" variant="inverse">
              Portfolio
            </NavLink>
            <NavLink href="/blog" variant="inverse">
              Blog
            </NavLink>
            <NavLink href="/contact" variant="inverse">
              Contact
            </NavLink>
          </div>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-6 px-6 py-12 md:grid-cols-[1.2fr_.8fr] md:py-16">
        <div>
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-black/50">
            Product Platforms · AI Systems · Workflow Automation
          </p>

          <h1 className="max-w-4xl text-2xl font-semibold leading-[0.95] tracking-tight md:text-5xl">
          Platform products that ship. AI workflows that stick. Systems built for how teams actually work.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-black/70">
          9+ years shipping platform products at Forbes, Moneylion, Gobankingrates, Red Ventures, and Healthline — from legacy migrations to AI-powered workflow tooling.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/about"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/80"
            >
              About Me
            </a>

            <ResumeDownloadLink className="rounded-full border border-black/20 px-6 py-3 text-sm font-medium transition hover:border-black" />

            <a
              href="/contact"
              className="rounded-full border border-black/20 px-6 py-3 text-sm font-medium transition hover:border-black"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="grid gap-4">
  <div className="group aspect-[5/4] overflow-hidden rounded-sm border border-black/10 bg-black/10 shadow-sm transition-shadow duration-300 hover:shadow-lg">
            <ImageLightbox
              src="/images/hero.jpg"
              alt="Portfolio hero image"
            />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div className="group aspect-square overflow-hidden rounded-sm border border-black/10 bg-black/10 shadow-sm transition-shadow duration-300 hover:shadow-lg">
              <ImageLightbox
                src="/images/work-1.jpg"
                alt="Portfolio image"
              />
    </div>

    <div className="group aspect-square overflow-hidden rounded-sm border border-black/10 bg-black/10 shadow-sm transition-shadow duration-300 hover:shadow-lg">
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
          Most AI in the workplace is still bolted on. I'm focused on building it into the platform layer — where it actually changes how teams operate, not just how fast they can prompt.
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