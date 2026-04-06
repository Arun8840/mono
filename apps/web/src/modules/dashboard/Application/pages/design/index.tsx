"use client"
import { DndProvider, Spinner } from "@repo/ui/components"
import React, { RefObject, useEffect } from "react"
import ToolBar from "./ui/toolbar"
import { useQuery } from "@tanstack/react-query"
import { client } from "@repo/server/client"
import { useApplicationStore } from "@/store/app"
import { PageTypes } from "@/types/app.type"
import PageComponent from "./ui/Page-ui"
import { useCanvasDimensions, useDragHandlers } from "@/hooks"

type PageDesignProps = {
  appId: string
  pageId: string
}
function PageDesign({ appId, pageId }: PageDesignProps) {
  const getPage = useApplicationStore((state) => state?.getPage)

  //* HOOKS
  const { canvasRef, snapToGridModifier, colWidth } = useCanvasDimensions()
  const { handleDragEnd } = useDragHandlers({
    appId,
    pageId,
    canvasRef,
    colWidth,
  })

  const { data, isPending, isError } = useQuery({
    queryKey: ["page", appId, pageId],
    queryFn: async () => {
      const { data, error } = await client.app.pages.component({ pageId }).get()

      if (error) {
        throw new Error(error.value?.message || "Failed to fetch components")
      }

      return data
    },
    enabled: !!appId && !!pageId,
  })
  const pageItems = data?.data

  useEffect(() => {
    if (data) {
      getPage?.(pageItems as PageTypes)
    }
  }, [data])

  if (isPending) return <Spinner />
  if (isError)
    return (
      <div className="size-full grid place-items-center">
        <p className="text-destructive">Something went wrong</p>
      </div>
    )
  return (
    <DndProvider onDragEnd={handleDragEnd} modifiers={[snapToGridModifier]}>
      <div ref={canvasRef} className="size-full">
        <PageComponent />
      </div>
      <ToolBar />
    </DndProvider>
  )
}

export default PageDesign
