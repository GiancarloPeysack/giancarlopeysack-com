import Image from "next/image";
import Link from "next/link";
import { BrandTile } from "@/components/BrandTile";
import {
  LinkedInIcon,
  TikTokIcon,
  InstagramIcon,
  SubstackIcon,
} from "@/components/SocialIcons";

const LINKS = {
  marketops: "https://marketopsiq.com",
  genzi: "https://genzi.app",
  waitlistLinkedIn:
    "mailto:gc.peysack@gmail.com?subject=Waitlist%3A%20Riff&body=Please%20add%20me%20to%20the%20Riff%20waitlist.",
  waitlistContent:
    "mailto:gc.peysack@gmail.com?subject=Waitlist%3A%20Atom&body=Please%20add%20me%20to%20the%20Atom%20waitlist.",
  linkedin: "https://linkedin.com/in/gcpeysack",
  tiktok: "#",
  instagram: "#",
  substack: "https://substack.com/@giancarlopeysack351293",
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
            fontWeight: 400,
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

          {/* AI products: B2B + consumer, both inline */}
          <p className="mt-7 sm:mt-6">
            I make B2B and consumer apps{" "}
            <span className="tile-row align-middle ml-2">
              <BrandTile
                href={LINKS.marketops}
                label="MarketOpsIQ"
                tooltip="MarketOpsIQ · AI shelf intel for CPG"
                bg="#0F1116"
                fg="#FFFFFF"
                letter="M"
              />
              <BrandTile
                href={LINKS.genzi}
                label="Genzi"
                tooltip="Genzi"
                bg="#161B2C"
                fg="#B65BFF"
                letter="z"
                letterOffsetY={-2}
              />
            </span>
          </p>
          {/* Share about building (all the channels — socials + substack) */}
          <p className="mt-7 sm:mt-6">
            and share about building{" "}
            <span className="tile-row align-middle ml-2">
              <BrandTile
                href={LINKS.linkedin}
                label="LinkedIn"
                tooltip="@gcpeysack"
                bg="#0A66C2"
              >
                <LinkedInIcon />
              </BrandTile>
              <BrandTile
                href={LINKS.tiktok}
                label="TikTok"
                tooltip="TikTok (soon)"
                bg="#000000"
              >
                <TikTokIcon />
              </BrandTile>
              <BrandTile
                href={LINKS.instagram}
                label="Instagram"
                tooltip="Instagram (soon)"
                bg="linear-gradient(135deg, #FFD600 0%, #FF7A00 30%, #FF0069 60%, #D300C5 80%, #7638FA 100%)"
              >
                <InstagramIcon />
              </BrandTile>
              <BrandTile
                href={LINKS.substack}
                label="Substack"
                tooltip="@giancarlopeysack"
                bg="#FF6719"
              >
                <SubstackIcon />
              </BrandTile>
            </span>
          </p>

          {/* Launching soon + waitlist (merged) */}
          <p className="mt-7 sm:mt-6">
            Join the waitlist for my content creation tools{" "}
            <span className="tile-row align-middle ml-2">
              <BrandTile
                href={LINKS.waitlistLinkedIn}
                label="AI LinkedIn growth tool, join waitlist"
                tooltip="AI LinkedIn growth tool"
                bg="#15101A"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                  style={{ width: "60%", height: "60%" }}
                >
                  <path
                    d="M7 17 L17 7 M10 7 L17 7 L17 14"
                    stroke="#FF6B4A"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </BrandTile>
              <BrandTile
                href={LINKS.waitlistContent}
                label="AI video creation tool, join waitlist"
                tooltip="AI short-form video tool"
                bg="#0F1A1F"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="#4ADE80"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                  style={{ width: "58%", height: "58%", transform: "translateX(1px)" }}
                >
                  <path d="M7 5.5 L7 18.5 L19 12 Z" />
                </svg>
              </BrandTile>
            </span>
          </p>

          {/* Divider */}
          <hr className="my-8 border-0 border-t border-gray-200" />

          {/* Contact CTAs */}
          <div className="space-y-3.5 sm:space-y-2.5">
            <p>
              Looking to pilot MarketOpsIQ for your company?{" "}
              <Link href="/pilot">Click here.</Link>
            </p>
            <p>
              Interested in sponsoring a video?{" "}
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
