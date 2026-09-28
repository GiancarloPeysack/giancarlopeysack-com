import { homeContent } from "@/content/home";
import { InViewAppear } from "@/components/julian/fx/effects";
import text from "@/components/julian/ui/text.module.css";
import { phoneLate, soon, up20, up60 } from "./fx";
import c from "./sections.module.css";

/**
 * Proof numbers between the intro and the case studies. A studio site has to
 * answer "has this worked before?" before it asks for a call, and every
 * number here is checkable in a case study further down the page.
 */
export function Stats() {
  const { items } = homeContent.proof;
  return (
    <section className={c.proof} data-name="Proof">
      <div className={c.statsWrapper}>
        {items.map((item, i) => (
          <InViewAppear
            key={item.label}
            className={c.stat}
            enter={{ desktop: up60, phone: up20 }}
            animate={{
              desktop: { transition: { ...soon, delay: 0.08 * i } },
              phone: { transition: phoneLate },
            }}
            animateOnce
            threshold={0}
          >
            <p className={c.statValue}>{item.value}</p>
            <p className={`${text.t} ${text.mono} ${c.statLabel}`}>{item.label}</p>
          </InViewAppear>
        ))}
      </div>
    </section>
  );
}
