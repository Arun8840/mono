"use client"
import React, { useMemo } from "react"
import Header from "../../Header"
import { Button, ModalDrawer, Spinner } from "@repo/ui/components"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  AddCircleHalfDotFreeIcons,
  Paperclip,
} from "@hugeicons/core-free-icons"
import { useQuery } from "@tanstack/react-query"
import { client } from "@repo/server/client"
import { useGetModalState } from "@repo/ui/hooks/use-get-modal-state"
import { PageForm } from "./page-form"
import { useRouter } from "next/navigation"
type ApplicationPagesProps = {
  appId: string
}
function ApplicationPages({ appId }: ApplicationPagesProps) {
  const navigation = useRouter()
  const { data, isPending, isError } = useQuery({
    queryKey: [`application-pages-${appId}`],
    queryFn: async () => {
      const res = await client.app.pages({ appId }).get()
      return res
    },
  })

  const { open, isOpen, setIsOpen, close } = useGetModalState({
    value: "create-page",
  })

  const pageItems = data?.data || []

  const createPageCard = useMemo(() => {
    return (
      Array.isArray(pageItems) &&
      pageItems?.map((item) => {
        return (
          <div
            key={item?.id}
            onDoubleClick={() => navigation.push(`/${appId}/page/${item?.id}`)}
            className="border bg-card rounded p-2 h-70 flex flex-col gap-2 justify-center items-center text-muted-foreground"
          >
            <HugeiconsIcon icon={Paperclip} />
            <small>{item?.title}</small>
          </div>
        )
      })
    )
  }, [pageItems])

  if (isPending) {
    return (
      <div className="flex justify-center items-center p-3">
        <Spinner />
        <small className="ml-2">Loading...</small>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center p-3 text-destructive">
        Something went wrong...
      </div>
    )
  }
  return (
    <section className="p-3">
      <ModalDrawer
        title="Create Page"
        description="Create a new page for your application"
        open={isOpen}
        setOpen={setIsOpen}
      >
        <PageForm afterClose={close} applicationId={appId} />
      </ModalDrawer>
      <Header
        title="Pages"
        description="Manage your application pages"
        event={
          <Button type="button" onClick={open}>
            <HugeiconsIcon icon={AddCircleHalfDotFreeIcons} />
            Add Page
          </Button>
        }
      />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {createPageCard}
      </div>
    </section>
  )
}

export default ApplicationPages
