"use client";

import { FormEvent, Fragment, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
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
 * Firestore is the durable copy (matches /pilot, /sponsor, /waitlist/*), so a
 * submission survives even if the /api/notify email step fails (e.g.
 * RESEND_API_KEY unset). The email is best-effort on top of that.
 */
async function submitContactForm(data: Record<string, string>) {
  const db = getFirebaseDb();
  if (!db) throw new Error("firestore unavailable");
  await addDoc(collection(db, "contact_messages"), {
    ...data,
    createdAt: serverTimestamp(),
    source: "giancarlopeysack.com/contact",
  });
  // Fire-and-forget email notification (best-effort, matches the other forms).
  fetchWithTimeout("/api/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "contact", data }),
  }).catch(() => {});
}

/** fetch with an 8s timeout so a hung request never leaves the button stuck. */
async function fetchWithTimeout(input: string, init: RequestInit, ms = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(input, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

export function ContactHero() {
  const { form, details } = contactContent;
  const [state, setState] = useState<FormState>("default");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) {
      // Honeypot tripped: show the normal success state without sending
      // anything, so a bot can't tell it was caught, and a real visitor
      // whose password manager filled the hidden field never sees a stuck
      // button (a known autofill gotcha with hidden honeypot inputs).
      setState("loading");
      setTimeout(() => setState("success"), 400);
      return;
    }
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
              <p className={styles.captionText}>{details.resume.caption}</p>
            </Appear>
            <Appear className={styles.linkContainer} {...spring(1)}>
              <MenuLink title={details.resume.title} href={details.resume.link} variant="M" newTab />
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
