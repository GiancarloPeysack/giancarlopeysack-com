"use client";

// Section "Proccess" (sic, .framer-12dcm4j): sticky left header, three step
// cards on the right. Step 1 texts reveal in view (delays 0 / .1 / .2 s).
// Step 2 and 3 texts are load-time appears (delay .5 s); on phone their titles
// become in-view reveals instead (page module override for AtLyufpXF).
import { Appear, InViewAppear, useBreakpoint } from "@/components/julian/fx/effects";
import { Label } from "@/components/julian/ui/Label";
import { aboutContent } from "@/content/about";
import { enterUp20, enterUp60, loadUp, revealLater, revealNow, revealPhone, revealSoon } from "./fx";
import { bodyCls, h1Cls, h2Cls, monoCls } from "./typography";

const rowJustify = ["justify-center", "justify-start", "justify-end"];

export function ProcessSection() {
  const { process } = aboutContent;
  const phone = useBreakpoint() === "phone";

  return (
    <section
      data-name="Proccess"
      className="relative z-[3] flex w-full flex-col items-center gap-[50px] bg-black px-[20px] py-[64px] tablet:px-[32px] tablet:py-[100px] desktop:py-[150px]"
    >
      <div className="flex w-full max-w-[1400px] flex-col items-start justify-center gap-0 tablet:flex-row tablet:gap-[64px]">
        {/* Left content: sticky from tablet up */}
        <div className="relative z-[1] flex w-full flex-none flex-col items-end justify-end gap-[66px] tablet:sticky tablet:top-[80px] tablet:w-px tablet:flex-[1_0_0]">
          <div className="flex w-full flex-none flex-col items-start gap-[18px]">
            <InViewAppear
              enter={enterUp60}
              animate={{ transition: revealNow }}
              animateOnce
              threshold={0}
              className="flex h-[22px] w-auto flex-none items-center"
            >
              <Label title={process.label} />
            </InViewAppear>
            <InViewAppear
              enter={enterUp60}
              animate={{ transition: revealSoon }}
              animateOnce
              threshold={0}
              className="w-full flex-none whitespace-pre-wrap break-words"
            >
              <h1 className={h1Cls}>{process.title}</h1>
            </InViewAppear>
          </div>
          <InViewAppear
            enter={enterUp60}
            animate={{ transition: revealLater }}
            animateOnce
            threshold={0}
            className="w-[60%] flex-none text-balance"
          >
            <p className={`${bodyCls} text-[#8f8f8f]`}>{process.intro}</p>
          </InViewAppear>
        </div>

        {/* Right content: steps */}
        <div className="flex w-full flex-none flex-col items-start gap-[26px] tablet:w-px tablet:flex-[1_0_0]">
          {process.steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex w-full flex-none flex-row items-center gap-[10px] overflow-clip ${rowJustify[i]}`}
            >
              <div
                className={`flex h-[397px] w-[277px] flex-none flex-col items-start justify-end gap-[20px] rounded-[13px] ${
                  i === 0 ? "overflow-visible" : "overflow-hidden"
                }`}
              >
                <div className="flex w-full flex-none flex-col items-start gap-[6px]">
                  {i === 0 ? (
                    <InViewAppear
                      enter={enterUp60}
                      animate={{ transition: revealNow }}
                      animateOnce
                      threshold={0}
                      className="w-full flex-none whitespace-pre-wrap break-words"
                    >
                      <StepNumber value={step.number} />
                    </InViewAppear>
                  ) : (
                    <div className="w-full flex-none whitespace-pre-wrap break-words">
                      <StepNumber value={step.number} />
                    </div>
                  )}

                  {i === 0 ? (
                    <InViewAppear
                      enter={enterUp60}
                      animate={{ transition: revealSoon }}
                      animateOnce
                      threshold={0}
                      className="w-full flex-none text-balance"
                    >
                      <h2 className={h2Cls}>{step.title}</h2>
                    </InViewAppear>
                  ) : phone ? (
                    <InViewAppear
                      enter={enterUp20}
                      animate={{ transition: revealPhone }}
                      animateOnce
                      threshold={0}
                      className={`w-full flex-none ${i === 1 ? "text-balance" : "whitespace-pre-wrap break-words"}`}
                    >
                      <h2 className={h2Cls}>{step.title}</h2>
                    </InViewAppear>
                  ) : (
                    <Appear
                      {...loadUp(20, 0.5)}
                      className={`w-full flex-none ${i === 1 ? "text-balance" : "whitespace-pre-wrap break-words"}`}
                    >
                      <h2 className={h2Cls}>{step.title}</h2>
                    </Appear>
                  )}
                </div>

                {i === 0 ? (
                  <InViewAppear
                    enter={enterUp60}
                    animate={{ transition: revealLater }}
                    animateOnce
                    threshold={0}
                    className="w-full flex-none whitespace-pre-wrap break-words"
                  >
                    <p className={`${bodyCls} text-[#8f8f8f]`}>{step.description}</p>
                  </InViewAppear>
                ) : (
                  <Appear {...loadUp(20, 0.5)} className="w-full flex-none whitespace-pre-wrap break-words">
                    <p className={`${bodyCls} text-[#8f8f8f]`}>{step.description}</p>
                  </Appear>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// "01" is a <strong> inside a label-preset paragraph; the preset's bold weight
// for Chivo Mono is 400.
function StepNumber({ value }: { value: string }) {
  return (
    <p className={`${monoCls} text-[#a3a3a3]`}>
      <strong className="font-normal">{value}</strong>
    </p>
  );
}
