"use client"
import { DndProvider, Spinner, toast } from "@repo/ui/components"
import type { DragEndEvent } from "@repo/ui/components"
import React, { useEffect } from "react"
import ToolBar from "./ui/toolbar"
import { useMutation, useQuery } from "@tanstack/react-query"
import { client } from "@repo/server/client"
import { useApplicationStore } from "@/store/app"
import { PageTypes } from "@/types/app.type"
import PageComponent from "./ui/Page-ui"
import { componentType, DragItems } from "@/types/global"

type PageDesignProps = {
  appId: string
  pageId: string
}
function PageDesign({ appId, pageId }: PageDesignProps) {
  const getPage = useApplicationStore((state) => state?.getPage)
  const createComponent = useMutation({
    mutationFn: async (request: componentType) => {
      return client.app.pages.component.page.component.create.post(request)
    },
    onSuccess(data) {
      toast.success("Component created successfully")
    },
    onError(error) {
      toast.error(error.message)
    },
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

  const handleDrop = (event: DragEndEvent) => {
    const { active, delta, activatorEvent, over } = event
    if (!active || !over) return

    const draggedData = active.data.current as DragItems

    const request = {
      applicationId: appId,
      name: draggedData.name,
      pageId: pageId,
      position: {
        x: delta.x,
        y: delta.y,
        w: 100,
        h: 100,
      },
      properties: {
        content: "",
        href: "",
        src: "",
        alt: "",
      },
    } as componentType

    createComponent.mutate(request)
    console.log(draggedData, over.data.current)
  }

  if (isPending) return <Spinner />
  if (isError)
    return (
      <div className="size-full grid place-items-center">
        <p className="text-destructive">Something went wrong</p>
      </div>
    )
  return (
    <DndProvider onDragEnd={handleDrop}>
      <PageComponent />
      <ToolBar />
    </DndProvider>
  )
}

export default PageDesign
