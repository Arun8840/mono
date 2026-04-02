import React from "react"

type PageDesignProps = {
  appId: string
  pageId: string
}
function PageDesign({ appId, pageId }: PageDesignProps) {
  return <section className="p-3 h-full relative"></section>
}

export default PageDesign
