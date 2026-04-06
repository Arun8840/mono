"use client"

import { useCallback } from "react"
import { useApplicationStore } from "@/store/app"
import { useEditorMutations } from "./useEditorMutations"
import { clamp, COLS, ROW_HEIGHT } from "@/lib/editor-utils"
import { componentType } from "@/types/global"
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

      const dragData = active.data.current
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
          position: { x: gridX, y: gridY, w: 8, h: 30 },
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
        const dropX = itemRect.left - canvasRect.left + scrollLeft
        const dropY = itemRect.top - canvasRect.top + scrollTop
        const currentW = dragData?.position?.w || 2
        const currentH = dragData?.position?.h || 2
        const gridX = clamp(Math.round(dropX / colWidth), 0, COLS - currentW)
        const gridY = Math.max(0, Math.round(dropY / ROW_HEIGHT))
        const req = {
          applicationId: appId,
          pageId: pageId,
          componentId: dragData?.id as string,
          position: { x: gridX, y: gridY, w: currentW, h: currentH },
        }
        moveAppComponent(dragData?.id as string, req)
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
