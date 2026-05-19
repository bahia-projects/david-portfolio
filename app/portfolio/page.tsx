import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio",
  description: "Product and platform work by David Bahia.",
  path: "/portfolio",
});

// Add image paths when ready, e.g. "/images/portfolio/01.jpg"
const slotImages = ["", "", "", "", "", ""];

function ImageSlot({ src }: { src: string }) {
  return (
    <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-black/10 bg-[#f7f4ef]">
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <div
          className="flex h-full items-center justify-center text-3xl text-black/25"
          aria-hidden
        >
          +
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#111111]">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
          Portfolio
        </h1>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {slotImages.map((src, index) => (
            <ImageSlot key={index} src={src} />
          ))}
        </div>
      </section>
    </main>
  );
}
