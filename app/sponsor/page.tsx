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
  RadioCards,
  SubmitButton,
} from "@/components/FormFields";

const SPONSOR_TYPES = [
  "30-second mid-roll",
  "Integrated segment",
  "Full video sponsor",
  "Series sponsor",
  "Other",
];

const COMPANY_TYPES = [
  "Physical good (e.g. standing desk, energy drink)",
  "B2C software",
  "B2B software",
  "Other",
];

export default function SponsorPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [sponsorshipType, setSponsorshipType] = useState("");
  const [companyType, setCompanyType] = useState("");
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
      setStatus("err");
      setErrorMsg(
        "Form submission isn't wired up yet. Please email gc.peysack@gmail.com directly."
      );
      return;
    }
    try {
      await addDoc(collection(db, "sponsorship_requests"), {
        name,
        company,
        email,
        sponsorshipType,
        companyType,
        createdAt: serverTimestamp(),
        source: "giancarlopeysack.com/sponsor",
      });
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sponsor",
          data: { name, company, email, sponsorshipType, companyType },
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
        <div className="mx-auto w-full max-w-[640px] px-6 pt-20 pb-24 sm:pt-24">
          <h1 className="text-[40px] sm:text-[48px] font-extrabold leading-[1.1] tracking-tight">
            Thanks!
          </h1>
          <p className="mt-6 text-[18px] sm:text-[19px] leading-[1.6] text-gray-700">
            Got your sponsorship request. I&apos;ll get back to you within a few days.
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
          Sponsorship request
        </h1>

        <p className="mt-8 text-[17px] sm:text-[18px] leading-[1.65] text-gray-700">
          If you&apos;re interested in sponsoring a video (LinkedIn, TikTok,
          Instagram, etc.) or a series of videos, please fill out the form below
          :)
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-8">
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
            <FieldLabel required>What is your company name?</FieldLabel>
            <TextInput
              name="company"
              placeholder="Acme Ltd."
              required
              value={company}
              onChange={setCompany}
            />
          </div>

          <div>
            <FieldLabel required>What is your email address?</FieldLabel>
            <TextInput
              name="email"
              type="email"
              placeholder="john.smith@acme.co.uk"
              required
              value={email}
              onChange={setEmail}
            />
          </div>

          <div>
            <FieldLabel required>
              What type of sponsorship are you looking to do?
            </FieldLabel>
            <Select
              name="sponsorshipType"
              required
              value={sponsorshipType}
              onChange={setSponsorshipType}
              options={SPONSOR_TYPES}
              placeholder="Select an option…"
            />
          </div>

          <div>
            <FieldLabel>What type of company are you?</FieldLabel>
            <RadioCards
              name="companyType"
              value={companyType}
              onChange={setCompanyType}
              options={COMPANY_TYPES}
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          <SubmitButton label="Submit" loading={status === "sending"} />
        </form>
      </div>
    </main>
  );
}
