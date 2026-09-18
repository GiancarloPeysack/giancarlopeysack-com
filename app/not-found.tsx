import type { Metadata } from "next";
import PortfolioLayout from "./(portfolio)/layout";
import { NotFoundPage } from "@/components/julian/notfound/NotFoundPage";
import { notFoundMeta } from "@/content/not-found";

export const metadata: Metadata = {
  title: notFoundMeta.title,
  description: notFoundMeta.description,
};

// Root 404. Unknown URLs are caught by (portfolio)/[...notFound], but Next
// serves the literal /404 path from here, so this renders the same portfolio
// 404 inside the portfolio shell.
export default function RootNotFound() {
  return (
    <PortfolioLayout>
      <NotFoundPage />
    </PortfolioLayout>
  );
}
