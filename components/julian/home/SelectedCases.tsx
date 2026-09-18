import { homeContent } from "@/content/home";
import { caseStudies, homeProjectOrder, projectHref } from "@/content/projects";
import { InViewAppear } from "@/components/julian/fx/effects";
import { Button } from "@/components/julian/ui/Button";
import { ProjectCard } from "@/components/julian/ui/ProjectCard";
import text from "@/components/julian/ui/text.module.css";
import { later, now, phoneLate, up20, up60 } from "./fx";
import s from "./home.module.css";

const ROWS = [s.row1, s.row2, s.row3, s.row4, s.row5, s.row6];

/** "Selected cases": the six project cards in a zigzag of fixed rows. */
export function SelectedCases() {
  const { heading, button } = homeContent.selectedCases;
  const cards = homeProjectOrder.map((slug) => caseStudies.find((c) => c.slug === slug)!);
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
            <h1 className={`${text.t} ${text.h1}`} style={{ textAlign: "center" }}>
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

        <div className={s.casesList}>
          {cards.map((study, i) => (
            <div key={study.slug} className={`${s.caseRow} ${ROWS[i]}`}>
              <div className={s.caseBox}>
                <ProjectCard
                  project={study.card.name}
                  year={study.card.year}
                  image={study.card.image}
                  image2={study.card.image2}
                  link={projectHref(study.slug)}
                  className={s.caseCard}
                  sizes="(min-width: 810px) 400px, 80vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
