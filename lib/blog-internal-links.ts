import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, type Block, type Inline, type Text } from "@contentful/rich-text-types";

export type BlogInternalLink = {
  phrase: string;
  slug: string;
};

type PostForLinking = {
  slug: string;
  title: string;
  summary?: string;
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "been",
  "being",
  "but",
  "by",
  "can",
  "did",
  "do",
  "for",
  "from",
  "had",
  "has",
  "have",
  "he",
  "her",
  "his",
  "how",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "just",
  "more",
  "most",
  "my",
  "not",
  "of",
  "on",
  "or",
  "our",
  "she",
  "so",
  "than",
  "that",
  "the",
  "their",
  "them",
  "there",
  "they",
  "this",
  "to",
  "too",
  "up",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "will",
  "with",
  "you",
  "your",
]);

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildPhrasePattern(phrase: string): RegExp {
  const escaped = escapeRegex(phrase).replace(/\s+/g, "\\s+");
  return new RegExp(`(?<!\\w)(${escaped})(?!\\w)`, "i");
}

function getSignificantWords(text: string): string[] {
  return text
    .replace(/[^\w\s'-]/g, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 0 && !STOP_WORDS.has(word.toLowerCase()));
}

function phrasesFromText(text: string, { allowFullText = true }: { allowFullText?: boolean } = {}) {
  const phrases = new Set<string>();
  const trimmed = text.trim();

  if (allowFullText && trimmed.length >= 12 && trimmed.length <= 60) {
    phrases.add(trimmed);
  }

  const words = getSignificantWords(trimmed);

  for (let size = 3; size >= 2; size -= 1) {
    for (let index = 0; index <= words.length - size; index += 1) {
      phrases.add(words.slice(index, index + size).join(" "));
    }
  }

  for (const word of words) {
    if (word.length >= 5 || /^[A-Z]{2,}$/.test(word)) {
      phrases.add(word);
    }
  }

  return [...phrases].filter((phrase) => isLinkablePhrase(phrase));
}

function isLinkablePhrase(phrase: string): boolean {
  const trimmed = phrase.trim();
  if (trimmed.length < 3) return false;

  const words = trimmed.split(/\s+/);
  if (words.length >= 2) return true;
  if (/^[A-Z]{2,}$/.test(words[0])) return true;

  return words[0].length >= 8;
}

function phrasesForPost(post: PostForLinking): { phrase: string; score: number }[] {
  const candidates: { phrase: string; score: number }[] = [];

  for (const phrase of phrasesFromText(post.title)) {
    const wordCount = phrase.split(/\s+/).length;
    const isFullTitle = phrase.toLowerCase() === post.title.trim().toLowerCase();
    candidates.push({
      phrase,
      score: phrase.length * 8 + wordCount * 12 + (isFullTitle ? 80 : 0),
    });
  }

  if (post.summary) {
    for (const phrase of phrasesFromText(post.summary, { allowFullText: false })) {
      if (phrase.split(/\s+/).length < 2) continue;
      candidates.push({
        phrase,
        score: phrase.length * 5 + 20,
      });
    }
  }

  const byPhrase = new Map<string, number>();
  for (const candidate of candidates) {
    const key = candidate.phrase.toLowerCase();
    const existing = byPhrase.get(key);
    if (!existing || candidate.score > existing) {
      byPhrase.set(key, candidate.score);
    }
  }

  return [...byPhrase.entries()].map(([phrase, score]) => ({
    phrase: candidates.find((item) => item.phrase.toLowerCase() === phrase)?.phrase ?? phrase,
    score,
  }));
}

export function extractPlainText(document: Document): string {
  const parts: string[] = [];

  function walk(node: Block | Inline | Text) {
    if ("value" in node && typeof node.value === "string") {
      parts.push(node.value);
      return;
    }

    if ("content" in node && Array.isArray(node.content)) {
      for (const child of node.content) {
        walk(child as Block | Inline | Text);
      }
    }
  }

  for (const node of document.content) {
    walk(node);
  }

  return parts.join(" ");
}

function extractPlainTextFromBlocks(document: Document, blockTypes: Set<string>): string {
  const parts: string[] = [];

  function walk(node: Block | Inline | Text, inAllowedBlock: boolean) {
    const isAllowed =
      inAllowedBlock || ("nodeType" in node && blockTypes.has(node.nodeType));

    if ("value" in node && typeof node.value === "string" && isAllowed) {
      parts.push(node.value);
    }

    if ("content" in node && Array.isArray(node.content)) {
      for (const child of node.content) {
        walk(child as Block | Inline | Text, isAllowed);
      }
    }
  }

  for (const node of document.content) {
    walk(node, false);
  }

  return parts.join(" ");
}

export function selectInternalLinks(
  currentSlug: string,
  bodyText: string,
  posts: PostForLinking[],
  maxLinks = 5,
): BlogInternalLink[] {
  if (!bodyText.trim() || posts.length < 2) {
    return [];
  }

  const matches: { phrase: string; slug: string; score: number }[] = [];

  for (const post of posts) {
    if (post.slug === currentSlug) continue;

    for (const { phrase, score } of phrasesForPost(post)) {
      if (!isLinkablePhrase(phrase)) continue;
      if (!buildPhrasePattern(phrase).test(bodyText)) continue;
      matches.push({ phrase, slug: post.slug, score });
    }
  }

  const bestPerSlug = new Map<string, { phrase: string; slug: string; score: number }>();
  for (const match of matches) {
    const existing = bestPerSlug.get(match.slug);
    if (!existing || match.score > existing.score) {
      bestPerSlug.set(match.slug, match);
    }
  }

  const ranked = [...bestPerSlug.values()].sort((a, b) => b.score - a.score);
  const selected: BlogInternalLink[] = [];
  const usedPhraseKeys: string[] = [];

  for (const match of ranked) {
    if (selected.length >= maxLinks) break;

    const phraseKey = match.phrase.toLowerCase();
    const overlaps = usedPhraseKeys.some(
      (used) => used.includes(phraseKey) || phraseKey.includes(used),
    );
    if (overlaps) continue;

    selected.push({ phrase: match.phrase, slug: match.slug });
    usedPhraseKeys.push(phraseKey);
  }

  return selected.sort((a, b) => b.phrase.length - a.phrase.length);
}

export function selectInternalLinksFromDocument(
  currentSlug: string,
  document: Document,
  posts: PostForLinking[],
  maxLinks = 5,
): BlogInternalLink[] {
  const paragraphText = extractPlainTextFromBlocks(
    document,
    new Set([BLOCKS.PARAGRAPH, BLOCKS.LIST_ITEM]),
  );

  return selectInternalLinks(currentSlug, paragraphText, posts, maxLinks);
}

export function splitTextWithInternalLinks(
  text: string,
  links: BlogInternalLink[],
  linkedSlugs: Set<string>,
  maxLinks: number,
): Array<{ type: "text"; value: string } | { type: "link"; value: string; slug: string }> {
  if (!text || linkedSlugs.size >= maxLinks || links.length === 0) {
    return [{ type: "text", value: text }];
  }

  type Match = { start: number; end: number; slug: string; value: string };
  const matches: Match[] = [];

  for (const link of links) {
    if (linkedSlugs.has(link.slug)) continue;

    const pattern = buildPhrasePattern(link.phrase);
    const match = pattern.exec(text);
    if (match?.index === undefined) continue;

    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      slug: link.slug,
      value: match[0],
    });
  }

  if (matches.length === 0) {
    return [{ type: "text", value: text }];
  }

  matches.sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start));

  const chosen: Match[] = [];
  let cursor = 0;

  for (const match of matches) {
    if (linkedSlugs.size >= maxLinks) break;
    if (match.start < cursor) continue;
    if (linkedSlugs.has(match.slug)) continue;

    chosen.push(match);
    linkedSlugs.add(match.slug);
    cursor = match.end;
  }

  if (chosen.length === 0) {
    return [{ type: "text", value: text }];
  }

  const segments: Array<
    { type: "text"; value: string } | { type: "link"; value: string; slug: string }
  > = [];
  let index = 0;

  for (const match of chosen) {
    if (match.start > index) {
      segments.push({ type: "text", value: text.slice(index, match.start) });
    }
    segments.push({ type: "link", value: match.value, slug: match.slug });
    index = match.end;
  }

  if (index < text.length) {
    segments.push({ type: "text", value: text.slice(index) });
  }

  return segments;
}
