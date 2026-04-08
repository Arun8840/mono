import React from "react"
import DroppedComponentWrapper from "../component-wrapper"
import { ComponentWrapperProps } from "@/types/comp.wrapper.types"
import TextEditorToolbar from "../Text-editor"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import { useApplicationStore } from "@/store/app"
import { useMutation } from "@tanstack/react-query"
import { client } from "@repo/server/client"

export interface HeadingProps extends ComponentWrapperProps {}
const Heading: React.FC<HeadingProps> = ({ value, dimensions, isPreview }) => {
  const { properties } = value

  //* hooks
  const updateComponent = useApplicationStore((state) => state?.updateComponent)
  const content = properties?.content || "<h1>Heading</h1>"
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
      toolbar={<TextEditorToolbar editor={editor} />}
      isPreview={isPreview}
    >
      <div className="prose prose-sm max-w-none size-full p-0.5">
        <EditorContent editor={editor} className="h-full outline-none" />
      </div>
    </DroppedComponentWrapper>
  )
}

export default Heading
