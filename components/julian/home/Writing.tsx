import { homeContent } from "@/content/home";
import { InViewAppear } from "@/components/julian/fx/effects";
import { Button } from "@/components/julian/ui/Button";
import { Label } from "@/components/julian/ui/Label";
import { SmartLink } from "@/components/julian/ui/SmartLink";
import { getSubstackPosts } from "@/lib/substack";
import text from "@/components/julian/ui/text.module.css";
import { now, phoneLate, soon, up20, up60 } from "./fx";
import s from "./home.module.css";
import c from "./sections.module.css";

const MAX_POSTS = 4;

export async function Writing() {
  const { label, heading, button } = homeContent.writing;
  const posts = await getSubstackPosts(MAX_POSTS, homeContent.writing.posts);
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
                  {post.image && (
                    <div className={c.postImage}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.image} alt="" loading="lazy" />
                    </div>
                  )}
                  <div className={c.postText}>
                    {post.date && (
                      <div className={c.postMeta}>
                        <span className={`${text.t} ${text.meta14}`}>{post.date}</span>
                      </div>
                    )}
                    <h3 className={`${text.t} ${c.postTitle}`}>{post.title}</h3>
                    {post.description && <p className={`${text.t} ${text.body18}`}>{post.description}</p>}
                  </div>
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
