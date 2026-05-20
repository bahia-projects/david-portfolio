import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import Navbar from "../components/Navbar";
import { createAboutPageJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about David Bahia, Senior Product Manager with 9+ years building scalable platform products, workflow infrastructure, and monetization systems at Gen Digital, Forbes Advisor, Red Ventures, and Healthline Media.",
  path: "/about",
});

export default function AboutPage() {
    return (
      <main className="min-h-screen bg-[#f7f4ef] text-black">
      <JsonLd data={createAboutPageJsonLd()} />
      <Navbar />
        <section className="max-w-3xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold mb-8">
            About
          </h1>
  
          <div className="space-y-6 text-lg leading-8">
            <p>
            I've spent most of my career inside the messy middle — between engineering, editorial, and the business — 
            figuring out how to turn legacy infrastructure into platforms people actually want to use. At Forbes Advisor, 
            that meant rebuilding content systems that supported tens of millions of readers. At Moneylion, it meant rethinking 
            how internal tools could be AI-native from the ground up.
            </p>
          </div>
        </section>
      </main>
    );
  }