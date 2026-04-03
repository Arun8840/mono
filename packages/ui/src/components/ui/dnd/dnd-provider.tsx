import React from "react"
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"

export type { DragEndEvent }

interface DndProviderProps {
  children: React.ReactNode
  onDragEnd: (event: DragEndEvent) => void
}

function DndProvider({ children, onDragEnd }: DndProviderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 30 },
    }),
  )

  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors}>
      {children}
    </DndContext>
  )
}

export default DndProvider
