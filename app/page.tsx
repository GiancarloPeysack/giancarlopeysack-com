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
    "mailto:gc.peysack@gmail.com?subject=Waitlist%3A%20LinkedIn%20weekly%20tool&body=Please%20add%20me%20to%20the%20waitlist.",
  waitlistContent:
    "mailto:gc.peysack@gmail.com?subject=Waitlist%3A%20Content%20agent%20tool&body=Please%20add%20me%20to%20the%20waitlist.",
  linkedin: "https://linkedin.com/in/gcpeysack",
  tiktok: "#",
  instagram: "#",
  substack: "#",
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

          <p className="mt-7 sm:mt-6">
            I make B2B software and consumer apps.
          </p>

          {/* Live projects */}
          <p className="mt-7 sm:mt-6">
            Right now I&apos;m building{" "}
            <span className="tile-row align-middle ml-2">
              <BrandTile
                href={LINKS.marketops}
                label="MarketOpsIQ"
                tooltip="MarketOpsIQ"
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
              />
            </span>
          </p>

          {/* Launching soon */}
          <p className="mt-7 sm:mt-6">
            Launching soon{" "}
            <span className="tile-row align-middle ml-2">
              <BrandTile
                href={LINKS.waitlistLinkedIn}
                label="LinkedIn weekly tool — join waitlist"
                tooltip="LinkedIn weekly tool"
                bg="#0A66C2"
                fg="#FFFFFF"
              >
                <span
                  className="text-white font-extrabold leading-none"
                  style={{ fontSize: "18px", letterSpacing: "-0.04em" }}
                >
                  in
                </span>
              </BrandTile>
              <BrandTile
                href={LINKS.waitlistContent}
                label="Content agent tool — join waitlist"
                tooltip="Content agent tool"
                bg="#111111"
                fg="#FFFFFF"
              >
                <span
                  className="text-white leading-none"
                  style={{ fontSize: "22px" }}
                >
                  ✦
                </span>
              </BrandTile>
            </span>
          </p>

          {/* Socials */}
          <p className="mt-7 sm:mt-6">
            I also post on{" "}
            <span className="tile-row stack align-middle ml-2">
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
                tooltip="Substack (soon)"
                bg="#FF6719"
              >
                <SubstackIcon />
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
