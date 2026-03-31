// packages/validations/src/dragItem.schema.ts
import { z } from "zod";

export const componentTypeValues = [
  "input",
  "text",
  "button",
  "asset",
] as const;
export const typeValues = ["group", "component"] as const;

export const componentTypeEnum = z.enum(componentTypeValues);
export const typeEnum = z.enum(typeValues);

// these are now correct
export type ComponentTypeEnum = z.infer<typeof componentTypeEnum>; // "input" | "text" | "button" | "asset"
export type TypeEnum = z.infer<typeof typeEnum>; // "group" | "component"

export const dragItemCreateSchema = z.object({
  name: z.string().min(1),
  componentType: componentTypeEnum, // "input" | "text" | "button" | "asset"
  type: typeEnum, // "group" | "component"
});

export type CreateDragItemSchemaInput = z.infer<typeof dragItemCreateSchema>;
