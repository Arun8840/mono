import React, { useEffect } from "react"
import { useApplicationStore } from "@/store/app"
import { Button, Spinner } from "@repo/ui/components"
import { HugeiconsIcon } from "@hugeicons/react"
import { Back, X } from "@hugeicons/core-free-icons"
import PropertyContext from "./Properties/property-context"
import { useForm } from "react-hook-form"
import { componentType } from "@/types/global"
import AppearanceProperties from "./Properties/property-appearance"
import { useMutation } from "@tanstack/react-query"
import { client } from "@repo/server/client"
import { GsapDraggable } from "@repo/ui/components"
function PropertyPanel() {
  const selectedComponent = useApplicationStore(
    (state) => state?.selectedComponent,
  )
  const setSelectedComponent = useApplicationStore(
    (state) => state?.setSelectedComponent,
  )
  const updateComponent = useApplicationStore((state) => state?.updateComponent)
  const updateMutate = useMutation({
    mutationFn: async (data: componentType) => {
      console.log("data", data)
      return await client.app.pages.component.page.component.update.post(data)
    },
    onSuccess: (updatedData) => {
      const updatedValue = updatedData?.data?.data as componentType
      updateComponent(updatedValue)
    },
  })

  const methods = useForm<componentType>({
    defaultValues: {
      ...selectedComponent,
    },
  })
  const isPending = updateMutate.isPending || methods?.formState?.isSubmitting
  const handleReset = () => {
    methods.reset(selectedComponent as componentType)
  }

  const onSubmit = (data: componentType) => {
    updateMutate.mutate(data)
  }

  useEffect(() => {
    if (!selectedComponent) return
    methods.reset(selectedComponent)
  }, [selectedComponent, methods])

  if (!selectedComponent) return
  return (
    <GsapDraggable handle=".drag-handle" className="p-3 fixed top-1/2 -translate-y-1/2 right-2 w-2xs h-fit z-50 divide-y divide-dashed divide-primary/50 space-y-3">
      <div className="flex items-center justify-between drag-handle">
        <h1 className="select-none">Properties</h1>
        <Button
          onClick={() => setSelectedComponent(null)}
          type="button"
          size={"sm"}
          variant={"ghost"}
        >
          <HugeiconsIcon icon={X} />
        </Button>
      </div>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <PropertyContext methods={methods}>
          <AppearanceProperties />
        </PropertyContext>
        <div className="flex justify-end gap-2">
          <Button
            disabled={isPending}
            type="button"
            variant={"outline"}
            onClick={handleReset}
            size={"sm"}
          >
            <HugeiconsIcon icon={Back} />
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            size={"sm"}
            className={"flex-1"}
          >
            {isPending && <Spinner />}
            Save
          </Button>
        </div>
      </form>
    </GsapDraggable>
  )
}

export default PropertyPanel
