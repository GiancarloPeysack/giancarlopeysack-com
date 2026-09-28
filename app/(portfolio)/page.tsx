import type { Metadata } from "next";
import { ColumnsSection } from "@/components/julian/home/ColumnsSection";
import { Hero } from "@/components/julian/home/Hero";
import { Intro } from "@/components/julian/home/Intro";
import { SelectedCases } from "@/components/julian/home/SelectedCases";
import { ServicesSection } from "@/components/julian/home/ServicesSection";
import { Stats } from "@/components/julian/home/Stats";
import { Writing } from "@/components/julian/home/Writing";
import { WorkTogether } from "@/components/julian/shell/WorkTogether";
import { homeContent } from "@/content/home";

export const metadata: Metadata = {
  title: homeContent.meta.title,
  description: homeContent.meta.description,
};

export default function HomePage() {
  return (
    <main className="flex w-full flex-col items-center">
      <Hero />
      <Intro />
      <Stats />
      <SelectedCases />
      <ServicesSection />
      <ColumnsSection id="process" {...homeContent.process} />
      <ColumnsSection id="ai" {...homeContent.ai} />
      <Writing />
      <WorkTogether />
    </main>
  );
}
