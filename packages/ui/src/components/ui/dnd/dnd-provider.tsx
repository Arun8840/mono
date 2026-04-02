import { DragDropManager, DragDropProvider, DragEndEvent } from "@dnd-kit/react"
import React from "react"

// DragEndEvent is currently defined as the function itself:
// (event: EventData, manager: Manager) => void
// We use Parameters<...>[0] to get the actual "event" object type.
export type DragEndEventData = Parameters<DragEndEvent>[0]
export type DragEventManager = DragDropManager

interface DNDProviderProps {
  children: React.ReactNode
  onDragEnd: (event: DragEndEventData, manager: DragDropManager) => void
}

function DndProvider({ children, onDragEnd }: DNDProviderProps) {
  return <DragDropProvider onDragEnd={onDragEnd}>{children}</DragDropProvider>
}

export default DndProvider
