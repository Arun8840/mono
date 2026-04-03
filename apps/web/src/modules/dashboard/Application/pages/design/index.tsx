"use client"
import { DndProvider, Droppable } from "@repo/ui/components"
import type { DragEndEvent } from "@repo/ui/components"
import React from "react"
import ToolBar from "./ui/toolbar"

type PageDesignProps = {
  appId: string
  pageId: string
}
function PageDesign({ appId, pageId }: PageDesignProps) {
  const handleDrop = (event: DragEndEvent) => {
    const { active, delta, activatorEvent, over } = event
    if (!active || !over) return

    console.log(active.data.current, over.data.current)
  }
  return (
    <DndProvider onDragEnd={handleDrop}>
      <div className="p-2 border size-full">
        <Droppable id="droppable" type="component" accept={["component"]}>
          iam page component-{appId}-{pageId}
        </Droppable>
      </div>
      <ToolBar />
    </DndProvider>
  )
}

export default PageDesign
