"use client"
import { Button, ModalDrawer, Spinner } from "@repo/ui/components"
import React from "react"
import Header from "../Header"
import { useGetModalState } from "@repo/ui/hooks/use-get-modal-state"
import { useQuery } from "@tanstack/react-query"
import { client } from "@repo/server/client"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  AddCircleHalfDotFreeIcons,
  AiProgrammingIcon,
} from "@hugeicons/core-free-icons"
import { ApplicationForm } from "./application-form"

function Application() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["application-templates"],
    queryFn: async () => {
      const res = await client.app.get()
      return res
    },
  })

  const appItems = data?.data || []
  const { open, isOpen, setIsOpen, close } = useGetModalState({
    value: "create-application",
  })

  if (isPending)
    return (
      <div className="flex items-center justify-center p-3">
        <Spinner />{" "}
        <small className="ml-2 text-muted-foreground">Loading...</small>
      </div>
    )

  if (isError)
    return (
      <div className="flex justify-center items-center p-3">
        <small className="text-destructive">Something went wrong</small>
      </div>
    )
  return (
    <section className="p-4">
      <Header
        title="Application"
        description="Application is a collection of components that are used to build a page."
        event={
          <Button type="button" onClick={open}>
            <HugeiconsIcon icon={AddCircleHalfDotFreeIcons} /> New Application
          </Button>
        }
      />
      <ModalDrawer
        open={isOpen}
        setOpen={setIsOpen}
        title="Create Application"
        description="Fill out the form below to create a new application."
      >
        <ApplicationForm afterClose={close} />
      </ModalDrawer>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {Array.isArray(appItems) &&
          appItems?.map((item) => {
            return (
              <div
                key={item?.id}
                className="border bg-card rounded p-2 h-70 flex flex-col gap-2 justify-center items-center text-muted-foreground"
              >
                <HugeiconsIcon icon={AiProgrammingIcon} />
                <small>{item?.title}</small>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default Application
