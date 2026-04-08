import PreviewModule from "@/modules/dashboard/Application/pages/preview"
import React from "react"

interface PagePreviewProps {
  params: Promise<{
    appId: string
    pageId: string
  }>
}
export default async function PagePreview({ params }: PagePreviewProps) {
  const { appId, pageId } = await params

  if (!appId || !pageId) return <p>Not Found</p>
  return (
    <>
      <PreviewModule appId={appId} pageId={pageId} />
    </>
  )
}
