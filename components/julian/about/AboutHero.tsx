"use client";

// Section "About me" (.framer-ryzb0d): portrait, label, bio, signature.
// All four pieces are load-time appears (appear JSON ids 1i6gne0, rqwbh8,
// pm1pgm, 10htzl8).
import Image from "next/image";
import { Appear } from "@/components/julian/fx/effects";
import { Label } from "@/components/julian/ui/Label";
import { aboutContent } from "@/content/about";
import { loadUp } from "./fx";
import { bioCls } from "./typography";

export function AboutHero() {
  const { hero } = aboutContent;
  const [first, second] = hero.paragraphs;
  return (
    <section
      data-name="About me"
      className="relative z-[3] flex w-full flex-col items-center bg-black px-[20px] pb-[150px] pt-[124px] tablet:px-[32px]"
    >
      <div className="flex w-full max-w-[1400px] flex-col items-center gap-[64px] desktop:flex-row">
        <Appear
          {...loadUp(28, 1)}
          className="relative aspect-[0.717188] w-full flex-none rounded-[13px] tablet:aspect-[0.876011] desktop:aspect-[0.717188] desktop:w-px desktop:flex-[1_0_0]"
        >
          <Image
            src={hero.portrait.src}
            alt={hero.portrait.alt}
            fill
            unoptimized
            priority
            className="rounded-[13px] object-cover object-center"
          />
        </Appear>

        <div className="flex w-full flex-none flex-col items-start justify-start gap-[64px] rounded-[13px] tablet:h-[640px] tablet:justify-between tablet:gap-0 tablet:p-[22px] desktop:w-[587px]">
          <div className="flex w-full flex-none flex-col items-start gap-[18px]">
            <Appear {...loadUp(23, 0.9)} className="flex h-[22px] w-auto flex-none items-center">
              <Label title={hero.label} />
            </Appear>
            <Appear {...loadUp(23, 1)} className="w-full flex-none">
              <p className={`${bioCls} text-balance`}>{first}</p>
              <p className={`${bioCls} mt-[20px]`}>
                <br />
              </p>
              <p className={`${bioCls} mt-[20px] text-balance`}>{second}</p>
            </Appear>
          </div>
          {hero.signature && (
            <Appear {...loadUp(23, 1.1)} className="relative h-[66px] w-[181px] flex-none overflow-clip">
              <Image src={hero.signature.src} alt={hero.signature.alt} fill unoptimized className="object-cover object-center" />
            </Appear>
          )}
        </div>
      </div>
    </section>
  );
}
