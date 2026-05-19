import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio",
  description:
    "Selected product work, platform projects, and case studies from David Bahia. Full portfolio coming soon.",
  path: "/portfolio",
});

type PortfolioItem = {
  title: string;
  description?: string;
  /** Set to a public path, e.g. "/images/portfolio/project-1.jpg" */
  image?: string;
  alt?: string;
};

// Add image paths when ready — leave `image` empty to show a placeholder slot.
const portfolioItems: PortfolioItem[] = [
  {
    title: "Project 1",
    description: "Add a short caption when ready.",
    image: "",
    alt: "Project 1",
  },
  {
    title: "Project 2",
    description: "Add a short caption when ready.",
    image: "",
    alt: "Project 2",
  },
  {
    title: "Project 3",
    description: "Add a short caption when ready.",
    image: "",
    alt: "Project 3",
  },
  {
    title: "Project 4",
    description: "Add a short caption when ready.",
    image: "",
    alt: "Project 4",
  },
  {
    title: "Project 5",
    description: "Add a short caption when ready.",
    image: "",
    alt: "Project 5",
  },
  {
    title: "Project 6",
    description: "Add a short caption when ready.",
    image: "",
    alt: "Project 6",
  },
];

function PortfolioSlot({ item }: { item: PortfolioItem }) {
  const hasImage = Boolean(item.image?.trim());

  return (
    <article className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
      <div className="aspect-[4/3] bg-[#f7f4ef]">
        {hasImage ? (
          <img
            src={item.image}
            alt={item.alt ?? item.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-black/40">
            <span className="text-3xl" aria-hidden>
              +
            </span>
            <p className="text-sm font-medium">Image slot</p>
            <p className="text-xs">Add an image path in portfolio/page.tsx</p>
          </div>
        )}
      </div>

      <div className="p-5">
        <h2 className="text-lg font-semibold tracking-tight">{item.title}</h2>
        {item.description ? (
          <p className="mt-2 text-sm leading-6 text-black/60">
            {item.description}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#111111]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-black/50">
          Portfolio
        </p>

        <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
          Coming soon
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-8 text-black/65">
          Case studies and selected product work are on the way. Image slots
          below are ready whenever you add files under{" "}
          <code className="rounded bg-black/5 px-1.5 py-0.5 text-base">
            public/images/portfolio/
          </code>
          .
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <PortfolioSlot key={item.title} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
