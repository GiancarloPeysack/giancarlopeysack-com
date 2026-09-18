import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/julian/projects/ProjectsIndex";
import { WorkTogether } from "@/components/julian/shell/WorkTogether";
import { projectsIndex } from "@/content/projects";

export const metadata: Metadata = {
  title: projectsIndex.meta.title,
  description: projectsIndex.meta.description,
};

export default function ProjectsPage() {
  return (
    <main className="flex w-full flex-col items-center">
      <ProjectsIndex />
      <WorkTogether />
    </main>
  );
}
