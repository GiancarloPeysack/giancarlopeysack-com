import Image from "next/image";
import { site } from "@/content/site";
import { InViewAppear } from "@/components/julian/fx/effects";
import { Button } from "@/components/julian/ui/Button";
import { Label } from "@/components/julian/ui/Label";
import { SmartLink } from "@/components/julian/ui/SmartLink";
import text from "@/components/julian/ui/text.module.css";
import styles from "./WorkTogether.module.css";

const ENTER = { opacity: 0, y: 40 };
const SETTLE = { transition: { type: "spring" as const, damping: 80, stiffness: 400, mass: 1, delay: 0 } };

/**
 * The closing section, on every page. It replaces the template's CTA, which
 * was the words "LET'S WORK TOGETHER" set as large as they would go over a
 * photo: striking, but it asked for nothing and said nothing about what
 * happens after the click.
 */
export function WorkTogether() {
  const { closing } = site;
  return (
    <section className={styles.section} data-name="Work with me">
      <div className={styles.wrapper}>
        <InViewAppear enter={ENTER} animate={SETTLE} animateOnce threshold={0}>
          <Label title={closing.label} />
        </InViewAppear>

        <div className={styles.grid} style={{ marginTop: 28 }}>
          <div className={styles.copy}>
            <InViewAppear enter={ENTER} animate={SETTLE} animateOnce threshold={0}>
              <h2 className={`${text.t} ${text.h1}`}>{closing.heading}</h2>
            </InViewAppear>

            <InViewAppear enter={ENTER} animate={SETTLE} animateOnce threshold={0} className={styles.body}>
              <p className={`${text.t} ${text.body18}`}>{closing.body}</p>
            </InViewAppear>

            <InViewAppear enter={ENTER} animate={SETTLE} animateOnce threshold={0} className={styles.actions}>
              <Button text={closing.primary.text} link={closing.primary.link} variant="Solid" />
              <SmartLink href={closing.secondary.link} className={styles.mailLink}>
                {closing.secondary.text}
              </SmartLink>
            </InViewAppear>

            <InViewAppear enter={ENTER} animate={SETTLE} animateOnce threshold={0} className={styles.status}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={`${text.t} ${text.mono}`}>{closing.availability}</span>
            </InViewAppear>
          </div>

          <InViewAppear enter={ENTER} animate={SETTLE} animateOnce threshold={0} className={styles.portrait}>
            <Image src={closing.image.src} alt={closing.image.alt} fill unoptimized sizes="(min-width: 810px) 46vw, 92vw" />
          </InViewAppear>
        </div>

        <div className={styles.contacts}>
          {closing.contacts.map((contact) => (
            <SmartLink key={contact.label} href={contact.href} className={styles.contact}>
              <span className={`${text.t} ${text.mono}`}>{contact.label}</span>
              <span className={styles.contactValue}>{contact.value}</span>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}
