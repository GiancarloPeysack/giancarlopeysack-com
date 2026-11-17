import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { BrandTile } from "@/components/BrandTile";
import { LinkedInIcon, TikTokIcon, InstagramIcon, SubstackIcon } from "@/components/SocialIcons";
import { linksContent, linksUrls as L } from "@/content/links";
import { caseStudies, projectHref } from "@/content/projects";
import { getSubstackPosts } from "@/lib/substack";
import s from "./links.module.css";

/**
 * The page in his Instagram and TikTok bios. Shape unchanged from the first
 * version he liked: a narrow white column of plain sentences, each ending in
 * a row of app-icon tiles. What is new sits inside that shape rather than
 * replacing it - a rail of his posts under the writing line, a rail of app
 * shots under the apps line, so a stranger scrolling on a phone sees the
 * work instead of a list of names.
 */
export async function LinksView() {
  const posts = await getSubstackPosts(6, linksContent.writingFallback);
  const built = linksContent.apps
    .map((item) => {
      const study = caseStudies.find((c) => c.slug === item.slug);
      return study ? { study, site: item.site, image: item.image ?? study.card.image, note: item.note ?? study.subtitle } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <main className="min-h-screen w-full bg-white text-black">
      <div className="mx-auto w-full max-w-[640px] px-6 pt-16 pb-24 sm:pt-24">
        <article
          // Mobile-first sizing: bigger text on phones (matches Chris's
          // narrow-column-needs-bigger-type design), tighter on desktop.
          className="text-black text-[26px] sm:text-[22px] leading-[1.45] sm:leading-[1.55]"
          style={{ fontWeight: 400, letterSpacing: "-0.005em" }}
        >
          {/* Greeting + click-to-zoom avatar */}
          <p>
            Hi, I&apos;m Gianni Peysack{" "}
            <span className="inline-block align-middle ml-1">
              <Avatar src="/gianni.jpg" />
            </span>
          </p>

          {/* Writing: the Substack tile, then the posts themselves. */}
          <p className="mt-10 sm:mt-8">
            I like writing here{" "}
            <span className="tile-row align-middle ml-2">
              <BrandTile href={L.substack} label="Substack" tooltip="@giancarlopeysack" bg="#FF6719">
                <SubstackIcon />
              </BrandTile>
            </span>
          </p>

          {posts.length > 0 && (
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
                  {post.date && <p className={s.cardNote}>{post.date}</p>}
                </a>
              ))}
            </div>
          )}

          {/* Apps shipped: the tiles, then what they actually look like. */}
          <p className="mt-10 sm:mt-8">
            I&apos;ve shipped some apps{" "}
            <span className="tile-row align-middle ml-2">
              <BrandTile href={L.genzi} label="Genzi" tooltip="Genzi · social app for live music & nightlife" bg="#191E31">
                <Image src="/genzi-icon.png" alt="" width={44} height={44} className="h-full w-full rounded-[11px] sm:rounded-[10px]" />
              </BrandTile>
              <BrandTile href={L.lexfall} label="Lexfall" tooltip="Lexfall · daily lessons for advanced English" bg="#100E0B">
                <Image src="/lexfall-icon.png" alt="" width={44} height={44} className="h-full w-full rounded-[11px] sm:rounded-[10px]" />
              </BrandTile>
              <BrandTile href={L.marketops} label="MarketOpsIQ" tooltip="MarketOpsIQ · AI shelf intel for CPG" bg="#0F1116" fg="#FFFFFF" letter="M" />
              <BrandTile href={L.zharo} label="Zharo" tooltip="Zharo · Chrome extension for LinkedIn, in your voice" bg="#0a0a0a">
                <svg viewBox="0 0 120 120" fill="none" style={{ width: "62%", height: "62%", color: "#fff" }}>
                  <defs>
                    <linearGradient id="zharoSparkTile" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#6366F1" />
                      <stop offset="1" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  <g transform="translate(52,60)">
                    <path d="M 36.85 17.97 A 41 41 0 1 1 36.85 -17.97" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                    <circle cx="49" cy="0" r="8.5" fill="url(#zharoSparkTile)" />
                  </g>
                </svg>
              </BrandTile>
            </span>
          </p>

          <div className={s.rail}>
            {built.map(({ study, site, image, note }) => (
              <a
                key={study.slug}
                className={s.card}
                href={site || projectHref(study.slug)}
                {...(site ? { target: "_blank", rel: "noopener" } : {})}
              >
                <div className={s.cardMedia}>
                  <Image src={image} alt={study.card.name} fill unoptimized sizes="260px" />
                </div>
                <p className={s.cardTitle}>{study.card.name}</p>
                <p className={s.cardNote}>{note}</p>
              </a>
            ))}
          </div>

          {/* Social */}
          <p className="mt-10 sm:mt-8">
            I post here{" "}
            <span className="tile-row align-middle ml-2">
              <BrandTile href={L.linkedin} label="LinkedIn" tooltip="@gcpeysack" bg="#0A66C2">
                <LinkedInIcon />
              </BrandTile>
              {/* Handles still owed, so these do not navigate anywhere. */}
              <BrandTile href={L.tiktok} label="TikTok" tooltip="TikTok (soon)" bg="#000000" disabled>
                <TikTokIcon />
              </BrandTile>
              <BrandTile
                href={L.instagram}
                label="Instagram"
                tooltip="Instagram (soon)"
                bg="linear-gradient(135deg, #FFD600 0%, #FF7A00 30%, #FF0069 60%, #D300C5 80%, #7638FA 100%)"
                disabled
              >
                <InstagramIcon />
              </BrandTile>
            </span>
          </p>

          {/* Divider */}
          <hr className="my-10 sm:my-12 border-0 border-t border-gray-200" />

          {/* Contact CTAs — explicitly smaller (~70% of main paragraphs), like Chris's */}
          <div
            className="space-y-3 sm:space-y-2"
            style={{ fontSize: "clamp(14px, 3.4vw, 16px)", lineHeight: 1.55, fontWeight: 400 }}
          >
            <p>
              Need design, development or AI help? <Link href="/contact">Start a project.</Link>
            </p>
            <p>
              Interested in sponsoring a video? <Link href="/sponsor">Get sponsorship details.</Link>
            </p>
            <p>
              Want to say hi? <Link href={L.sayHi}>Send me an email.</Link>
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
