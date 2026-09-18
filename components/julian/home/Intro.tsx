import { homeContent } from "@/content/home";
import { InViewAppear } from "@/components/julian/fx/effects";
import { Button } from "@/components/julian/ui/Button";
import { Label } from "@/components/julian/ui/Label";
import { later, soon, up20, up60 } from "./fx";
import { LogoTicker } from "./LogoTicker";
import { RevealText } from "./RevealText";
import s from "./home.module.css";

export function Intro() {
  const { label, reveal, logos, button } = homeContent.intro;
  return (
    <section className={s.section} id="About" data-name="Intro">
      <div className={s.introWrapper}>
        <InViewAppear className={s.labelBox} enter={up60} animate={{ transition: soon }} animateOnce threshold={0.5}>
          <Label title={label} />
        </InViewAppear>

        <InViewAppear className={s.reveal} enter={up60} animate={{ transition: later }} animateOnce threshold={0.5}>
          <RevealText text={reveal.desktop} className={`${s.revealText} ${s.desktopOnly}`} />
          <RevealText text={reveal.tablet} className={`${s.revealText} ${s.tabletOnly}`} />
          <RevealText text={reveal.phone} className={`${s.revealText} ${s.phoneOnly}`} />
        </InViewAppear>

        <LogoTicker logos={logos} />

        <InViewAppear className={s.autoBox} enter={up20} animate={{ transition: later }} animateOnce threshold={0.5}>
          <Button text={button.text} link={button.link} />
        </InViewAppear>
      </div>
    </section>
  );
}
