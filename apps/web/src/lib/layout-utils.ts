import { componentType } from "@/types/global"

interface ComponentRequest {
  position: { x: number; y: number; w: number; h: number }
  [key: string]: unknown
}

export function resolveCollisions(
  existingComponents: componentType[],
  newComponent: ComponentRequest,
): componentType[] {
  const updatedComponents = [...existingComponents]

  for (let i = 0; i < updatedComponents.length; i++) {
    const comp = updatedComponents[i]
    const compPos = comp?.position

    const newPos = newComponent.position
    const newX = newPos.x
    const newY = newPos.y
    const newW = newPos.w
    const newH = newPos.h

    const existingLeft = compPos?.x
    const existingRight = compPos?.x! + compPos?.w!
    const existingTop = compPos?.y
    const existingBottom = compPos?.y! + compPos?.h!

    const newLeft = newX
    const newRight = newX + newW
    const newTop = newY
    const newBottom = newY + newH

    const overlapsX = newLeft < existingRight && newRight > existingLeft!
    const overlapsY = newTop < existingBottom && newBottom > existingTop!

    if (overlapsX && overlapsY) {
      const moveDown = existingBottom - newTop
      newComponent.position.y = newY + moveDown
    }
  }

  updatedComponents.push({
    ...newComponent,
    id: (newComponent as { id?: string }).id || crypto.randomUUID(),
    pageId: (newComponent as { pageId?: string }).pageId || "",
    applicationId:
      (newComponent as { applicationId?: string }).applicationId || "",
    name: (newComponent as { type?: string }).type || "",
    type: (newComponent as { type?: string }).type || "",
  } as componentType)

  return updatedComponents
}
