import { createClient, type ContentfulClientApi } from "contentful";

function getContentfulEnv() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONMENT ?? "master";

  if (!spaceId || !accessToken) {
    return null;
  }

  return { spaceId, accessToken, environment };
}

export function isContentfulConfigured(): boolean {
  return getContentfulEnv() !== null;
}

export function getContentfulClient(): ContentfulClientApi<undefined> {
  const config = getContentfulEnv();

  if (!config) {
    throw new Error(
      "Contentful is not configured. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN in .env.local (and in Vercel for production).",
    );
  }

  return createClient({
    space: config.spaceId,
    accessToken: config.accessToken,
    environment: config.environment,
  });
}
