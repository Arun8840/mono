"use client"

import { useCallback } from "react"
import { useApplicationStore } from "@/store/app"
import { useEditorMutations } from "./useEditorMutations"
import { clamp, COLS, ROW_HEIGHT } from "@/lib/editor-utils"
import { componentType, DragItemTypes } from "@/types/global"
import { DragEndEvent } from "@repo/ui/components"

interface UseDragHandlersProps {
  appId: string
  pageId: string
  canvasRef: React.RefObject<HTMLDivElement | null>
  colWidth: number
}

export function useDragHandlers({
  appId,
  pageId,
  canvasRef,
  colWidth,
}: UseDragHandlersProps) {
  const { addComponent, moveComponent } = useEditorMutations()
  const applicationData = useApplicationStore((state) => state.page)
  const addAppComp = useApplicationStore((state) => state.addComponent)
  const moveAppComponent = useApplicationStore((state) => state.moveComponent)

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, delta, activatorEvent, over } = event
      if (!active || !over || !canvasRef.current || colWidth === 0) return

      const canvas = canvasRef.current
      const canvasRect = canvas.getBoundingClientRect()
      const scrollLeft = canvas.scrollLeft
      const scrollTop = canvas.scrollTop

      const dragData = active.data.current as DragItemTypes
      const isNewItem = dragData?.accept !== "move"

      if (isNewItem) {
        const mouseEvent = activatorEvent as MouseEvent
        const clientOffsetX = mouseEvent.clientX + delta.x
        const clientOffsetY = mouseEvent.clientY + delta.y

        const dropX = clientOffsetX - canvasRect.left + scrollLeft
        const dropY = clientOffsetY - canvasRect.top + scrollTop

        const gridX = clamp(Math.round(dropX / colWidth), 0, COLS - 8)
        const gridY = Math.max(0, Math.round(dropY / ROW_HEIGHT))

        const req: componentType = {
          id: crypto.randomUUID(),
          applicationId: appId,
          pageId,
          name: dragData?.name || "",
          type: dragData?.componentType || "",
          position: { x: gridX, y: gridY, w: 14, h: 30 },
          properties: {
            content: "Heading",
          },
          styles: {},
        }
        addAppComp?.(req)
        addComponent.mutate(req)
      } else {
        const itemRect = active?.rect?.current?.translated
        if (!itemRect) return
        const originalPos = dragData?.position
        if (!originalPos) return

        const deltaGridX = Math.round(delta.x / colWidth)
        const deltaGridY = Math.round(delta.y / ROW_HEIGHT)

        const gridX = clamp(originalPos.x + deltaGridX, 0, COLS - originalPos.w)
        const gridY = Math.max(0, originalPos.y + deltaGridY)

        const req = {
          applicationId: appId,
          pageId: pageId,
          componentId: active.id as string,
          position: {
            x: gridX,
            y: gridY,
            w: originalPos.w,
            h: originalPos.h,
          },
        }

        moveAppComponent(active.id as string, req)
        moveComponent.mutate(req)
      }
    },
    [
      appId,
      pageId,
      canvasRef,
      colWidth,
      applicationData,
      addAppComp,
      addComponent,
      moveAppComponent,
      moveComponent,
    ],
  )

  return { handleDragEnd }
}
