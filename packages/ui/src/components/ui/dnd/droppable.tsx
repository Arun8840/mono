import { useDndContext, useDroppable } from "@dnd-kit/core"
import { cn } from "@repo/ui/lib/utils"
import React from "react"

interface DroppableProps {
  id: string
  children: React.ReactNode
  className?: string
  type: string
  data?: Record<string, unknown>
  accept?: string | string[] | undefined
}
const matchesAccept = (
  accept: string | string[] | undefined,
  activeType: string,
) => {
  if (!accept) return true
  if (Array.isArray(accept)) {
    return accept.includes(activeType)
  }
  return accept === activeType
}

const Droppable: React.FC<DroppableProps> = ({
  id,
  children,
  className,
  type,
  data,
  accept,
}) => {
  const { active } = useDndContext()
  const activeType = active?.data?.current?.accept
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { ...data, type },
  })
  // check whether the current drag item can be dropped here
  const canDrop = !!activeType && matchesAccept(accept, activeType)

  const baseClass = cn(
    "p-3 size-full border border-dashed border-transparent transition-colors",
    // isOver &&
    //   (canDrop
    //     ? "bg-blue-200/40 border-blue-400 pointer-events-auto"
    //     : "pointer-events-none"),
  )

  return (
    <div
      ref={setNodeRef}
      className={cn(baseClass, className, isOver && "ring-2 ring-primary")}
    >
      {children}
    </div>
  )
}

export default Droppable
