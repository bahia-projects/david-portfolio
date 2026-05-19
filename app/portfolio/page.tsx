import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import PortfolioProjectCard, {
  type PortfolioImage,
} from "../components/PortfolioProjectCard";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio",
  description: "Product and platform work by David Bahia.",
  path: "/portfolio",
});

type PortfolioProject = {
  title: string;
  images: PortfolioImage[];
};

// Edit titles and image paths here. Put files in public/images/portfolio/
const portfolioProjects: PortfolioProject[] = [
  {
    title: "AI Auto Linking",
    images: [
      {
        src: "/images/wordpress-links.png",
        alt: "AI auto linking in WordPress",
      },
      {
        src: "/images/Contentful-links.png",
        alt: "AI auto linking in Contentful",
      },
    ],
  },
  {
    title: "API's and Content Syndication",
    images: [
      {
        src: "/images/moneylion-video-syndication.png",
        alt: "Video Syndication",
      },
      {
        src: "/images/msn-gbr-syndication.png",
        alt: "GBR Syndication",
      },
    ],
  },
  {
    title: "Assignments and Notifications",
    images: [
      {
        src: "/images/Wp-assignment-notification.png",
        alt: "Assignment email notification in WordPress",
      },
      {
        src: "/images/Wordpress-assignees.png",
        alt: "Assignees in WordPress",
      },
      {
        src: "/images/Contentful-assignees.png",
        alt: "Assignees in Contentful",
      },
      {
        src: "/images/Contentful-assignment-notification.png",
        alt: "Assignment email notification in Contentful",
      },
    ],
  },
  {
    title: "Workflow Optimization and Automation",
    images: [
      {
        src: "/images/workflow-2.jpg",
        alt: "Jira Workflow",
      },
      {
        src: "/images/hero.jpg",
        alt: "Workflow mapping",
      },
      {
        src: "/images/jira-creation.png",
        alt: "Jira auto-post creation",
      },
    ],
  },
  {
    title: "Project 5",
    images: [],
  },
  {
    title: "Project 6",
    images: [],
  },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#111111]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
          Portfolio
        </h1>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project) => (
            <PortfolioProjectCard
              key={project.title}
              title={project.title}
              images={project.images}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
