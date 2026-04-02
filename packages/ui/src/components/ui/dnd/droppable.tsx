import { useDroppable } from "@dnd-kit/react"
import { cn } from "@repo/ui/lib/utils"
import React from "react"

interface DroppableProps {
  id: string
  children: React.ReactNode
  className?: string
  type: string
  data?: Record<string, string>
}
const baseClass = "size-full"
const Droppable: React.FC<DroppableProps> = ({
  id,
  children,
  className,
  type,
  data,
}) => {
  const { ref } = useDroppable({
    id,
    type: type,
    accept: type,
    data: data ?? { id, type },
  })

  return (
    <div ref={ref} className={cn(baseClass, className)}>
      {children}
    </div>
  )
}

export default Droppable
