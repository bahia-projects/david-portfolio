import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type { Block, Document, Inline, TopLevelBlock } from "@contentful/rich-text-types";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  type BlogInternalLink,
  splitTextWithInternalLinks,
} from "@/lib/blog-internal-links";

function subdocument(content: Block["content"]): Document {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: content as TopLevelBlock[],
  };
}

function createLinkifyRenderText(
  internalLinks: BlogInternalLink[],
  linkedSlugs: Set<string>,
) {
  const maxLinks = internalLinks.length;

  return (text: string) => {
    if (!text || internalLinks.length === 0) {
      return text;
    }

    const segments = splitTextWithInternalLinks(
      text,
      internalLinks,
      linkedSlugs,
      maxLinks,
    );

    if (segments.length === 1 && segments[0].type === "text") {
      return text;
    }

    return (
      <>
        {segments.map((segment, index) => {
          if (segment.type === "link") {
            return (
              <Link
                key={`${segment.slug}-${index}`}
                href={`/blog/${segment.slug}`}
                className="font-medium text-black underline decoration-black/35 underline-offset-4 transition hover:decoration-black"
              >
                {segment.value}
              </Link>
            );
          }

          return <span key={`text-${index}`}>{segment.value}</span>;
        })}
      </>
    );
  };
}

function buildRenderNodes(getPlainOptions: () => Options): NonNullable<Options["renderNode"]> {
  const renderPlainContent = (content: Block["content"]) =>
    documentToReactComponents(subdocument(content), getPlainOptions());

  const heading =
    (Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", className: string) =>
    (node: Block | Inline, _children: ReactNode) => (
      <Tag className={className}>
        {renderPlainContent((node as Block).content)}
      </Tag>
    );

  return {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="mb-6 text-lg leading-8">{children}</p>
    ),
    [BLOCKS.HEADING_1]: heading("h1", "mb-4 mt-10 text-4xl font-bold"),
    [BLOCKS.HEADING_2]: heading("h2", "mb-4 mt-10 text-3xl font-bold"),
    [BLOCKS.HEADING_3]: heading("h3", "mb-3 mt-8 text-2xl font-bold"),
    [BLOCKS.HEADING_4]: heading("h4", "mb-3 mt-6 text-xl font-bold"),
    [BLOCKS.HEADING_5]: heading("h5", "mb-2 mt-6 text-lg font-bold"),
    [BLOCKS.HEADING_6]: heading("h6", "mb-2 mt-4 text-base font-bold"),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-lg leading-8">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg leading-8">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (node, _children) => (
      <blockquote className="mb-6 border-l-4 border-black/20 pl-6 text-lg italic leading-8">
        {renderPlainContent((node as Block).content)}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <Link
        href={
          typeof (node as Inline).data.uri === "string" ? (node as Inline).data.uri : "#"
        }
        className="underline underline-offset-4"
      >
        {children}
      </Link>
    ),
  };
}

function createRichTextOptions(internalLinks: BlogInternalLink[]): Options {
  const linkedSlugs = new Set<string>();

  const plainOptions: Options = {
    renderText: (text) => text,
    renderNode: buildRenderNodes(() => plainOptions),
  };

  const linkOptions: Options = {
    renderText: createLinkifyRenderText(internalLinks, linkedSlugs),
    renderNode: buildRenderNodes(() => plainOptions),
  };

  return linkOptions;
}

type ContentfulRichTextProps = {
  document: Document;
  internalLinks?: BlogInternalLink[];
};

export default function ContentfulRichText({
  document,
  internalLinks = [],
}: ContentfulRichTextProps) {
  return (
    <div>{documentToReactComponents(document, createRichTextOptions(internalLinks))}</div>
  );
}
