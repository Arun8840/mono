import { Droppable } from "@repo/ui/components"
import React, { useEffect, useRef, useState } from "react"
import { useApplicationStore } from "@/store/app"
import { ComponentRegistry } from "./Registry"

function PageComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ colWidth: 0, rowHeight: 10 })
  const page = useApplicationStore((state) => state?.page)

  useEffect(() => {
    if (!containerRef?.current) return
    const updateSize = () => {
      const width = containerRef.current?.getBoundingClientRect().width || 0
      // Ensure we use the exact same calculation as the editor
      setDimensions((prev) => ({
        ...prev,
        colWidth: width / 120,
        rowHeight: 10,
      }))
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])
  return (
    <div
      ref={containerRef}
      className="p-2 size-full"
      style={{
        gridTemplateColumns: `repeat(120, 1fr)`, // 120 equal columns for high accuracy
        gridAutoRows: `${dimensions.rowHeight}px`, // Matches your ROW_HEIGHT
        ...(page?.styles?.background && {
          background: page?.styles?.background,
        }),
      }}
    >
      <Droppable
        id={`design_${page?.id}`}
        type="component"
        accept={["component"]}
      >
        <div
          style={{
            gridTemplateColumns: `repeat(120, 1fr)`, // 120 equal columns for high accuracy
            gridAutoRows: `${dimensions.rowHeight}px`, // Matches your ROW_HEIGHT
            ...(page?.styles?.background && {
              background: page?.styles?.background,
            }),
          }}
          className="size-full grid relative"
        >
          {page?.components?.map((comp) => {
            const Component =
              ComponentRegistry?.[comp?.type as keyof typeof ComponentRegistry]
            if (!Component) return null

            return (
              <Component key={comp.id} value={comp} dimensions={dimensions} />
            )
          })}
        </div>
      </Droppable>
    </div>
  )
}

export default PageComponent
