import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";
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
  lexfall: "https://luxfall.online",
  zharo: "https://zharo.club",
  linkedin: "https://linkedin.com/in/gcpeysack",
  tiktok: "#",
  instagram: "#",
  substack: "https://giancarlopeysack.substack.com",
  sayHi: "mailto:gc.peysack@gmail.com?subject=Hi",
};

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white text-black">
      <div className="mx-auto w-full max-w-[640px] px-6 pt-16 pb-24 sm:pt-24">
        <article
          // Mobile-first sizing: bigger text on phones (matches Chris's
          // narrow-column-needs-bigger-type design), tighter on desktop.
          className="text-black text-[26px] sm:text-[22px] leading-[1.45] sm:leading-[1.55]"
          style={{
            fontWeight: 400,
            letterSpacing: "-0.005em",
          }}
        >
          {/* Greeting + click-to-zoom avatar */}
          <p>
            Hi, I&apos;m Giancarlo Peysack{" "}
            <span className="inline-block align-middle ml-1">
              <Avatar src="/giancarlo.jpg" />
            </span>
          </p>

          {/* Writing: substack tile + the real embed widget right under it */}
          <p className="mt-10 sm:mt-8">
            I like writing here{" "}
            <span className="tile-row align-middle ml-2">
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
          <div className="mt-5 sm:mt-4 flex justify-center">
            <iframe
              src="https://giancarlopeysack.substack.com/embed"
              width="480"
              height="320"
              style={{
                border: "1px solid #EEE",
                background: "white",
                maxWidth: "100%",
              }}
              frameBorder={0}
              scrolling="no"
              title="Subscribe to Giancarlo Peysack's Substack"
            />
          </div>

          {/* Apps shipped */}
          <p className="mt-10 sm:mt-8">
            I&apos;ve shipped some apps{" "}
            <span className="tile-row align-middle ml-2">
              <BrandTile
                href={LINKS.genzi}
                label="Genzi"
                tooltip="Genzi · social app for live music & nightlife"
                bg="#191E31"
              >
                <Image
                  src="/genzi-icon.png"
                  alt=""
                  width={44}
                  height={44}
                  className="h-full w-full rounded-[11px] sm:rounded-[10px]"
                />
              </BrandTile>
              <BrandTile
                href={LINKS.lexfall}
                label="Lexfall"
                tooltip="Lexfall · advanced English vocabulary"
                bg="#100E0B"
              >
                <Image
                  src="/lexfall-icon.png"
                  alt=""
                  width={44}
                  height={44}
                  className="h-full w-full rounded-[11px] sm:rounded-[10px]"
                />
              </BrandTile>
              <BrandTile
                href={LINKS.marketops}
                label="MarketOpsIQ"
                tooltip="MarketOpsIQ · AI shelf intel for CPG"
                bg="#0F1116"
                fg="#FFFFFF"
                letter="M"
              />
              <BrandTile
                href={LINKS.zharo}
                label="Zharo"
                tooltip="Zharo · Chrome extension for LinkedIn, in your voice"
                bg="#0a0a0a"
              >
                <svg viewBox="0 0 120 120" fill="none" style={{ width: "62%", height: "62%", color: "#fff" }}>
                  <defs>
                    <linearGradient id="zharoSparkTile" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#6366F1" />
                      <stop offset="1" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  <g transform="translate(52,60)">
                    <path
                      d="M 36.85 17.97 A 41 41 0 1 1 36.85 -17.97"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <circle cx="49" cy="0" r="8.5" fill="url(#zharoSparkTile)" />
                  </g>
                </svg>
              </BrandTile>
            </span>
          </p>

          {/* Social */}
          <p className="mt-10 sm:mt-8">
            I post here{" "}
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
            </span>
          </p>

          {/* Divider */}
          <hr className="my-10 sm:my-12 border-0 border-t border-gray-200" />

          {/* Contact CTAs — explicitly smaller (~70% of main paragraphs), like Chris's */}
          <div
            className="space-y-3 sm:space-y-2"
            style={{
              fontSize: "clamp(14px, 3.4vw, 16px)",
              lineHeight: 1.55,
              fontWeight: 400,
            }}
          >
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
