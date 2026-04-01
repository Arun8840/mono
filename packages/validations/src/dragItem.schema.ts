// packages/validations/src/dragItem.schema.ts
import { z } from "zod"

export const componentTypeValues = [
  "input",
  "text",
  "button",
  "asset",
  "select",
  "textarea",
  "checkbox",
  "radio",
  "switch",
] as const
export const typeValues = ["group", "component"] as const

export const componentTypeEnum = z.enum(componentTypeValues)

export const typeEnum = z.enum(typeValues)

export type ComponentTypeEnum = z.infer<typeof componentTypeEnum>
export type TypeEnum = z.infer<typeof typeEnum>

export const dragItemCreateSchema = z.object({
  name: z.string().min(1),
  componentType: z.string().min(1),
  type: typeEnum,
})

export type CreateDragItemSchemaInput = z.infer<typeof dragItemCreateSchema>
