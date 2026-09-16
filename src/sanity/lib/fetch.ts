import { client } from "./client";
import { isSanityConfigured } from "../env";

export async function sanityQuery<T>(query: string): Promise<T | null> {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch<T>(query, {}, { next: { revalidate: 10 } });
  } catch (error) {
    console.error("Sanity fetch failed; using local content.", error);
    return null;
  }
}
