import Image from "next/image";
import Link from "next/link";
import { PhoneTile } from "@/components/PhoneTile";
import { SocialTile } from "@/components/SocialTile";

const LINKS = {
  marketops: "https://marketopsiq.com",
  genzi: "https://genzi.app",
  // TODO: swap to Tally/Typeform/Firebase later — mailto works as fallback
  waitlistLinkedIn:
    "mailto:gc.peysack@gmail.com?subject=Waitlist%3A%20LinkedIn%20weekly%20tool&body=Please%20add%20me%20to%20the%20waitlist.",
  waitlistContent:
    "mailto:gc.peysack@gmail.com?subject=Waitlist%3A%20Content%20agent%20tool&body=Please%20add%20me%20to%20the%20waitlist.",
  linkedin: "https://linkedin.com/in/gcpeysack",
  tiktok: "#", // TODO: paste TikTok URL
  instagram: "#", // TODO: paste Instagram URL
  substack: "#", // TODO: paste Substack URL
  pilot: "https://calendly.com/gc-peysack/new-meeting",
  sponsor:
    "mailto:gc.peysack@gmail.com?subject=Sponsor%20a%20video&body=Hi%20Giancarlo%2C%20I%27d%20like%20to%20sponsor%20a%20video.",
  sayHi: "mailto:gc.peysack@gmail.com?subject=Hi",
};

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white text-black">
      <div className="mx-auto w-full max-w-[640px] px-6 pt-16 pb-24 sm:pt-24">
        <article
          className="text-black"
          style={{ fontSize: "clamp(20px, 5.6vw, 26px)", lineHeight: 1.5 }}
        >
          {/* Greeting + avatar */}
          <p>
            Hi, my name is Giancarlo Peysack{" "}
            <span className="inline-block align-middle ml-1">
              <Image
                src="/giancarlo.jpg"
                alt="Giancarlo Peysack"
                width={56}
                height={56}
                priority
                className="avatar inline-block rounded-full object-cover align-middle"
              />
            </span>
          </p>

          <p className="mt-7 sm:mt-6">I like to build stuff.</p>

          {/* Live projects */}
          <p className="mt-7 sm:mt-6">
            Live:{" "}
            <span className="tile-row ml-2">
              <PhoneTile
                href={LINKS.marketops}
                label="MarketOpsIQ"
                tooltip="MarketOpsIQ — AI shelf price intel"
                bg="#0F1116"
                fg="#FFFFFF"
                letter="M"
              />
              <PhoneTile
                href={LINKS.genzi}
                label="Genzi"
                tooltip="Genzi"
                bg="#161B2C"
                fg="#B65BFF"
                letter="z"
              />
            </span>
          </p>

          {/* Coming soon */}
          <p className="mt-7 sm:mt-6">Coming soon:</p>
          <ul className="mt-4 sm:mt-3 space-y-4 sm:space-y-3 list-none pl-0">
            <li className="flex items-center gap-3">
              <span
                aria-hidden
                className="coming-icon inline-flex items-center justify-center"
                style={{
                  background: "#0A66C2",
                  color: "white",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                in
              </span>
              <span>
                LinkedIn weekly tool —{" "}
                <Link href={LINKS.waitlistLinkedIn}>Join waitlist →</Link>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span
                aria-hidden
                className="coming-icon inline-flex items-center justify-center"
                style={{
                  background: "#111111",
                  color: "white",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ✦
              </span>
              <span>
                Content agent tool —{" "}
                <Link href={LINKS.waitlistContent}>Join waitlist →</Link>
              </span>
            </li>
          </ul>

          {/* Socials */}
          <p className="mt-8 sm:mt-7">
            I also post about building on{" "}
            <span className="tile-row ml-2">
              <SocialTile
                href={LINKS.linkedin}
                label="LinkedIn"
                tooltip="@gcpeysack"
                bg="#0A66C2"
              >
                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: "65%", height: "65%" }}>
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
                </svg>
              </SocialTile>
              <SocialTile
                href={LINKS.tiktok}
                label="TikTok"
                tooltip="TikTok (coming soon)"
                bg="#000000"
              >
                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: "65%", height: "65%" }}>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.07A6.33 6.33 0 0 0 5.8 20.6a6.34 6.34 0 0 0 10.86-4.43V9.62a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-1.05z"/>
                </svg>
              </SocialTile>
              <SocialTile
                href={LINKS.instagram}
                label="Instagram"
                tooltip="Instagram (coming soon)"
                bg="linear-gradient(135deg, #FFD600 0%, #FF7A00 30%, #FF0069 60%, #D300C5 80%, #7638FA 100%)"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: "65%", height: "65%" }}>
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.8"/>
                  <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8"/>
                  <circle cx="17.3" cy="6.7" r="1.1" fill="white"/>
                </svg>
              </SocialTile>
              <SocialTile
                href={LINKS.substack}
                label="Substack"
                tooltip="Substack (coming soon)"
                bg="#FF6719"
              >
                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: "65%", height: "65%" }}>
                  <path d="M4 4h16v2.5H4V4zm0 4.5h16V11H4V8.5zM4 13h16v8l-8-4.5L4 21v-8z"/>
                </svg>
              </SocialTile>
            </span>
          </p>

          {/* Divider */}
          <hr className="my-12 border-0 border-t border-gray-200" />

          {/* Contact CTAs */}
          <div className="space-y-3.5 sm:space-y-2.5">
            <p>
              Want to pilot MarketOpsIQ for your company?{" "}
              <Link href={LINKS.pilot} target="_blank" rel="noopener noreferrer">
                Click here.
              </Link>
            </p>
            <p>
              Want to sponsor one of my videos?{" "}
              <Link href={LINKS.sponsor}>Click here.</Link>
            </p>
            <p>
              Want to say hi? <Link href={LINKS.sayHi}>Click here.</Link>
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
