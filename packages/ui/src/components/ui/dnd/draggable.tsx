import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@repo/ui/lib/utils"
import React from "react"

interface DraggableProps {
  id: string
  children: React.ReactNode
  className?: string
  type: string
  data?: Record<string, unknown>
}

const Draggable: React.FC<DraggableProps> = ({
  id,
  children,
  className,
  type,
  data,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { ...data, accept: type },
    })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.8 : undefined,
    zIndex: isDragging ? 50 : undefined,
    transition: isDragging ? "none" : "none",
    touchAction: "none",
    cursor: isDragging ? "grabbing" : "grab",
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "size-fit cursor-grab",
        className,
        isDragging && "cursor-grabbing",
      )}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  )
}

export default Draggable
