"use client"

import { useMutation } from "@tanstack/react-query"
import { client } from "@repo/server/client"
import { toast } from "@repo/ui/components"
import { componentType } from "@/types/global"

export function useEditorMutations() {
  const addComponent = useMutation({
    mutationFn: async (request: componentType) => {
      return client.app.pages.component.page.component.create.post(request)
    },
    onSuccess: (res) => {
      if (res.data?.message) {
        toast.success(res.data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const updateComponent = useMutation({
    mutationFn: async (component: any) => {
      return client.app.pages.component.page.component.update.post(component)
    },
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    addComponent,
    updateComponent,
  }
}
