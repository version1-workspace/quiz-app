"use client";

import { BreadcrumbsContainer } from "@/components/shared/breadcrumbs/context";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BreadcrumbsContainer
      defaultValues={[
        {
          label: "Top",
          to: "/",
        },
      ]}
    >
      {children}
    </BreadcrumbsContainer>
  );
}
