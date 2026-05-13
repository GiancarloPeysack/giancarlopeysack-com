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
      <main className="min-h-screen w-full bg-white text-black flex items-center justify-center px-6">
        <div className="w-full max-w-[460px] text-center">
          <h1 className="text-[32px] sm:text-[36px] font-extrabold leading-[1.05] tracking-tight">
            You&apos;re on the list.
          </h1>
          <p className="mt-4 text-[15px] text-gray-600">
            I&apos;ll email you the moment the first cohort opens.
          </p>
          <p className="mt-8">
            <Link href="/" className="text-gray-800 underline text-[14px]">
              ← Back home
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-white text-black flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[460px]">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/giancarlo.jpg"
            alt="Giancarlo Peysack"
            width={64}
            height={64}
            priority
            className="rounded-full object-cover"
            style={{ width: 64, height: 64 }}
          />
          <h1 className="mt-5 text-[28px] sm:text-[32px] font-extrabold leading-[1.1] tracking-tight">
            AI short-form video tool
          </h1>
          <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.5] text-gray-600 max-w-[380px]">
            Topic, script, or clip in. Voice-cloned video out. Captions, 9:16
            crop, music, auto-published to 9 platforms in one click.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div>
            <FieldLabel required>Name</FieldLabel>
            <TextInput
              name="name"
              placeholder="John Smith"
              required
              value={name}
              onChange={setName}
            />
          </div>

          <div>
            <FieldLabel required>Email</FieldLabel>
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
            <FieldLabel>How many videos a week?</FieldLabel>
            <Select
              name="volume"
              value={volume}
              onChange={setVolume}
              options={VOLUMES}
              placeholder="Select..."
            />
          </div>

          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

          <SubmitButton
            label="Join the waitlist"
            loading={status === "sending"}
          />
        </form>

        <p className="mt-6 text-center">
          <Link href="/" className="text-gray-600 underline text-[13px]">
            ← Back home
          </Link>
        </p>
      </div>
    </main>
  );
}
