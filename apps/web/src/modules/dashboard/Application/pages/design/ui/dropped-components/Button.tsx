import React from "react"
import DroppedComponentWrapper from "../component-wrapper"
import { ComponentWrapperProps } from "@/types/comp.wrapper.types"
import { Button } from "@repo/ui/components"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import { useMutation } from "@tanstack/react-query"
import { useApplicationStore } from "@/store/app"
import { client } from "@repo/server/client"
import TextEditorToolbar from "../Text-editor"

import { TextStyle, Color } from "@tiptap/extension-text-style"

export interface DroppedButtonProps extends ComponentWrapperProps {}
const DroppedButton: React.FC<DroppedButtonProps> = ({
  value,
  dimensions,
  isPreview,
}) => {
  const { properties } = value
  const content = properties?.content || "<p>Button</p>"
  const updateComponent = useApplicationStore((state) => state?.updateComponent)
  const updateComponentMutate = useMutation({
    mutationFn: async () => {
      await client.app.pages.component.page.component.update.post(updateReq)
    },
  })
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
    ],
    content: content,
    immediatelyRender: false,
    onBlur: async () => {
      updateComponent?.(updateReq)
      updateComponentMutate?.mutate()
    },
    editable: !isPreview,
  })
  const updateReq = {
    ...value,
    properties: {
      content: editor?.getHTML(),
    },
  }
  return (
    <DroppedComponentWrapper
      value={value}
      dimensions={dimensions}
      isPreview={isPreview}
      toolbar={<TextEditorToolbar editor={editor} />}
    >
      <Button className={"w-full h-full"}>
        <EditorContent editor={editor} className="outline-none" />
      </Button>
    </DroppedComponentWrapper>
  )
}

export default DroppedButton
