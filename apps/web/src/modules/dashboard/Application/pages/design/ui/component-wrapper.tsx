"use client"

import React, { CSSProperties, createContext, useContext } from "react"
import { Resizable } from "re-resizable"
import { useMutation } from "@tanstack/react-query"
import { Draggable } from "@repo/ui/components"
import { useApplicationStore } from "@/store/app"
import ResizeHandle from "@repo/ui/components/ui/dnd/resize-handler"
import { cn } from "@repo/ui/lib/utils"
import { ComponentWrapperProps } from "@/types/comp.wrapper.types"
import { client } from "@repo/server/client"
import { componentType } from "@/types/global"

interface ComponentContextType {
  dimensions: { colWidth: number; rowHeight: number }
  handleResize: (delta: { width: number; height: number }) => void
  onDataUpdate?: (data: any) => void
}

const ComponentContext = createContext<ComponentContextType | null>(null)

export const useComponentContext = () => {
  const context = useContext(ComponentContext)
  if (!context) {
    throw new Error(
      "useComponentContext must be used within a DroppedComponentWrapper",
    )
  }
  return context
}

interface DroppedComponentWrapperProps extends ComponentWrapperProps {
  children: React.ReactNode
  toolbar?: React.ReactNode
  isPreview?: boolean
}

const DroppedComponentWrapper: React.FC<DroppedComponentWrapperProps> = ({
  value,
  dimensions,
  children,
  toolbar,
  isPreview,
}) => {
  const selectedComponent = useApplicationStore(
    (state) => state.selectedComponentId,
  )
  const deleteComponent = useApplicationStore((state) => state.removeComponent)
  const resizeComponent = useApplicationStore((state) => state.resizeComponent)
  const setSelectedComponent = useApplicationStore(
    (state) => state.setSelectedComponent,
  )

  const removeReq = {
    applicationId: value?.applicationId as string,
    componentId: value?.id as string,
    pageId: value?.pageId as string,
  }

  const removeMutate = useMutation({
    mutationFn: async () => {
      await client.app.pages.component.page.component.remove.post(removeReq)
    },
    onSuccess: () => {
      deleteComponent(value?.id || "")
    },
  })
  const updateMutate = useMutation({
    mutationFn: async (req: componentType) => {
      return await client.app.pages.component.page.component.update.post(req)
    },
  })

  const isSelected = selectedComponent === value?.id

  // ? modify component
  const handleSelectComponent = () => {
    setSelectedComponent?.(value?.id || "")
  }
  // ! remove component
  const handleRemove = () => {
    removeMutate?.mutate()
  }
  // ! resize component
  const handleResize = (delta: { width: number; height: number }) => {
    const COLS = 240
    const newW = Math.round(
      Math.max(
        1,
        Math.min(
          COLS - value.position.x,
          (delta.width + (value?.position?.w || 1) * dimensions.colWidth) /
            dimensions.colWidth,
        ),
      ),
    )
    const newH = Math.round(
      Math.max(
        1,
        (delta.height + (value?.position?.h || 1) * dimensions.rowHeight) /
          dimensions.rowHeight,
      ),
    )

    const request = {
      applicationId: value?.applicationId as string,
      id: value?.id as string,
      name: value?.name as string,
      pageId: value?.pageId as string,
      position: {
        ...value?.position,
        w: newW,
        h: newH,
      },
    } as componentType

    resizeComponent?.(value?.id || "", request.position)
    updateMutate?.mutate(request)
  }

  const gridStyle: CSSProperties = {
    gridColumn: `${value.position.x + 1} / span ${value.position.w}`,
    gridRow: `${value.position.y + 1} / span ${value.position.h}`,
    zIndex: isSelected ? 40 : 10,
  }

  //* Render for Preview Mode
  if (isPreview) {
    // Mobile responsive mode: no grid positioning, flows in parent flex column
    // if (value.isResponsive) {
    //   return <div className="w-full p-2">{children}</div>
    // }
    // Desktop: keep exact grid placement
    return (
      <div style={gridStyle} className="p-2">
        {children}
      </div>
    )
  }

  return (
    <ComponentContext.Provider value={{ dimensions, handleResize }}>
      <Draggable
        id={value?.id || ""}
        type="move"
        data={value as any}
        dragHandle={true}
        style={gridStyle}
        className="size-full"
        onDelete={handleRemove}
        onModify={handleSelectComponent}
      >
        <div className="relative group/dropped-comp size-full">
          {isSelected && toolbar}

          <Resizable
            size={{
              width: "100%",
              height: "100%",
            }}
            enable={
              !isPreview && {
                right: true,
                bottom: true,
                left: true,
                top: true,
                topRight: true,
                topLeft: true,
                bottomLeft: true,
                bottomRight: true,
              }
            }
            grid={[dimensions.colWidth, dimensions.rowHeight]}
            onResizeStop={(e, dir, ref, d) => handleResize(d)}
            handleComponent={{
              top: <ResizeHandle direction="top" className="bg-primary" />,
              bottom: (
                <ResizeHandle direction="bottom" className="bg-primary" />
              ),
              left: <ResizeHandle direction="left" className="bg-primary" />,
              right: <ResizeHandle direction="right" className="bg-primary" />,
              topLeft: (
                <ResizeHandle direction="topLeft" className="bg-primary" />
              ),
              topRight: (
                <ResizeHandle direction="topRight" className="bg-primary" />
              ),
              bottomLeft: (
                <ResizeHandle direction="bottomLeft" className="bg-primary" />
              ),
              bottomRight: (
                <ResizeHandle direction="bottomRight" className="bg-primary" />
              ),
            }}
          >
            <div
              className={cn(
                "h-full w-full p-0.5 bg-transparent border border-dashed border-muted",
                isSelected && "border-dashed border-blue-500",
              )}
              onMouseDown={(e) => isSelected && e.stopPropagation()}
            >
              {children}
            </div>
          </Resizable>
        </div>
      </Draggable>
    </ComponentContext.Provider>
  )
}

export default DroppedComponentWrapper
