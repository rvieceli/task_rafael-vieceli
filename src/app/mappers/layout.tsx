import { PageLayout } from "@/layouts/PageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaigns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout title="Mappers">{children}</PageLayout>;
}
