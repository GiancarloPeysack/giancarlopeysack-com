"use client";

import { FormEvent, Fragment, useState } from "react";
import { contactContent, type ContactField } from "@/content/contact";
import { Appear } from "@/components/julian/fx/effects";
import { MenuLink } from "@/components/julian/ui/MenuLink";
import styles from "./contact.module.css";
import { FormButton, type FormState } from "./FormButton";

// Load appears of the Contact page: the two columns and the captions start
// at 0.9s, the links at 1s (ids 1d478ha, kkh6b, 7xtiwm, 1lxveqr, ...).
const spring = (delay: number) => ({
  initial: { opacity: 0.001, y: 23 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 80, stiffness: 400, mass: 1, delay },
  },
});

/**
 * The template posts to Framer's form service; this site sends the fields to
 * its own /api/notify route instead, which emails them to the owner. That
 * email is the only copy (nothing is stored), so the route answers
 * 200 { ok: false } when it couldn't send (e.g. RESEND_API_KEY unset) and
 * the form shows its error state instead of a false "Thank you".
 */
async function submitContactForm(data: Record<string, string>) {
  const res = await fetch("/api/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "contact", data }),
  });
  const body = (await res.json().catch(() => null)) as { ok?: boolean } | null;
  if (!res.ok || !body?.ok) throw new Error(`notify failed: ${res.status}`);
}

export function ContactHero() {
  const { form, details } = contactContent;
  const [state, setState] = useState<FormState>("default");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return; // honeypot: bots fill every field
    const data: Record<string, string> = {};
    for (const field of form.fields) data[field.key] = String(fd.get(field.key) ?? "");
    setState("loading");
    try {
      await submitContactForm(data);
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <section className={styles.hero}>
      <div className={styles.contentWrapper}>
        <Appear className={styles.form} {...spring(0.9)}>
          <form className={styles.formInner} onSubmit={onSubmit}>
            {form.fields.map((field) => (
              <Field key={field.key} field={field} />
            ))}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              style={{ position: "absolute", left: -10000, width: 1, height: 1, opacity: 0 }}
            />
            <div className={styles.buttonContainer}>
              <FormButton state={state} />
            </div>
          </form>
        </Appear>

        <Appear className={styles.details} {...spring(0.9)}>
          <div className={styles.detailGroup}>
            <Appear className={styles.caption} {...spring(0.9)}>
              <p className={styles.captionText}>{details.email.caption}</p>
            </Appear>
            <Appear className={styles.linkContainer} {...spring(1)}>
              <MenuLink title={details.email.title} href={details.email.link} variant="M" newTab />
            </Appear>
          </div>

          <div className={styles.detailGroup}>
            <Appear className={styles.caption} {...spring(0.9)}>
              <p className={styles.captionText}>{details.phone.caption}</p>
            </Appear>
            <Appear className={styles.linkContainer} {...spring(1)}>
              <MenuLink title={details.phone.title} href={details.phone.link} variant="M" newTab />
            </Appear>
          </div>

          <div className={styles.detailGroup}>
            <Appear className={styles.caption} {...spring(0.9)}>
              <p className={styles.captionText}>{details.socials.caption}</p>
            </Appear>
            <div className={styles.socialRow}>
              {details.socials.links.map((social) => (
                <Appear key={social.title} className={styles.linkContainer} {...spring(1)}>
                  <MenuLink title={social.title} href={social.link} />
                </Appear>
              ))}
            </div>
          </div>

          <div className={styles.title}>
            <Appear className={styles.titleText} {...spring(0.9)}>
              <h1 className={`${styles.titleHeading} ${styles.titleHeadingDesktop}`}>
                <Lines lines={details.title.desktop} />
              </h1>
              <h1 className={`${styles.titleHeading} ${styles.titleHeadingTablet}`}>
                <Lines lines={details.title.tablet} />
              </h1>
            </Appear>
          </div>
        </Appear>
      </div>
    </section>
  );
}

function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

function Field({ field }: { field: ContactField }) {
  return (
    <label className={styles.field}>
      <div className={styles.fieldLabel}>
        <p className={styles.fieldLabelText}>{field.label}</p>
      </div>
      {field.kind === "select" ? (
        <div className={styles.selectWrapper}>
          <select className={styles.select} name={field.key} required={field.required} defaultValue="">
            {field.options.map((option) => (
              <option key={option.title} value={option.value} disabled={option.disabled}>
                {option.title}
              </option>
            ))}
          </select>
        </div>
      ) : field.kind === "textarea" ? (
        <div className={styles.textareaWrapper}>
          <textarea className={styles.textarea} name={field.key} placeholder={field.placeholder} required={field.required} />
        </div>
      ) : (
        <div className={styles.textInput}>
          <input
            className={styles.input}
            type={field.kind}
            name={field.key}
            placeholder={field.placeholder}
            required={field.required}
          />
        </div>
      )}
    </label>
  );
}
