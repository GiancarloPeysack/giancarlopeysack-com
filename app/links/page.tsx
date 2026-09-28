import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { linksContent, linksMeta } from "@/content/links";
import { caseStudies, projectHref } from "@/content/projects";
import { getSubstackPosts } from "@/lib/substack";
import s from "./links.module.css";

export const metadata: Metadata = {
  title: linksMeta.title,
  description: linksMeta.description,
  openGraph: {
    title: "Gianni Peysack",
    description: linksMeta.description,
    url: "https://giancarlopeysack.com/links",
    siteName: "Gianni Peysack",
    type: "website",
  },
  twitter: { card: "summary", title: "Gianni Peysack", description: linksMeta.description },
};

/**
 * The page in his Instagram and TikTok bios. Someone arrives from a phone
 * knowing nothing, so it is a short stack of taps: what he writes, what he
 * has built, where he posts, and the three reasons a stranger would get in
 * touch. The writing and the apps are rails of pictures rather than lists
 * of names, because that is what a link-in-bio visitor actually scans.
 */
export default async function LinksPage() {
  const { greeting, line, avatar, writing, apps, social, actions } = linksContent;
  const posts = await getSubstackPosts(6, writing.fallback);
  const built = apps.items
    .map((item) => {
      const study = caseStudies.find((c) => c.slug === item.slug);
      return study ? { study, site: item.site } : null;
    })
    .filter((x): x is { study: (typeof caseStudies)[number]; site: string } => x !== null);

  return (
    <main className={`links-root ${s.page}`}>
      <div className={s.inner}>
        <header className={s.head}>
          <div className={s.avatar}>
            <Image src={avatar.src} alt={avatar.alt} fill unoptimized sizes="64px" />
          </div>
          <h1 className={s.greeting}>{greeting}</h1>
        </header>
        <p className={s.line}>{line}</p>

        {posts.length > 0 && (
          <section className={s.section}>
            <div className={s.sectionHead}>
              <span className={s.rowTitle}>{writing.label}</span>
              <a className={s.sectionLink} href={writing.cta.href} target="_blank" rel="noopener">
                {writing.cta.text}
              </a>
            </div>
            <div className={s.rail}>
              {posts.map((post) => (
                <a key={post.href} className={s.card} href={post.href} target="_blank" rel="noopener">
                  <div className={s.cardMedia}>
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.image} alt="" loading="lazy" />
                    ) : null}
                  </div>
                  <p className={s.cardTitle}>{post.title}</p>
                  <p className={s.cardNote}>{post.date}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.rowTitle}>{apps.label}</span>
            <Link className={s.sectionLink} href={apps.cta.href}>
              {apps.cta.text}
            </Link>
          </div>
          <div className={s.rail}>
            {built.map(({ study, site }) => (
              <a
                key={study.slug}
                className={s.card}
                href={site || projectHref(study.slug)}
                {...(site ? { target: "_blank", rel: "noopener" } : {})}
              >
                <div className={s.cardMedia}>
                  <Image src={study.card.image} alt={study.card.name} fill unoptimized sizes="260px" />
                </div>
                <p className={s.cardTitle}>{study.card.name}</p>
                <p className={s.cardNote}>{study.subtitle}</p>
              </a>
            ))}
          </div>
        </section>

        <section className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.rowTitle}>{social.label}</span>
          </div>
          <div className={s.rows}>
            {social.items.map((item) =>
              item.href ? (
                <a key={item.title} className={s.row} href={item.href} target="_blank" rel="noopener">
                  <span className={s.rowTitle}>{item.title}</span>
                  <span className={s.rowValue}>{item.value}</span>
                </a>
              ) : (
                <div key={item.title} className={`${s.row} ${s.rowDisabled}`} aria-disabled="true">
                  <span className={s.rowTitle}>{item.title}</span>
                  <span className={s.rowValue}>{item.value}</span>
                </div>
              ),
            )}
          </div>
        </section>

        <section className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.rowTitle}>{actions.label}</span>
          </div>
          <div className={s.rows}>
            {actions.items.map((item) => (
              <Link key={item.title} className={s.row} href={item.href}>
                <span className={s.rowTitle}>{item.title}</span>
                <span className={s.rowValue}>{item.value}</span>
              </Link>
            ))}
          </div>
          <div className={s.quiet}>
            {actions.quiet.map((item) => (
              <a key={item.title} className={s.quietLink} href={item.href}>
                {item.title}
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
