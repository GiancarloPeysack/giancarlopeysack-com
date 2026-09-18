import type { Metadata } from "next";
import { AboutHero } from "@/components/julian/about/AboutHero";
import { AwardsSection } from "@/components/julian/about/AwardsSection";
import { ExperienceSection } from "@/components/julian/about/ExperienceSection";
import { ProcessSection } from "@/components/julian/about/ProcessSection";
import { StatisticsSection } from "@/components/julian/about/StatisticsSection";
import { WorkTogether } from "@/components/julian/shell/WorkTogether";
import { aboutContent } from "@/content/about";

export const metadata: Metadata = {
  title: aboutContent.meta.title,
  description: aboutContent.meta.description,
};

// Route /about — exact rebuild of the template's About page (spec id "about").
// Sections follow the Framer layer order: About me, Proccess, Statistics,
// Experience, Awards, then the shared "LET'S WORK TOGETHER" CTA.
export default function AboutPage() {
  return (
    <main className="flex w-full flex-col items-center overflow-clip">
      <AboutHero />
      <ProcessSection />
      <StatisticsSection />
      <ExperienceSection />
      <AwardsSection />
      <WorkTogether />
    </main>
  );
}
