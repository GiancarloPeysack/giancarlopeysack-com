"use client";

// Section "Experience" (.framer-7ppq79): sticky header + "Experience card"
// component instances (module kz6JgVfLYqxP…, class framer-ZfxVw). Each card
// reveals in view (60px, delay .1 s); its description is a load-time appear
// (appear id 1c5sre3, 20px, delay .5 s). Phone uses the card's "mobile"
// variant (stacked).
import Image from "next/image";
import { Appear, InViewAppear } from "@/components/julian/fx/effects";
import { Label } from "@/components/julian/ui/Label";
import { aboutContent, type AboutExperience } from "@/content/about";
import { enterUp60, loadUp, revealNow, revealSoon } from "./fx";
import { bodyCls, captionCls, h1Cls, h4Cls } from "./typography";

export const sectionCls =
  "relative z-[3] flex w-full flex-col items-center justify-between bg-black px-[20px] py-[64px] tablet:justify-start tablet:gap-[100px] tablet:px-[32px] tablet:py-[100px] desktop:justify-between desktop:gap-0 desktop:pb-[100px] desktop:pt-[150px]";

export function ExperienceSection() {
  const { experience } = aboutContent;
  return (
    <section data-name="Experience" className={sectionCls}>
      <div className="flex w-full max-w-[1400px] flex-col items-start justify-start gap-[64px] tablet:gap-[100px] desktop:flex-row desktop:gap-[116px]">
        <div className="relative z-[1] flex w-full flex-none flex-col items-start gap-[18px] tablet:sticky tablet:top-[100px] tablet:w-[379px]">
          <InViewAppear
            enter={enterUp60}
            animate={{ transition: revealNow }}
            animateOnce
            threshold={0}
            className="flex h-[22px] w-auto flex-none items-center"
          >
            <Label title={experience.label} />
          </InViewAppear>
          <InViewAppear
            enter={enterUp60}
            animate={{ transition: revealSoon }}
            animateOnce
            threshold={0}
            className="w-full flex-none whitespace-pre-wrap break-words"
          >
            <h1 className={h1Cls}>{experience.title}</h1>
          </InViewAppear>
        </div>

        <div className="flex w-full flex-none flex-col items-start gap-[24px] rounded-[21px] pb-[32px] desktop:w-px desktop:flex-[1_0_0]">
          {experience.items.map((item, i) => (
            <div key={i} className="h-auto w-full flex-none">
              <ExperienceCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ item }: { item: AboutExperience }) {
  return (
    <InViewAppear
      enter={enterUp60}
      animate={{ transition: revealSoon }}
      animateOnce
      threshold={0}
      className="relative flex w-full flex-col items-start justify-start gap-x-[20px] gap-y-[36px] py-[26px] after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-[#0a0a0a] after:content-[''] tablet:flex-row"
    >
      <div className="h-auto w-auto flex-none whitespace-pre">
        <p className={`${captionCls} text-right text-[#a3a3a3]`}>{item.period}</p>
      </div>
      <div className="flex w-full flex-none flex-col items-start gap-[20px] tablet:w-px tablet:flex-[1_0_0]">
        <div className="w-full flex-none whitespace-pre-wrap break-words">
          <h4 className={`${h4Cls} text-white`}>{item.title}</h4>
        </div>
        <Appear {...loadUp(20, 0.5)} className="w-full flex-none text-balance">
          <p className={`${bodyCls} text-[#a3a3a3]`}>{item.description}</p>
        </Appear>
      </div>
      <div className="relative aspect-[1.98305] w-[117px] flex-none overflow-clip">
        <Image src={item.logo} alt="" fill unoptimized className="object-contain object-center" />
      </div>
    </InViewAppear>
  );
}
