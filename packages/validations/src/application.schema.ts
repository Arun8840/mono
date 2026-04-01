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

export const udpateApplicationSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
})

export type UpdateApplicationInputType = z.infer<typeof udpateApplicationSchema>
