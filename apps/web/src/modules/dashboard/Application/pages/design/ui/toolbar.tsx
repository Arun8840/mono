import React from "react"
import { Button } from "@repo/ui/components"
import { HugeiconsIcon } from "@hugeicons/react"
import { Brush, Eye } from "@hugeicons/core-free-icons"
import Link from "next/link"
import ComponentItems from "./component-items"
import { useParams } from "next/navigation"
import { useApplicationStore } from "@/store/app"
const ToolBar = () => {
  const params = useParams()
  const appId = params?.appId as string
  const pageId = params?.pageId as string
  const setSelectedComponent = useApplicationStore(
    (state) => state?.setSelectedComponent,
  )
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 backdrop-blur-md rounded-full p-1 flex items-center gap-1 z-50">
      <ComponentItems />
      <Button
        onClick={() => setSelectedComponent(pageId)}
        type="button"
        size={"icon"}
        variant={"ghost"}
      >
        <HugeiconsIcon icon={Brush} />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        nativeButton={false}
        render={<Link href={`/${appId}/page/${pageId}/preview`} />}
      >
        <HugeiconsIcon icon={Eye} />
      </Button>
    </div>
  )
}

export default ToolBar
