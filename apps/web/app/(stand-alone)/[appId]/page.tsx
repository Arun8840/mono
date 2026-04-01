import ApplicationPages from "@/modules/dashboard/Application/pages"
import React from "react"

interface ApplicationPageByIdProps {
  params: {
    appId: string
  }
}
async function ApplicationPageById({ params }: ApplicationPageByIdProps) {
  const { appId } = await params
  return (
    <>
      <ApplicationPages appId={appId} />
    </>
  )
}

export default ApplicationPageById
