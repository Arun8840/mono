import React from "react"
import { Button } from "@repo/ui/components"
import { HugeiconsIcon } from "@hugeicons/react"
import { Plus, Brush, Eye } from "@hugeicons/core-free-icons"
import Link from "next/link"
const ToolBar = () => {
  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 backdrop-blur-md rounded-full p-1 flex items-center gap-1 z-50">
      <Button size={"icon"}>
        <HugeiconsIcon icon={Plus} />
      </Button>
      <Button type="button" size={"icon"} variant={"ghost"}>
        <HugeiconsIcon icon={Brush} />
      </Button>
      <Button size={"icon"} variant={"ghost"} render={<Link href={"#"} />}>
        <HugeiconsIcon icon={Eye} />
      </Button>
    </div>
  )
}

export default ToolBar
