import React from "react"
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  type Modifier,
} from "@dnd-kit/core"

export type { DragEndEvent, Modifier }

interface DndProviderProps {
  children: React.ReactNode
  onDragEnd: (event: DragEndEvent) => void
  modifiers?: Modifier[]
}

function DndProvider({ children, onDragEnd, modifiers }: DndProviderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 30 },
    }),
  )

  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors} modifiers={modifiers}>
      {children}
    </DndContext>
  )
}

export default DndProvider
