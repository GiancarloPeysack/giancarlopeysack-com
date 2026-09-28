import { homeContent } from "@/content/home";
import { InViewAppear } from "@/components/julian/fx/effects";
import { Button } from "@/components/julian/ui/Button";
import { Label } from "@/components/julian/ui/Label";
import { SmartLink } from "@/components/julian/ui/SmartLink";
import text from "@/components/julian/ui/text.module.css";
import { now, phoneLate, soon, up20, up60 } from "./fx";
import s from "./home.module.css";
import c from "./sections.module.css";

type Post = { title: string; description: string; date: string; href: string };

const FEED_REVALIDATE = 60 * 60 * 12; // twice a day is plenty for a newsletter
const MAX_POSTS = 4;

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

/**
 * Posts come from the Substack RSS feed so the section keeps itself current;
 * the list in content/home.ts is the fallback if the feed is unreachable at
 * build time.
 */
async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(homeContent.writing.feed, {
      next: { revalidate: FEED_REVALIDATE },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return homeContent.writing.posts;
    const xml = await res.text();
    const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .slice(0, MAX_POSTS)
      .map(([, block]) => {
        const published = new Date(tag(block, "pubDate"));
        return {
          title: decode(tag(block, "title")),
          description: clamp(decode(tag(block, "description")), 170),
          date: Number.isNaN(published.getTime())
            ? ""
            : published.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
          href: decode(tag(block, "link")),
        };
      })
      .filter((post) => post.title && post.href);
    return posts.length ? posts : homeContent.writing.posts;
  } catch {
    return homeContent.writing.posts;
  }
}

export async function Writing() {
  const { label, heading, button } = homeContent.writing;
  const posts = await getPosts();
  if (!posts.length) return null;

  return (
    <section className={s.services} id="writing" data-name="Writing">
      <div className={s.servicesWrapper}>
        <div className={s.servicesHeader}>
          <InViewAppear
            className={s.labelBox}
            enter={{ desktop: up60, phone: up20 }}
            animate={{ desktop: { transition: now }, phone: { transition: phoneLate } }}
            animateOnce
            threshold={0}
          >
            <Label title={label} />
          </InViewAppear>
          <InViewAppear
            className={`${s.rt} ${s.heading} ${c.headingWrap}`}
            enter={{ desktop: up60, phone: up20 }}
            animate={{ desktop: { transition: soon }, phone: { transition: phoneLate } }}
            animateOnce
            threshold={0}
          >
            <h2 className={`${text.t} ${text.h1}`} style={{ textAlign: "left" }}>
              {heading}
            </h2>
          </InViewAppear>
        </div>

        <div className={s.servicesListBox}>
          <div className={c.posts}>
            {posts.map((post, i) => (
              <InViewAppear
                key={post.href}
                enter={{ desktop: up60, phone: up20 }}
                animate={{
                  desktop: { transition: { ...soon, delay: 0.08 * i } },
                  phone: { transition: phoneLate },
                }}
                animateOnce
                threshold={0}
              >
                <SmartLink href={post.href} className={c.post}>
                  {post.date && (
                    <div className={c.postMeta}>
                      <span className={`${text.t} ${text.meta14}`}>{post.date}</span>
                    </div>
                  )}
                  <h3 className={`${text.t} ${c.postTitle}`}>{post.title}</h3>
                  {post.description && <p className={`${text.t} ${text.body18}`}>{post.description}</p>}
                </SmartLink>
              </InViewAppear>
            ))}
          </div>
          <InViewAppear
            className={c.postButton}
            enter={{ desktop: up20, phone: up20 }}
            animate={{ desktop: { transition: soon }, phone: { transition: phoneLate } }}
            animateOnce
            threshold={0}
          >
            <Button text={button.text} link={button.link} variant="Solid" />
          </InViewAppear>
        </div>
      </div>
    </section>
  );
}
