import { useDraggable } from "@dnd-kit/core"
import { cn } from "@repo/ui/lib/utils"
import React, { ComponentType } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { GripVertical } from "@hugeicons/core-free-icons"
interface DraggableProps {
  id: string
  children: React.ReactNode
  className?: string
  type: string
  data?: ComponentType | Record<string, unknown>
  dragHandle?: boolean
}

const Draggable: React.FC<DraggableProps> = ({
  id,
  children,
  className,
  type,
  data,
  dragHandle = false,
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

  if (dragHandle) {
    return (
      <div
        id={id}
        ref={setNodeRef}
        className={cn("relative group", className)}
        style={style}
      >
        <div
          {...listeners}
          {...attributes}
          className="absolute -top-3 -left-3 z-50 cursor-grab bg-background border border-input rounded-md shadow-sm p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-accent hover:text-accent-foreground active:cursor-grabbing active:scale-95"
        >
          <HugeiconsIcon icon={GripVertical} className="size-4" />
        </div>
        {children}
      </div>
    )
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
