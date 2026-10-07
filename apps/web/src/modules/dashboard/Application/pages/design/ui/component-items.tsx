"use client"
import { ThreeDViewIcon, Plus } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { client } from "@repo/server/client"
import {
  Button,
  Draggable,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@repo/ui/components"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { ComponentRegistryIcons } from "./Registry"

const ComponentItems = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["drag-items"],
    queryFn: async () => {
      const response = await client.dragItems.get()
      return response
    },
  })

  const dragItems = data?.data || []

  const createDragItemList = () => {
    return (
      <div className="grid grid-cols-4 gap-2">
        {Array.isArray(dragItems) &&
          dragItems?.map((items) => {
            const Icon =
              ComponentRegistryIcons?.[
                items?.componentType as keyof typeof ComponentRegistryIcons
              ] || ThreeDViewIcon
            return (
              <Draggable
                id={items.id}
                data={items}
                type={items.type}
                key={items.id}
                className="size-full"
              >
                <Button
                  className={"hover:bg-primary hover:text-secondary-foreground"}
                  variant={"outline"}
                  title={items?.name}
                  size={"icon"}
                >
                  <HugeiconsIcon icon={Icon} />
                </Button>
              </Draggable>
            )
          })}
      </div>
    )
  }
  if (isPending) return <Spinner />
  if (isError) return
  return (
    <Popover>
      <PopoverTrigger
        nativeButton={true}
        render={
          <Button
            className={"active:rotate-90 origin-center"}
            disabled={isPending}
            size="icon"
          />
        }
      >
        {isPending ? <Spinner /> : <HugeiconsIcon icon={Plus} />}
      </PopoverTrigger>

      <PopoverContent className="w-full max-w-lg">
        {createDragItemList()}
      </PopoverContent>
    </Popover>
  )
}

export default ComponentItems
