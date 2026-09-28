import Image from "next/image";
import Link from "next/link";
import { caseStudies, homeProjectOrder, projectHref } from "@/content/projects";
import { InViewAppear } from "@/components/julian/fx/effects";
import text from "@/components/julian/ui/text.module.css";
import c from "./sections.module.css";

const ENTER = { opacity: 0, y: 40 };
const SETTLE = { transition: { type: "spring" as const, damping: 80, stiffness: 400, mass: 1, delay: 0 } };

const detail = (study: (typeof caseStudies)[number], label: string) =>
  study.details.find((d) => d.label === label)?.value ?? "";

/**
 * The work, one full-bleed row per project: the project's own imagery behind
 * it, its name over that, a shot of the product, and the discipline and
 * industry underneath. Each row carries its own background, so the section
 * changes as you move down it without depending on hover, which means it
 * works the same on a phone.
 */
export function CaseRows() {
  const studies = homeProjectOrder.map((slug) => caseStudies.find((s) => s.slug === slug)!);
  return (
    <div className={c.caseRows}>
      {studies.map((study, i) => (
        <Link
          key={study.slug}
          href={projectHref(study.slug)}
          className={`${c.caseRow} ${i % 2 === 1 ? c.caseRowFlip : ""}`}
          aria-label={`${study.card.name}: ${study.subtitle}`}
        >
          <div className={c.caseRowBg}>
            <Image src={`/portfolio/projects/${study.slug}/banner.jpg`} alt="" fill unoptimized sizes="100vw" />
          </div>

          <InViewAppear className={c.caseRowInner} enter={ENTER} animate={SETTLE} animateOnce threshold={0}>
            <h3 className={c.caseRowName}>{study.card.name}</h3>

            <div className={c.caseRowShot}>
              <Image
                src={study.card.image}
                alt={`${study.card.name} interface`}
                fill
                unoptimized
                sizes="(min-width: 810px) 42vw, 78vw"
              />
            </div>

            <div className={c.caseRowMeta}>
              <span className={`${text.t} ${text.mono}`}>{detail(study, "Role")}</span>
              <span className={`${text.t} ${text.mono}`}>
                {detail(study, "Industry")} · {study.card.year}
              </span>
              <span className={c.caseRowResult}>{study.result}</span>
            </div>
          </InViewAppear>
        </Link>
      ))}
    </div>
  );
}
