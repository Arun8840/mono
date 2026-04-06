"use client"

import React, { CSSProperties, createContext, useContext } from "react"
import { Resizable } from "re-resizable"
import { useMutation } from "@tanstack/react-query"
import { Draggable } from "@repo/ui/components"
import { useApplicationStore } from "@/store/app"
import { componentType } from "@/types/global"
import ResizeHandle from "@repo/ui/components/ui/dnd/resize-handler"
import { cn } from "@repo/ui/lib/utils"
import { ComponentWrapperProps } from "@/types/comp.wrapper.types"
import { client } from "@repo/server/client"

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
  const req = {
    appId: value?.applicationId as string,
    componentId: value?.id as string,
    pageId: value?.pageId as string,
  }

  const removeMutate = useMutation({
    mutationFn: async () => {
      await client.app.pages.component.page.component.remove.post(req)
    },
    onSuccess: () => {
      deleteComponent(value?.id || "")
    },
  })
  const deleteComponent = useApplicationStore((state) => state.removeComponent)

  const isSelected = selectedComponent === value?.id

  // ! remove component
  const handleRemove = () => {
    removeMutate?.mutate()
  }
  // ! resize component
  const handleResize = (delta: { width: number; height: number }) => {
    const COLS = 120
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

    console.log(newW, newH)
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
      >
        <div className="relative group/dropped-comp size-full">
          {isSelected && toolbar}

          <Resizable
            size={{
              width: "100%",
              height: "100%",
            }}
            enable={{
              right: isSelected,
              bottom: isSelected,
              left: isSelected,
              top: isSelected,
            }}
            onResizeStop={(e, dir, ref, d) => handleResize(d)}
            handleComponent={{
              bottomRight: isSelected ? (
                <ResizeHandle
                  direction="bottomRight"
                  className="bg-blue-500 border-blue-500"
                />
              ) : undefined,
              bottomLeft: isSelected ? (
                <ResizeHandle
                  direction="bottomLeft"
                  className="bg-blue-500 border-blue-500"
                />
              ) : undefined,
              topLeft: isSelected ? (
                <ResizeHandle
                  direction="topLeft"
                  className="bg-blue-500 border-blue-500"
                />
              ) : undefined,
              topRight: isSelected ? (
                <ResizeHandle
                  direction="topRight"
                  className="bg-blue-500 border-blue-500"
                />
              ) : undefined,
            }}
          >
            <div
              tabIndex={-1}
              className={cn(
                "size-full p-0.5 bg-transparent border border-dashed border-muted",
                isSelected
                  ? "border-dashed border-blue-500"
                  : "border border-dashed hover:border-blue-500",
              )}
              onMouseDown={(e) => isSelected && e.stopPropagation()}
            >
              {isSelected && (
                <div className="absolute -top-6 left-0 bg-primary text-[10px] text-white px-2 py-0.5 rounded-t-sm font-bold uppercase tracking-wider pointer-events-none">
                  {value.type}
                </div>
              )}
              {children}
            </div>
          </Resizable>
        </div>
      </Draggable>
    </ComponentContext.Provider>
  )
}

export default DroppedComponentWrapper
