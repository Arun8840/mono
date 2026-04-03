import { Droppable } from "@repo/ui/components"
import React, { useMemo } from "react"
import { useApplicationStore } from "@/store/app"

function PageComponent() {
  const page = useApplicationStore((state) => state?.page)

  const createComponent = useMemo(() => {
    return page?.components?.map((component) => {
      return <div key={component.id}>{component.name}</div>
    })
  }, [page?.components])

  return (
    <div className="p-2 size-full">
      <Droppable id="droppable" type="component" accept={["component"]}>
        {createComponent}
      </Droppable>
    </div>
  )
}

export default PageComponent
