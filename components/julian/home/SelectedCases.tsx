import { homeContent } from "@/content/home";
import { InViewAppear } from "@/components/julian/fx/effects";
import { Button } from "@/components/julian/ui/Button";
import text from "@/components/julian/ui/text.module.css";
import { later, now, phoneLate, up20, up60 } from "./fx";
import { CaseRows } from "./CaseRows";
import s from "./home.module.css";

/**
 * The work. The template put six small cards in a zigzag of fixed rows,
 * which read as a grid of thumbnails; the projects now get a full-bleed row
 * each, with their own imagery behind them (see CaseRows).
 */
export function SelectedCases() {
  const { heading, button } = homeContent.selectedCases;
  return (
    <section className={s.section} id="about-1" data-name="Projects">
      <div className={s.casesWrapper}>
        <div className={s.casesHeader}>
          <InViewAppear
            className={`${s.rt} ${s.heading}`}
            enter={{ desktop: up60, phone: up20 }}
            animate={{ desktop: { transition: now }, phone: { transition: phoneLate } }}
            animateOnce
            threshold={0}
          >
            <h1 className={`${text.t} ${text.h1}`} style={{ textAlign: "left" }}>
              {heading}
            </h1>
          </InViewAppear>
          <InViewAppear className={`${s.autoBox} ${s.notPhone}`} enter={up20} animate={{ transition: later }} animateOnce threshold={0.5}>
            <Button text={button.text} link={button.link} />
          </InViewAppear>
          <InViewAppear className={`${s.autoBox} ${s.phoneOnly}`} enter={up20} animate={{ transition: later }} animateOnce threshold={0.5}>
            <Button text={button.text} link={button.link} variant="No-hover" />
          </InViewAppear>
        </div>
      </div>

      <CaseRows />
    </section>
  );
}
