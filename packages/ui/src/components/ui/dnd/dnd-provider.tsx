import React from "react"
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  type Modifier,
  KeyboardSensor,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
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
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors} modifiers={modifiers}>
      {children}
    </DndContext>
  )
}

export default DndProvider
