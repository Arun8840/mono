import { EditorSidebar } from "@/modules/editor-sidebar"
import { SidebarProvider } from "@repo/ui/components"
import React from "react"

function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <EditorSidebar />
      <div className="flex-1">{children}</div>
    </SidebarProvider>
  )
}

export default EditorLayout
