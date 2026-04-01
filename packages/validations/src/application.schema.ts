import z from "zod"

export const createApplicationSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
})

export type CreateApplicationInputType = z.infer<typeof createApplicationSchema>

export const deleteApplicationSchema = z.object({
  appId: z.string(),
})

export type DeleteApplicationInputType = z.infer<typeof deleteApplicationSchema>

export const updateApplicationSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
})

export type UpdateApplicationInputType = z.infer<typeof updateApplicationSchema>

export const createPageSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
  applicationId: z.string(),
})

export type CreatePageInputType = z.infer<typeof createPageSchema>
