import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/julian/projects/CaseStudyView";
import { WorkTogether } from "@/components/julian/shell/WorkTogether";
import { caseStudies, getCaseStudy } from "@/content/projects";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return { title: study.meta.title, description: study.meta.description };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();
  return (
    <main className="flex w-full flex-col items-center">
      <CaseStudyView study={study} />
      <WorkTogether />
    </main>
  );
}
