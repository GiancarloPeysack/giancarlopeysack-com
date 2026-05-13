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

const VOLUMES = [
  "1 to 3 a week",
  "4 to 7 a week",
  "1 to 3 a day",
  "More than 3 a day",
  "Not sure yet",
];

export default function VideoWaitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [volume, setVolume] = useState("");
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
      const subject = encodeURIComponent("Waitlist: AI video tool");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nVolume: ${volume}`
      );
      window.location.href = `mailto:gc.peysack@gmail.com?subject=${subject}&body=${body}`;
      return;
    }
    try {
      await addDoc(collection(db, "video_tool_waitlist"), {
        name,
        email,
        volume,
        createdAt: serverTimestamp(),
        source: "giancarlopeysack.com/waitlist/video",
      });
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "video",
          data: { name, email, volume },
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
            I&apos;ll email you the moment the AI video tool opens. Until
            then, follow along on{" "}
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
          AI short-form video tool
        </h1>

        <p className="mt-8 text-[17px] sm:text-[18px] leading-[1.65] text-gray-700">
          A pipeline that turns a topic, script, or long-form video into a
          finished short-form video. Voice-cloned narration in your voice,
          lipsync, burned-in captions, music, 9:16 format, all rendered and
          published to up to nine social platforms in one click.
        </p>

        <p className="mt-4 text-[17px] sm:text-[18px] leading-[1.65] text-gray-700">
          Built for founders and creators who want to ship daily short-form
          content without the daily production overhead.
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
            <FieldLabel>How many videos do you want to publish?</FieldLabel>
            <Select
              name="volume"
              value={volume}
              onChange={setVolume}
              options={VOLUMES}
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
