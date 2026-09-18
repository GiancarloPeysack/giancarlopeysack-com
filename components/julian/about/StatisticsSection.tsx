"use client";

// Section "Statistics" (.framer-2wggvf): 4 counters + 4 spacers in a grid
// (4 columns on desktop, 3 on tablet with reordering, a 2-column masonry on
// phone). Every grid item slides up 80px in view (no fade).
import { InViewAppear } from "@/components/julian/fx/effects";
import { aboutContent } from "@/content/about";
import styles from "./about.module.css";
import { statsEnter, statsTransition } from "./fx";
import { NumberCounter } from "./NumberCounter";
import { captionCls } from "./typography";

// Literal class names so Tailwind generates them (it can't see built strings).
const cardAlign: Record<number, string> = { 0: "items-start", 1: "items-center", 2: "items-center", 3: "items-end" };
const cardClass = [styles.card1, styles.card2, styles.card3, styles.card4];
const spacerClass = [styles.spacer1, styles.spacer2, styles.spacer3, styles.spacer4];

// Desktop / tablet DOM order of the 8 grid items (Framer canvas order).
const gridOrder: Array<{ kind: "card"; i: number } | { kind: "spacer"; i: number }> = [
  { kind: "card", i: 0 },
  { kind: "spacer", i: 0 },
  { kind: "card", i: 1 },
  { kind: "spacer", i: 1 },
  { kind: "spacer", i: 2 },
  { kind: "card", i: 2 },
  { kind: "spacer", i: 3 },
  { kind: "card", i: 3 },
];

// Phone masonry (2 tracks, items placed into the shortest track in the order
// rtZAgTbiS, iNnA3BJu_, NN6T8vfK9, z81SkHuEC, qvg5dDtSb, qQpj4WaJI, SsltRL9SZ, hlzlFBLpc).
const phoneColumns: Array<typeof gridOrder> = [
  [
    { kind: "card", i: 0 },
    { kind: "spacer", i: 1 },
    { kind: "card", i: 2 },
    { kind: "spacer", i: 3 },
  ],
  [
    { kind: "spacer", i: 0 },
    { kind: "card", i: 1 },
    { kind: "spacer", i: 2 },
    { kind: "card", i: 3 },
  ],
];

const reveal = { enter: statsEnter, animate: { transition: statsTransition }, animateOnce: true, threshold: 0 };

export function StatisticsSection() {
  const { items } = aboutContent.stats;

  return (
    <section
      data-name="Statistics"
      className="relative z-[3] flex w-full flex-col items-center gap-[49px] bg-black px-[20px] pb-[64px] pt-[120px] tablet:gap-[40px] tablet:px-[32px] tablet:pb-[100px] tablet:pt-[128px] desktop:gap-0 desktop:py-[53px]"
    >
      {/* tablet and desktop: CSS grid */}
      <div className={styles.statsGrid}>
        {gridOrder.map((it) =>
          it.kind === "card" ? (
            <InViewAppear key={`c${it.i}`} {...reveal} className={`${styles.statItem} ${cardClass[it.i]}`}>
              <NumberCounter
                start={items[it.i].start}
                end={items[it.i].end}
                prefix={items[it.i].prefix}
                suffix={items[it.i].suffix}
              />
              <div className="h-auto w-auto flex-none whitespace-pre">
                <p className={`${captionCls} text-right text-[#8f8f8f]`}>{items[it.i].label}</p>
              </div>
            </InViewAppear>
          ) : (
            <InViewAppear key={`s${it.i}`} {...reveal} className={`${styles.statItem} ${spacerClass[it.i]}`} />
          ),
        )}
      </div>

      {/* phone: two masonry columns */}
      {/* The grid keeps the template's 2 explicit rows: the second stays empty
          but its 8px row gap still counts toward the height. */}
      <div className="relative grid w-full max-w-[1400px] grid-cols-2 grid-rows-[repeat(2,min-content)] auto-rows-min gap-[8px] rounded-[21px] tablet:hidden">
        {phoneColumns.map((column, c) => (
          <div key={c} className="flex flex-col gap-[8px]">
            {column.map((it) =>
              it.kind === "card" ? (
                <InViewAppear
                  key={`pc${it.i}`}
                  {...reveal}
                  className={`relative flex w-full flex-none flex-col justify-center gap-[16px] rounded-[13px] ${cardAlign[it.i]}`}
                >
                  <NumberCounter
                    start={items[it.i].start}
                    end={items[it.i].end}
                    prefix={items[it.i].prefix}
                    suffix={items[it.i].suffix}
                  />
                  <div className="h-auto w-auto flex-none whitespace-pre">
                    <p className={`${captionCls} text-center text-[#8f8f8f]`}>{items[it.i].phoneLabel}</p>
                  </div>
                </InViewAppear>
              ) : (
                <InViewAppear
                  key={`ps${it.i}`}
                  {...reveal}
                  className="relative flex min-h-[200px] w-full flex-none flex-col items-start justify-center gap-[16px] rounded-[13px]"
                />
              ),
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
