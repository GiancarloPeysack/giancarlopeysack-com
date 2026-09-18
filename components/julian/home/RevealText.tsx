"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

/**
 * Template code component "Reveal Text": each letter fades from #666 to white
 * as the paragraph scrolls from 75% to 15% of the viewport height. Every word
 * gets an equal share of the progress and every letter an equal share of
 * its word's (transitionStartIndex is 0 in the template, so no letter starts
 * white).
 */
export function RevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "start 0.15"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          progress={scrollYProgress}
          start={i / words.length}
          end={(i + 1) / words.length}
        />
      ))}
    </p>
  );
}

function Word({ word, progress, start, end }: { word: string; progress: MotionValue<number>; start: number; end: number }) {
  const step = (end - start) / word.length;
  return (
    <motion.span>
      {word.split("").map((char, i) => (
        <Letter key={i} char={char} progress={progress} start={start + step * i} end={start + step * (i + 1)} />
      ))}
      {" "}
    </motion.span>
  );
}

function Letter({ char, progress, start, end }: { char: string; progress: MotionValue<number>; start: number; end: number }) {
  const color = useTransform(progress, [start, end], ["#666666", "#FFFFFF"]);
  return <motion.span style={{ color }}>{char}</motion.span>;
}
