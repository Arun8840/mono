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
            return (
              <Button
                variant={"outline"}
                nativeButton={false}
                key={items.id}
                render={
                  <Draggable
                    id={items.id}
                    data={items}
                    type={items.type}
                    className="size-full p-2"
                  >
                    <HugeiconsIcon icon={ThreeDViewIcon} /> {items.name}
                  </Draggable>
                }
              />
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
        render={<Button disabled={isPending} size="icon" />}
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
