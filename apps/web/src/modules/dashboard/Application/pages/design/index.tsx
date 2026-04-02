"use client"
import { DndProvider, Droppable } from "@repo/ui/components"
import React from "react"
import ToolBar from "./ui/toolbar"
import {
  DragEndEventData,
  DragEventManager,
} from "@repo/ui/components/ui/dnd/dnd-provider"

type PageDesignProps = {
  appId: string
  pageId: string
}
function PageDesign({ appId, pageId }: PageDesignProps) {
  const handleDrop = (event: DragEndEventData, manager: DragEventManager) => {}
  return (
    <DndProvider onDragEnd={handleDrop}>
      <Droppable id="droppable" type="component">
        iam page component-{appId}-{pageId}
      </Droppable>
      <ToolBar />
    </DndProvider>
  )
}

export default PageDesign
