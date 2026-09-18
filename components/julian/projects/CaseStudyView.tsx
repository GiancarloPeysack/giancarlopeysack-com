import Image from "next/image";
import {
  caseStudies,
  otherProjectsHeader,
  projectHref,
  type CaseStudy,
  type ProjectImage,
} from "@/content/projects";
import { Appear, InViewAppear } from "@/components/julian/fx/effects";
import { Label } from "@/components/julian/ui/Label";
import { ProjectCard } from "@/components/julian/ui/ProjectCard";
import text from "@/components/julian/ui/text.module.css";
import styles from "./projects.module.css";
import rich from "./richtext.module.css";

// Load appears (ids 69rcbe, 19zjgm2, 4dnhpg, gfrrld: all at 0.9s).
const LOAD = {
  initial: { opacity: 0.001, y: 23 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 80, stiffness: 400, mass: 1, delay: 0.9 },
  },
};

// In-view appears of the "other projects" header (label, then heading 0.1s later).
const inView = (delay: number) => ({
  enter: { opacity: 0, y: 60 },
  animate: { transition: { type: "spring" as const, damping: 80, stiffness: 400, mass: 1, delay } },
  animateOnce: true,
  threshold: 0,
});

function Picture({ image, className, sizes }: { image: ProjectImage; className: string; sizes: string }) {
  return (
    <div className={className}>
      <Image src={image.src} alt={image.alt} fill unoptimized sizes={sizes} />
    </div>
  );
}

export function CaseStudyView({ study }: { study: CaseStudy }) {
  const others = study.others.map((slug) => caseStudies.find((c) => c.slug === slug)!);
  const [wide, left, right] = study.gallery;
  return (
    <section className={styles.main}>
      <div className={styles.content}>
        <div className={styles.top}>
          <Appear className={`${styles.rt} ${styles.title}`} {...LOAD}>
            <h1 className={`${text.t} ${text.display}`}>{study.title}</h1>
          </Appear>
          <div className={styles.intro}>
            <Appear className={styles.summary} {...LOAD}>
              <div className={`${styles.rt} ${styles.subtitle}`}>
                <h4 className={`${text.t} ${text.h4}`}>{study.subtitle}</h4>
              </div>
              <div className={`${styles.rt} ${styles.description}`}>
                {study.description.map((paragraph, i) => (
                  <p key={i} className={styles.descriptionText}>
                    {paragraph || <br />}
                  </p>
                ))}
              </div>
            </Appear>
            <Appear className={styles.details} {...LOAD}>
              {study.details.map((row) => (
                <div key={row.label} className={styles.detail}>
                  <div className={`${styles.rt} ${styles.detailText}`}>
                    <p className={styles.detailLabel}>{row.label}</p>
                  </div>
                  <div className={`${styles.rt} ${styles.detailText}`}>
                    <p className={styles.detailValue}>{row.value}</p>
                  </div>
                </div>
              ))}
            </Appear>
          </div>
        </div>

        <div className={styles.media}>
          <Appear className={styles.banner} {...LOAD}>
            <Image src={study.banner.src} alt={study.banner.alt} fill unoptimized priority sizes="100vw" />
          </Appear>
          <div
            className={`${styles.rt} ${styles.body} ${rich.body}`}
            // Static rich text from content/projects.ts (never user input).
            dangerouslySetInnerHTML={{ __html: study.bodyHtml }}
          />
          <div className={styles.gallery}>
            <Picture image={wide} className={styles.galleryWide} sizes="100vw" />
            <div className={styles.galleryRow}>
              <Picture image={left} className={styles.galleryLeft} sizes="(min-width: 810px) 50vw, 100vw" />
              <Picture image={right} className={styles.galleryRight} sizes="(min-width: 810px) 50vw, 100vw" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.others}>
        <div className={styles.othersContent}>
          <div className={styles.othersHeader}>
            <InViewAppear className={styles.othersLabel} {...inView(0)}>
              <Label title={otherProjectsHeader.label.desktop} className={styles.desktopOnly} />
              <Label title={otherProjectsHeader.label.phone} className={styles.phoneOnly} />
            </InViewAppear>
            <InViewAppear className={`${styles.rt} ${styles.othersHeading}`} {...inView(0.1)}>
              <h1 className={`${text.t} ${text.h1} ${styles.desktopOnly}`}>{otherProjectsHeader.heading.desktop}</h1>
              <h1 className={`${text.t} ${text.h1} ${styles.phoneOnly}`}>{otherProjectsHeader.heading.phone}</h1>
            </InViewAppear>
          </div>
          <div className={styles.othersProjects}>
            <div className={styles.othersGrid}>
              {others.map((other) => (
                <div key={other.slug} className={styles.othersCard}>
                  <ProjectCard
                    project={other.card.name}
                    year={other.card.year}
                    image={other.card.image}
                    image2={other.card.image2}
                    link={projectHref(other.slug)}
                    sizes="(min-width: 1200px) 33vw, (min-width: 810px) 50vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
