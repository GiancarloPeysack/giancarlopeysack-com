import { caseStudies, projectHref, projectsIndex } from "@/content/projects";
import { Appear } from "@/components/julian/fx/effects";
import { ProjectCard } from "@/components/julian/ui/ProjectCard";
import text from "@/components/julian/ui/text.module.css";
import styles from "./projects.module.css";

// Load appears of the Projects page (ids ela8w9, d0p0s3, 14ogy5l, 1thz22y-N).
const spring = (delay: number) => ({
  initial: { opacity: 0.001, y: 23 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 80, stiffness: 400, mass: 1, delay },
  },
});

export function ProjectsIndex() {
  const { title, intro, label, order } = projectsIndex;
  const cards = order.map((slug) => caseStudies.find((c) => c.slug === slug)!);
  return (
    <section className={styles.indexMain}>
      <div className={styles.indexContent}>
        <div className={styles.indexHeader}>
          <Appear className={`${styles.rt} ${styles.indexTitle}`} {...spring(0.9)}>
            <h1 className={`${text.t} ${text.display}`}>{title}</h1>
          </Appear>
          <Appear className={`${styles.rt} ${styles.indexIntro} ${styles.desktopOnly}`} {...spring(1)}>
            {intro.desktop.map((line) => (
              <p key={line} className={styles.introText}>
                {line}
              </p>
            ))}
          </Appear>
          <Appear className={`${styles.rt} ${styles.indexIntro} ${styles.phoneOnly}`} {...spring(1)}>
            {intro.phone.map((line) => (
              <p key={line} className={styles.introText}>
                {line}
              </p>
            ))}
          </Appear>
          <Appear className={`${styles.rt} ${styles.indexLabel}`} {...spring(1.1)}>
            <p className={`${text.t} ${text.mono}`}>{label}</p>
          </Appear>
        </div>

        <div className={styles.indexGrid}>
          {cards.map((study) => (
            <Appear key={study.slug} className={styles.gridItem} {...spring(1.1)}>
              <ProjectCard
                project={study.card.name}
                year={study.card.year}
                image={study.card.image}
                image2={study.card.image2}
                link={projectHref(study.slug)}
                sizes="(min-width: 810px) 50vw, 100vw"
              />
            </Appear>
          ))}
        </div>
      </div>
    </section>
  );
}
