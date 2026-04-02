import { useDraggable } from "@dnd-kit/react"
import { cn } from "@repo/ui/lib/utils"
import React from "react"
interface DraggableProps {
  id: string
  children: React.ReactNode
  className?: string
  data: Record<string, string>
  type: string
}
const baseClass = "size-fit"
const Draggable: React.FC<DraggableProps> = ({
  id,
  children,
  className,
  data,
  type,
}) => {
  const { ref } = useDraggable({
    id: id,
    data: data,
    type: type,
  })

  return (
    <div ref={ref} className={cn(baseClass, className)}>
      {children}
    </div>
  )
}

export default Draggable
