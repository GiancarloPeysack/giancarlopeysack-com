import Image from "next/image";
import Link from "next/link";
import { PhoneTile } from "@/components/PhoneTile";
import { SocialTile } from "@/components/SocialTile";
import {
  LinkedInIcon,
  TikTokIcon,
  InstagramIcon,
  SubstackIcon,
} from "@/components/SocialIcons";

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
  sayHi: "mailto:gc.peysack@gmail.com?subject=Hi",
};

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white text-black">
      <div className="mx-auto w-full max-w-[640px] px-6 pt-16 pb-24 sm:pt-24">
        <article
          className="text-black"
          style={{
            fontSize: "clamp(20px, 5.6vw, 26px)",
            lineHeight: 1.5,
            fontWeight: 450,
          }}
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
          <div className="mt-7 sm:mt-6">
            <p>
              Live:{" "}
              <span className="tile-row ml-2">
                <PhoneTile
                  href={LINKS.marketops}
                  label="MarketOpsIQ"
                  tooltip="MarketOpsIQ"
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
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[14px] sm:text-[14px] italic text-gray-500">
              <span>
                <span className="font-semibold not-italic text-gray-700">
                  MarketOpsIQ
                </span>
                {" · "}AI shelf intel for CPG brands
              </span>
              <span>
                <span className="font-semibold not-italic text-gray-700">
                  Genzi
                </span>
                {" · "}music social media app
              </span>
            </div>
          </div>

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
                LinkedIn weekly tool.{" "}
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
                Content agent tool.{" "}
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
                <LinkedInIcon />
              </SocialTile>
              <SocialTile
                href={LINKS.tiktok}
                label="TikTok"
                tooltip="TikTok (coming soon)"
                bg="#000000"
              >
                <TikTokIcon />
              </SocialTile>
              <SocialTile
                href={LINKS.instagram}
                label="Instagram"
                tooltip="Instagram (coming soon)"
                bg="linear-gradient(135deg, #FFD600 0%, #FF7A00 30%, #FF0069 60%, #D300C5 80%, #7638FA 100%)"
              >
                <InstagramIcon />
              </SocialTile>
              <SocialTile
                href={LINKS.substack}
                label="Substack"
                tooltip="Substack (coming soon)"
                bg="#FF6719"
              >
                <SubstackIcon />
              </SocialTile>
            </span>
          </p>

          {/* Divider */}
          <hr className="my-12 border-0 border-t border-gray-200" />

          {/* Contact CTAs */}
          <div className="space-y-3.5 sm:space-y-2.5">
            <p>
              Want to pilot MarketOpsIQ for your company?{" "}
              <Link href="/pilot">Click here.</Link>
            </p>
            <p>
              Want to sponsor one of my videos?{" "}
              <Link href="/sponsor">Click here.</Link>
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
