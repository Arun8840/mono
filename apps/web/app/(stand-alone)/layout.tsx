import EditorLayout from "@/layouts/editor-layout"
import { NuqsAdapterProvider } from "@repo/ui/components"
import React from "react"

export default function StandAloneLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <EditorLayout>
      <NuqsAdapterProvider>{children}</NuqsAdapterProvider>
    </EditorLayout>
  )
}
