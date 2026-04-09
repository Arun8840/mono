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

const Droppable: React.FC<DroppableProps> = ({
  id,
  children,
  className,
  type,
  data,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { ...data, type },
  })

  const baseClass = cn(
    "p-3 size-full border border-dashed border-transparent transition-colors",
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
