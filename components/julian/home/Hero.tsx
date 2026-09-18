import Image from "next/image";
import { homeContent } from "@/content/home";
import { Appear, Parallax, type FxState } from "@/components/julian/fx/effects";
import { Label } from "@/components/julian/ui/Label";
import text from "@/components/julian/ui/text.module.css";
import s from "./home.module.css";

// Load appears of the hero (appear JSON of the Home page).
const rise = (delay: number): { initial: FxState; animate: FxState } => ({
  initial: { opacity: 0.001, y: 90 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", damping: 60, stiffness: 300, mass: 1, delay } },
});
// 1ejl7m2: the portrait settles from 1.3x on load
const ZOOM: { initial: FxState; animate: FxState } = {
  initial: { opacity: 1, scale: 1.3 },
  animate: { opacity: 1, scale: 1, transition: { type: "tween", duration: 1, ease: [0.75, 0.25, 1, 1], delay: 0 } },
};

// Fit-text boxes for the name on tablet and phone. Both lines share the width
// of the longer word ("Giancarlo" renders 749px wide at 165px in Neutral
// Sans), so the two lines scale together and keep the same size. Re-measure if
// the name changes.
const FIT = { viewBox: "0 0 750 132", fontSize: 165 };
const NAME_FIT = {
  first: { tablet: FIT, phone: FIT },
  last: { tablet: FIT, phone: FIT },
};

export function Hero() {
  const { portrait, firstName, lastName, tagline, labels } = homeContent.hero;
  return (
    <section className={s.hero} data-name="Hero">
      <div className={s.heroWrapper}>
        <div className={s.heroTop}>
          <Appear className={`${s.heroImage} ${s.notPhone}`} {...ZOOM}>
            <Image src={portrait.src} alt={portrait.alt} fill unoptimized priority sizes="416px" />
          </Appear>
          <Appear className={`${s.heroImage} ${s.phoneOnly}`} transformTemplate="translate(-50%, -50%) {}" {...ZOOM}>
            <Image src={portrait.src} alt={portrait.alt} fill unoptimized priority sizes="282px" />
          </Appear>

          <div className={s.heroName}>
            <NameLine word={firstName} fit={NAME_FIT.first} />
            <NameLine word={lastName} fit={NAME_FIT.last} last />
          </div>

          <div className={s.overview}>
            {tagline.map((line) => (
              <Parallax key={line} speed={110} className={s.overviewLine}>
                <Appear className={`${s.rt} ${s.overviewInner}`} {...rise(1.1)}>
                  <p className={`${text.t} ${text.copyright} ${s.overviewText}`}>{line}</p>
                </Appear>
              </Parallax>
            ))}
          </div>
        </div>

        <Appear className={s.bottom} {...rise(0.5)}>
          {labels.map((label) => (
            <div key={label} className={s.labelBox}>
              <Label title={label} />
            </div>
          ))}
        </Appear>
      </div>
    </section>
  );
}

type Fit = { viewBox: string; fontSize: number };

// One name line: parallax (speed 120) outside, load appear inside. The blend
// mode sits on the outer element so the text still blends with the portrait.
function NameLine({ word, fit, last = false }: { word: string; fit: { tablet: Fit; phone: Fit }; last?: boolean }) {
  const line = `${s.nameLine} ${last ? s.nameLast : ""}`;
  return (
    <>
      <Parallax speed={120} className={`${line} ${s.desktopOnly}`}>
        <Appear className={s.nameInner} {...rise(1)}>
          <p className={s.nameText}>{word}</p>
        </Appear>
      </Parallax>
      <Parallax speed={120} className={`${line} ${s.tabletOnly}`}>
        <FitName word={word} fit={fit.tablet} />
      </Parallax>
      <Parallax speed={120} className={`${line} ${s.phoneOnly}`}>
        <FitName word={word} fit={fit.phone} />
      </Parallax>
    </>
  );
}

// Framer "fit text": the text is laid out in the viewBox's coordinate space
// and the svg scales it to the line's width.
function FitName({ word, fit }: { word: string; fit: Fit }) {
  return (
    <Appear as="svg" className={s.nameInner} viewBox={fit.viewBox} {...rise(1)}>
      <foreignObject
        className={s.fitText}
        width="100%"
        height="100%"
        style={{ overflow: "visible", transformOrigin: "center center" }}
        transform="scale(1)"
      >
        <p className={s.nameText} style={{ fontSize: `${fit.fontSize}px` }}>
          {word}
        </p>
      </foreignObject>
    </Appear>
  );
}
