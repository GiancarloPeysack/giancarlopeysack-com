"use client";

import Image from "next/image";
import Link from "next/link";
import { Appear, ScrollTransform, type FxState } from "@/components/julian/fx/effects";
import styles from "./ProjectCard.module.css";
import { useHover } from "./useHover";

// The image zooms from 1.3 to 1 while the card scrolls into view
// (transformTrigger "onInView": element "start end" -> "end end").
const IMAGE_ZOOM: FxState[] = [{ scale: 1.3 }, { scale: 1 }];

// Caption entrance (appear id 1xegoub).
const NAME_APPEAR = {
  initial: { opacity: 0.001, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 80, stiffness: 400, mass: 1, delay: 0.5 },
  },
} as const;

/**
 * Template component "project card". On hover the image cuts to `image2`
 * (no crossfade, as in the template); both are rendered up front so the
 * swap never waits on a network request.
 */
export function ProjectCard({
  project,
  year,
  image,
  image2,
  link,
  className,
  sizes = "600px",
}: {
  project: string;
  year: string;
  image: string;
  image2?: string;
  link: string;
  className?: string;
  sizes?: string;
}) {
  const [hovered, hoverProps] = useHover(true);
  const showSecond = hovered && !!image2;
  return (
    <Link href={link} className={`${styles.card} ${className ?? ""}`} {...hoverProps}>
      <div className={styles.top}>
        <ScrollTransform className={styles.image} targets={IMAGE_ZOOM} trigger="onInView">
          <Image
            src={image}
            alt=""
            fill
            unoptimized
            sizes={sizes}
            className={showSecond ? styles.hidden : undefined}
          />
          {image2 && (
            <Image
              src={image2}
              alt=""
              fill
              unoptimized
              sizes={sizes}
              className={showSecond ? undefined : styles.hidden}
            />
          )}
        </ScrollTransform>
      </div>
      <div className={styles.stats}>
        <Appear className={styles.textBox} {...NAME_APPEAR}>
          <p className={styles.name}>{project}</p>
        </Appear>
        <div className={styles.textBox}>
          <p className={styles.year}>{year}</p>
        </div>
      </div>
    </Link>
  );
}
