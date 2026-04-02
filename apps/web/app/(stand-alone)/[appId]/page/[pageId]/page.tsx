import PageDesign from "@/modules/dashboard/Application/pages/design"
import React from "react"

interface PageByIdProps {
  params: {
    appId: string
    pageId: string
  }
}
export default async function PageById({ params }: PageByIdProps) {
  const { appId, pageId } = await params
  return (
    <>
      <PageDesign appId={appId} pageId={pageId} />
    </>
  )
}
