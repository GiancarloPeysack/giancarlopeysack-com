"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import {
  FieldLabel,
  TextInput,
  Select,
  SubmitButton,
} from "@/components/FormFields";

const FREQUENCY_OPTIONS = [
  "Daily",
  "A few times a week",
  "Weekly",
  "Less than weekly",
];

export default function LinkedInWaitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const db = getFirebaseDb();
    if (!db) {
      // Firebase isn't configured yet — fall back to mailto so the visitor
      // can still reach Giancarlo while infrastructure is being set up.
      const subject = encodeURIComponent("Waitlist: LinkedIn AI tool");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nFrequency: ${frequency}`
      );
      window.location.href = `mailto:gc.peysack@gmail.com?subject=${subject}&body=${body}`;
      return;
    }
    try {
      await addDoc(collection(db, "linkedin_tool_waitlist"), {
        name,
        email,
        frequency,
        createdAt: serverTimestamp(),
        source: "giancarlopeysack.com/waitlist/linkedin",
      });
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "linkedin",
          data: { name, email, frequency },
        }),
      }).catch(() => {});
      setStatus("ok");
    } catch (err) {
      console.error(err);
      setStatus("err");
      setErrorMsg("Something went wrong. Try again or email me directly.");
    }
  }

  if (status === "ok") {
    return (
      <main className="min-h-screen w-full bg-white text-black">
        <div className="mx-auto w-full max-w-[640px] px-6 pt-16 pb-24 sm:pt-20">
          <h1 className="text-[40px] sm:text-[48px] font-extrabold leading-[1.05] tracking-tight">
            You&apos;re in.
          </h1>
          <p className="mt-6 text-[18px] sm:text-[19px] leading-[1.6] text-gray-700">
            I&apos;ll email you the moment the LinkedIn AI tool opens its first
            cohort. Until then, you can follow what I&apos;m building on{" "}
            <Link
              href="https://linkedin.com/in/gcpeysack"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
            .
          </p>
          <p className="mt-8">
            <Link href="/" className="text-gray-800 underline">
              ← Back home
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-white text-black">
      <div className="mx-auto w-full max-w-[640px] px-6 pt-16 pb-24 sm:pt-20">
        <div className="mb-8">
          <Image
            src="/giancarlo.jpg"
            alt="Giancarlo Peysack"
            width={72}
            height={72}
            priority
            className="rounded-full object-cover"
            style={{ width: 72, height: 72 }}
          />
        </div>

        <h1 className="text-[40px] sm:text-[52px] font-extrabold leading-[1.05] tracking-tight">
          LinkedIn AI growth tool
        </h1>

        <p className="mt-8 text-[17px] sm:text-[18px] leading-[1.65] text-gray-700">
          A multi-agent system that learns your voice from your past posts,
          drafts comments and full posts in that voice, and scores every
          LinkedIn post you see for how worth engaging with it is. Everything
          is guided by a strategy you design once (your posture, pillars, hook
          patterns, voice rules, north-star metric).
        </p>

        <p className="mt-4 text-[17px] sm:text-[18px] leading-[1.65] text-gray-700">
          Built for builders and operators who want to grow on LinkedIn
          methodically, in their own voice, without spending hours a day
          inside the app.
        </p>

        <h2 className="mt-10 text-[22px] sm:text-[24px] font-bold tracking-tight">
          Join the waitlist
        </h2>

        <form onSubmit={onSubmit} className="mt-6 space-y-8">
          <div>
            <FieldLabel required>What is your name?</FieldLabel>
            <TextInput
              name="name"
              placeholder="John Smith"
              required
              value={name}
              onChange={setName}
            />
          </div>

          <div>
            <FieldLabel required>What is your email address?</FieldLabel>
            <TextInput
              name="email"
              type="email"
              placeholder="john@company.com"
              required
              value={email}
              onChange={setEmail}
            />
          </div>

          <div>
            <FieldLabel>How often do you want to post on LinkedIn?</FieldLabel>
            <Select
              name="frequency"
              value={frequency}
              onChange={setFrequency}
              options={FREQUENCY_OPTIONS}
              placeholder="Select an option..."
            />
          </div>

          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

          <SubmitButton
            label="Join the waitlist"
            loading={status === "sending"}
          />
        </form>

        <p className="mt-12">
          <Link href="/" className="text-gray-800 underline">
            ← Back home
          </Link>
        </p>
      </div>
    </main>
  );
}
