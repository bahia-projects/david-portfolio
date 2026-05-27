import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import Link from "next/link";
import type { ReactNode } from "react";

const options: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: ReactNode) => (
      <p className="mb-6 text-lg leading-8">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node: unknown, children: ReactNode) => (
      <h2 className="mb-4 mt-10 text-3xl font-bold">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: unknown, children: ReactNode) => (
      <h3 className="mb-3 mt-8 text-2xl font-bold">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_node: unknown, children: ReactNode) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-lg leading-8">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: unknown, children: ReactNode) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg leading-8">{children}</ol>
    ),
    [BLOCKS.QUOTE]: (_node: unknown, children: ReactNode) => (
      <blockquote className="mb-6 border-l-4 border-black/20 pl-6 text-lg italic leading-8">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <Link
        href={typeof node.data.uri === "string" ? node.data.uri : "#"}
        className="underline underline-offset-4"
      >
        {children}
      </Link>
    ),
  },
};

type ContentfulRichTextProps = {
  document: Document;
};

export default function ContentfulRichText({ document }: ContentfulRichTextProps) {
  return <div>{documentToReactComponents(document, options)}</div>;
}
