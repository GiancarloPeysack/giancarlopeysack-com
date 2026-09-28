import { InViewAppear } from "@/components/julian/fx/effects";
import { Label } from "@/components/julian/ui/Label";
import text from "@/components/julian/ui/text.module.css";
import { now, phoneLate, soon, up20, up60 } from "./fx";
import s from "./home.module.css";
import c from "./sections.module.css";

export type Column = { title: string; items?: string[]; body?: string };

/**
 * Label and heading on the left, a row of columns on the right. Used twice on
 * the home page: the process ("How I work") and the AI block. It borrows the
 * Services section shell so the two read as part of the same page.
 */
export function ColumnsSection({
  id,
  label,
  heading,
  columns,
}: {
  id: string;
  label: string;
  heading: string;
  columns: readonly Column[];
}) {
  return (
    <section className={s.services} id={id} data-name={heading}>
      <div className={s.servicesWrapper}>
        <div className={s.servicesHeader}>
          <InViewAppear
            className={s.labelBox}
            enter={{ desktop: up60, phone: up20 }}
            animate={{ desktop: { transition: now }, phone: { transition: phoneLate } }}
            animateOnce
            threshold={0}
          >
            <Label title={label} />
          </InViewAppear>
          <InViewAppear
            className={`${s.rt} ${s.heading} ${c.headingWrap}`}
            enter={{ desktop: up60, phone: up20 }}
            animate={{ desktop: { transition: soon }, phone: { transition: phoneLate } }}
            animateOnce
            threshold={0}
          >
            <h2 className={`${text.t} ${text.h1}`} style={{ textAlign: "left" }}>
              {heading}
            </h2>
          </InViewAppear>
        </div>

        <div className={s.servicesListBox}>
          <div className={c.columns}>
            {columns.map((column, i) => (
              <InViewAppear
                key={column.title}
                className={c.column}
                enter={{ desktop: up60, phone: up20 }}
                animate={{
                  desktop: { transition: { ...soon, delay: 0.1 * i } },
                  phone: { transition: phoneLate },
                }}
                animateOnce
                threshold={0}
              >
                <div className={c.columnRule} />
                <h3 className={`${text.t} ${text.h4}`}>{column.title}</h3>
                {column.body && <p className={`${text.t} ${text.body18}`}>{column.body}</p>}
                {column.items && (
                  <ul className={c.list}>
                    {column.items.map((item) => (
                      <li key={item} className={`${text.t} ${text.body18}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </InViewAppear>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
