"use client";

// Section "Awards" (.framer-154ihux): header row (title + three-line quote)
// and the "awards" component instances (class framer-Wo3Pz). Each row reveals
// in view (60px, delay .1 s); the title (appear id 4yyjn8) and the source
// (gr1wdk, to opacity .7) are load-time appears. Phone uses the "Mobile"
// variant (stacked).
import { Appear, InViewAppear } from "@/components/julian/fx/effects";
import { Label } from "@/components/julian/ui/Label";
import { aboutContent, type AboutAward } from "@/content/about";
import { sectionCls } from "./ExperienceSection";
import { enterUp60, loadUp, revealLater, revealNow, revealSoon } from "./fx";
import { bodyCls, h1Cls, h4Cls, monoCls } from "./typography";

export function AwardsSection() {
  const { awards } = aboutContent;
  return (
    <section data-name="Awards" className={sectionCls}>
      <div className="flex w-full max-w-[1400px] flex-col items-start gap-[64px] overflow-clip tablet:gap-[100px] desktop:gap-[51px]">
        <div className="flex w-full flex-none flex-col items-start justify-start gap-[64px] tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-0">
          <div className="flex w-[379px] flex-none flex-col items-start gap-[18px]">
            <InViewAppear
              enter={enterUp60}
              animate={{ transition: revealNow }}
              animateOnce
              threshold={0}
              className="flex h-[22px] w-auto flex-none items-center"
            >
              <Label title={awards.label} />
            </InViewAppear>
            <InViewAppear
              enter={enterUp60}
              animate={{ transition: revealSoon }}
              animateOnce
              threshold={0}
              className="w-full flex-none whitespace-pre-wrap break-words"
            >
              <h1 className={h1Cls}>{awards.title}</h1>
            </InViewAppear>
          </div>
          <InViewAppear
            enter={enterUp60}
            animate={{ transition: revealLater }}
            animateOnce
            threshold={0}
            className="h-auto w-auto flex-none whitespace-pre"
          >
            <p className={`${bodyCls} text-[#8f8f8f]`}>
              {awards.quote.map((line, i) => (
                <span key={i} className="contents">
                  {i > 0 && <br />}
                  <span className="text-[#a3a3a3]">{line}</span>
                </span>
              ))}
            </p>
          </InViewAppear>
        </div>

        <div className="flex w-full flex-none flex-col items-start gap-[24px] rounded-[21px] pb-[32px]">
          {awards.items.map((item, i) => (
            <div key={i} className="h-auto w-full flex-none">
              <AwardRow item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardRow({ item }: { item: AboutAward }) {
  return (
    <InViewAppear
      enter={enterUp60}
      animate={{ transition: revealSoon }}
      animateOnce
      threshold={0}
      className="relative flex w-full flex-col items-start justify-start gap-[29px] py-[7px] after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-[#0a0a0a] after:content-[''] tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-0"
    >
      <div className="flex w-min flex-none flex-col items-start justify-center gap-[20px]">
        <div className="h-auto w-auto flex-none whitespace-pre">
          <p className={`${monoCls} text-[#8f8f8f]`}>{item.year}</p>
        </div>
        <Appear {...loadUp(20, 0.5)} className="w-[310px] flex-none whitespace-pre-wrap break-words">
          <h4 className={`${h4Cls} text-[#f0f0f0]`}>{item.title}</h4>
        </Appear>
      </div>
      <Appear
        {...loadUp(20, 0.5, 0.7)}
        className="h-auto w-auto flex-none whitespace-pre tablet:w-[320px] tablet:whitespace-pre-wrap tablet:break-words"
      >
        <p className={`${bodyCls} text-right text-white`}>{item.source}</p>
      </Appear>
    </InViewAppear>
  );
}
