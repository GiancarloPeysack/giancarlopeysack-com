import type { Metadata } from "next";
import { NotFoundPage } from "@/components/julian/notfound/NotFoundPage";
import { notFoundMeta } from "@/content/not-found";

export const metadata: Metadata = {
  title: notFoundMeta.title,
  description: notFoundMeta.description,
};

export default function NotFound() {
  return <NotFoundPage />;
}
