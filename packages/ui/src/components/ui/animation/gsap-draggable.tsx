"use client"
import { cn } from "@repo/ui/lib/utils"
import { ComponentProps, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { Draggable } from "gsap/Draggable"

interface GsapDraggableProps extends ComponentProps<"div"> {
  handle?: string
}

const baseClass = "bg-card/50 rounded-lg shadow-lg backdrop-blur-xs"
export const GsapDraggable = ({
  children,
  className,
  handle,
  ...props
}: GsapDraggableProps) => {
  const dragRef = useRef<HTMLDivElement>(null)
  gsap.registerPlugin(Draggable)

  useGSAP(() => {
    Draggable.create(dragRef.current, {
      type: "x,y",
      bounds: "body",
      inertia: true,
      edgeResistance: 1,
      trigger: handle || dragRef.current,
      cursor: "grab",
      activeCursor: "grabbing",
      dragClickables: false,
      allowEventDefault: true,
      ignoreFrom:
        "input, textarea, select, button, [contenteditable], [data-drag-ignore]",
    })
  }, [handle])
  return (
    <div ref={dragRef} className={cn(baseClass, className)} {...props}>
      {children}
    </div>
  )
}
