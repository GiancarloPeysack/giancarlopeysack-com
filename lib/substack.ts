// Posts from the Substack RSS feed, shared by the home page's writing list
// and /links so they can never drift apart. Fetched at build time and
// revalidated twice a day; the caller passes a fallback for when the feed
// cannot be reached.

export type Post = {
  title: string;
  description: string;
  date: string;
  href: string;
  image?: string;
};

export const SUBSTACK_FEED = "https://giancarlopeysack.substack.com/feed";

const REVALIDATE = 60 * 60 * 12;

function decode(value: string) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

function clamp(value: string, max: number) {
  if (value.length <= max) return value;
  const cut = value.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "")}…`;
}

function tag(block: string, name: string) {
  const match = block.match(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`));
  return match ? match[1] : "";
}

export async function getSubstackPosts(limit: number, fallback: Post[] = []): Promise<Post[]> {
  try {
    const res = await fetch(SUBSTACK_FEED, {
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return fallback;
    const xml = await res.text();
    const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .slice(0, limit)
      .map(([, block]) => {
        const published = new Date(tag(block, "pubDate"));
        return {
          // Substack puts no enclosure on the item, so the cover is the
          // first image in the post body.
          image: block.match(/https:\/\/substackcdn\.com\/image\/fetch\/[^"'\s<>\\]+/)?.[0],
          title: decode(tag(block, "title")),
          description: clamp(decode(tag(block, "description")), 170),
          date: Number.isNaN(published.getTime())
            ? ""
            : published.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
          href: decode(tag(block, "link")),
        };
      })
      .filter((post) => post.title && post.href);
    return posts.length ? posts : fallback;
  } catch {
    return fallback;
  }
}
