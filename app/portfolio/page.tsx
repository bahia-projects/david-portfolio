import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import PortfolioProjectCard, {
  type PortfolioImage,
  type PortfolioProjectDetails,
} from "../components/PortfolioProjectCard";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio",
  description: "Product and platform work by David Bahia.",
  path: "/portfolio",
});

type PortfolioProject = {
  title: string;
  summary: string;
  details: PortfolioProjectDetails;
  images: PortfolioImage[];
};

const emptyDetails: PortfolioProjectDetails = {
  problem: "",
  solution: "",
  outcome: "",
};

// Edit summary (card blurb) and details (problem / solution / outcome) for each project.
const portfolioProjects: PortfolioProject[] = [
  {
    title: "AI Auto Linking",
    summary:
      "Automated internal linking across CMS platforms to improve SEO and editorial efficiency.",
    details: {
      problem:
        "Editors spent significant time manually adding internal links across large content libraries.",
      solution:
        "Built AI-assisted linking workflows integrated into WordPress and Contentful publishing flows. This utalized LLM-powered phrase matching and OpenSearch taxonomy and algorithmic ranking to score and serve internal links on new content.",
      outcome:
        "Reduced manual linking time spent by over 90%, and improved link cosistency and performance across site content. Allowed for bulk removal or addition, category focus, and full admin over linking parameters.",
    },
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
    summary:
      "Syndication pipelines to distribute content across partner platforms and revenue channels.",
    details: {
      problem:
        "Content needed to reach multiple external partners from one CMS, without duplicating manual work.",
      solution:
        "Designed API-driven syndication features for video and article distribution.",
      outcome:
        "Expanded content reach and supported monetization through partner syndication.",
    },
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
    summary:
      "Assignment and notification systems to coordinate editorial teams across CMS tools.",
    details: {
      problem:
        "Editorial teams spent hours manually emailing writers with details on new and ongoing assignments. This was tracked using spreadsheets and relied on a fully manual approach, with no real time visibilty into the workflow.",
      solution:
        "Implemented assignee management and automated email notifications in WordPress and Contentful.",
      outcome:
        "Reduced manual assignment time by over 95% and full publishing throughput by over 50%",
    },
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
    summary:
      "Workflow mapping and automation to streamline content operations from idea to publish.",
    details: {
      problem:
        "Cross-team publishing processes were fragmented across tools with manual handoffs.",
      solution:
        "Mapped end-to-end workflows and automated key steps including Jira ticket and article draft creation.",
      outcome:
        "Reduced operational friction and increased throughput by over 50%.",
    },
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
    title: "CMS Architecture and Management",
    summary:
      "Building and maintaining the CMS architecture and infrastructure to support the editorial and revenue workflows.",
    details: {
      problem:
        "Multiple sites run from differnet CMS, with differing tools and workflows for each. This made it difficult to share content between sites, and to scale the editorial and revenue workflows.",
      solution:
        "Built a headless CMS architecture that allowed for content to be shared between sites, and to scale the editorial and revenue workflows.",
      outcome:
        "Reduced operational friction and increased throughput by over 75%.",
    },
    images: [
      {
        src: "/images/headless-cms.png",
        alt: "Headless CMS",
      },
      {
        src: "/images/work-1.jpg",
        alt: "Editing Queue",
      },
    ],
  },
  {
    title: "Monitization",
    summary: "Add a short summary for this project.",
    details: emptyDetails,
    images: [
      {
        src: "/images/offer-card.png",
        alt: "Offer card",
      },
    ],
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
              summary={project.summary}
              details={project.details}
              images={project.images}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
