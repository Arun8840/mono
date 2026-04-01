import DashboardLayout from "@/layouts/dashboard-layout";
import { NuqsAdapterProvider } from "@repo/ui/components";
import React from "react";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      <NuqsAdapterProvider>{children}</NuqsAdapterProvider>
    </DashboardLayout>
  );
}
