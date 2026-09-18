import { homeContent } from "@/content/home";
import { InViewAppear } from "@/components/julian/fx/effects";
import { Label } from "@/components/julian/ui/Label";
import text from "@/components/julian/ui/text.module.css";
import { now, phoneLate, soon, up20, up60 } from "./fx";
import { ServiceList } from "./Services";
import s from "./home.module.css";

export function ServicesSection() {
  const { label, heading } = homeContent.services;
  return (
    <section className={s.services} id="work" data-name="Services">
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
            className={`${s.rt} ${s.heading}`}
            enter={{ desktop: up60, phone: up20 }}
            animate={{ desktop: { transition: soon }, phone: { transition: phoneLate } }}
            animateOnce
            threshold={0}
          >
            <h1 className={`${text.t} ${text.h1}`} style={{ textAlign: "left" }}>
              {heading}
            </h1>
          </InViewAppear>
        </div>
        <div className={s.servicesListBox}>
          <ServiceList />
        </div>
      </div>
    </section>
  );
}
