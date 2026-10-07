import { useDraggable } from "@dnd-kit/core"
import { cn } from "@repo/ui/lib/utils"
import React, { ComponentType } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { GripVertical, Trash, Edit } from "@hugeicons/core-free-icons"
import { Button } from "../button"
interface DraggableProps {
  id: string
  children: React.ReactNode
  className?: string
  type: string
  data?: ComponentType | Record<string, unknown>
  dragHandle?: boolean
  style?: React.CSSProperties
  onDelete?: () => void
  onModify?: () => void
}

const Draggable: React.FC<DraggableProps> = ({
  id,
  children,
  className,
  type,
  data,
  dragHandle = false,
  style: customStyle,
  onDelete,
  onModify,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { ...data, accept: type },
    })

  const style: React.CSSProperties = {
    ...customStyle,
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
        // Added a slight ring on hover to define the boundary of the element being edited
        className={cn("relative group transition-all duration-200", className)}
        style={style}
      >
        {/* Unified Toolbar */}
        <div
          className="absolute right-1 flex items-center gap-1 z-50 px-1 py-1 
                      bg-background border border-border rounded-lg shadow-lg 
                      opacity-0 group-hover:opacity-100 bottom-1
                      transition-all duration-200 pointer-events-auto"
        >
          {/* Drag Handle */}
          <Button
            {...listeners}
            {...attributes}
            size={"icon-sm"}
            variant={"ghost"}
            className={"rounded-md"}
          >
            <HugeiconsIcon icon={GripVertical} className="size-4" />
          </Button>

          {/* Separator */}
          <div className="w-px h-4 bg-border mx-0.5" />
          {/* Modify Button */}
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onModify?.()
            }}
            size={"icon-sm"}
            variant={"ghost"}
            className={"rounded-md"}
          >
            <HugeiconsIcon icon={Edit} className="size-4" />
          </Button>
          {/* Delete Button */}
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.()
            }}
            size={"icon-sm"}
            variant={"destructive"}
            className={"rounded-md"}
          >
            <HugeiconsIcon icon={Trash} className="size-4" />
          </Button>
        </div>

        {/* The Actual Content */}
        <div className="relative z-10 size-full">{children}</div>
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
