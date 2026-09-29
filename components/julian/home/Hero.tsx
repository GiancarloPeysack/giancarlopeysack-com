import Image from "next/image";
import { homeContent } from "@/content/home";
import { Appear, Parallax, type FxState } from "@/components/julian/fx/effects";
import { Button } from "@/components/julian/ui/Button";
import { SmartLink } from "@/components/julian/ui/SmartLink";
import { HeroVideo } from "./HeroVideo";
import { LocalTime } from "./LocalTime";
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
// of the longer word, so the two lines scale together and keep the same size.
// Measured in the browser in Instrument Serif at 165px: "Peysack" is 431.6px
// wide and "Gianni" 370.13px. Re-measure if the name or the face changes.
const FIT = { viewBox: "0 0 432 132", fontSize: 165 };
const NAME_FIT = { first: { phone: FIT }, last: { phone: FIT } };

export function Hero() {
  const { portrait, band, firstName, lastName, tagline, actions, labels } = homeContent.hero;
  return (
    <section className={s.hero} data-name="Hero">
      <div className={s.heroWrapper}>
        <div className={s.heroTop}>
          {/* The footage is the stage: three clips side by side on desktop
              and tablet, one vertical clip on phone, with the name and the
              call to action set on top of it. Only the frame for the live
              breakpoint loads its video. */}
          <div className={s.heroStage}>
            <Appear className={`${s.heroBand} ${s.notPhone}`} {...ZOOM}>
              <Image src={band.poster} alt={band.alt} fill unoptimized priority sizes="(min-width: 1200px) 1336px, 92vw" />
              <HeroVideo />
            </Appear>
            <Appear className={`${s.heroPortrait} ${s.phoneOnly}`} {...ZOOM}>
              <Image src={portrait.src} alt={portrait.alt} fill unoptimized priority sizes="86vw" />
              <HeroVideo phone />
            </Appear>

            <div className={s.heroOverlay}>
              {/* The words are held to the width of the first panel, which is
                  the one shot with nobody in it. Anything wider would run
                  across him in the panel next door. */}
              <div className={s.heroCopy}>
                <div className={s.heroName}>
                  <NameLine word={firstName} fit={NAME_FIT.first} />
                  <NameLine word={lastName} fit={NAME_FIT.last} last />
                </div>

                <div className={s.overview}>
                  {tagline.map((line) => (
                    <Appear key={line} className={`${s.rt} ${s.overviewInner}`} {...rise(1.1)}>
                      <p className={`${text.t} ${s.heroTaglineText} ${s.overviewText}`}>{line}</p>
                    </Appear>
                  ))}
                </div>

                <Appear className={s.heroActions} {...rise(1.2)}>
                  <Button text={actions.primary.text} link={actions.primary.link} variant="Solid" />
                  <SmartLink className={s.heroSecondary} href={actions.secondary.link}>
                    {actions.secondary.text}
                  </SmartLink>
                </Appear>
              </div>
            </div>
          </div>
        </div>

        <Appear className={s.bottom} {...rise(0.5)}>
          {labels.map((label, i) => (
            <div key={label} className={s.labelBox}>
              {i === 0 ? <LocalTime place={label} /> : <Label title={label} />}
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
function NameLine({ word, fit, last = false }: { word: string; fit: { phone: Fit }; last?: boolean }) {
  const line = `${s.nameLine} ${last ? s.nameLast : ""}`;
  return (
    <>
      {/* Tablet used to fit the name to a fixed 300px box, which on a short
          window made it taller than the film behind it. Desktop and tablet
          now share the fluid size; only the phone still fits to its width. */}
      <Parallax speed={120} className={`${line} ${s.notPhone}`}>
        <Appear className={s.nameInner} {...rise(1)}>
          <p className={s.nameText}>{word}</p>
        </Appear>
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
