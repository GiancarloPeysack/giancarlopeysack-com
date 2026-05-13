"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
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

const CALENDLY_URL = "https://calendly.com/gc-peysack/new-meeting";

const CPG_CATEGORIES = [
  "Food",
  "Beverage",
  "Personal care",
  "Household",
  "Beauty",
  "Pet",
  "Other",
];

const STORE_COUNTS = [
  "1 to 10",
  "11 to 50",
  "51 to 200",
  "More than 200",
  "Not sure yet",
];

const CURRENT_PROCESS = [
  "Manual store visits by reps",
  "Spreadsheets",
  "An existing tool",
  "Nothing yet",
];

const TIMELINES = [
  "This month",
  "This quarter",
  "Next 6 months",
  "Just exploring",
];

export default function PilotPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [stores, setStores] = useState("");
  const [process, setProcess] = useState("");
  const [timeline, setTimeline] = useState("");
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
      await addDoc(collection(db, "pilot_requests"), {
        name,
        company,
        email,
        category,
        stores,
        currentProcess: process,
        timeline,
        createdAt: serverTimestamp(),
        source: "giancarlopeysack.com/pilot",
      });
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
        <div className="mx-auto w-full max-w-[720px] px-6 pt-16 pb-24 sm:pt-20">
          <h1 className="text-[40px] sm:text-[48px] font-extrabold leading-[1.05] tracking-tight">
            Thanks!
          </h1>
          <p className="mt-6 text-[18px] sm:text-[19px] leading-[1.6] text-gray-700">
            Got your details. The fastest next step is picking a time below so
            we can walk through MarketOpsIQ for {company || "your team"}.
          </p>

          {/* Calendly inline embed */}
          <div className="mt-10">
            <div
              className="calendly-inline-widget"
              data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=000000`}
              style={{ minWidth: "320px", height: "720px" }}
            />
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="afterInteractive"
            />
          </div>

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
          Pilot MarketOpsIQ
        </h1>

        <p className="mt-8 text-[17px] sm:text-[18px] leading-[1.65] text-gray-700">
          MarketOpsIQ is the field ops platform for CPG brands. Snap a shelf
          photo, AI extracts every price, and your team gets sales, inventory,
          and internal comms in one place. Tell me a bit about your brand and
          I&apos;ll set up a pilot.
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
              placeholder="Acme Foods"
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
              placeholder="john.smith@acme.co"
              required
              value={email}
              onChange={setEmail}
            />
          </div>

          <div>
            <FieldLabel required>What CPG category are you in?</FieldLabel>
            <Select
              name="category"
              required
              value={category}
              onChange={setCategory}
              options={CPG_CATEGORIES}
              placeholder="Select an option..."
            />
          </div>

          <div>
            <FieldLabel>How many stores would you want to track?</FieldLabel>
            <RadioCards
              name="stores"
              value={stores}
              onChange={setStores}
              options={STORE_COUNTS}
            />
          </div>

          <div>
            <FieldLabel>
              How do you get shelf intel today?
            </FieldLabel>
            <RadioCards
              name="process"
              value={process}
              onChange={setProcess}
              options={CURRENT_PROCESS}
            />
          </div>

          <div>
            <FieldLabel>What is your timeline?</FieldLabel>
            <RadioCards
              name="timeline"
              value={timeline}
              onChange={setTimeline}
              options={TIMELINES}
            />
          </div>

          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

          <SubmitButton label="Submit" loading={status === "sending"} />
        </form>
      </div>
    </main>
  );
}
