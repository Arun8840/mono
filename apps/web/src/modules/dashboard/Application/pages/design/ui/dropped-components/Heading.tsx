import React from "react"
import DroppedComponentWrapper from "../component-wrapper"
import { ComponentWrapperProps } from "@/types/comp.wrapper.types"
import TextEditorToolbar from "../Text-editor"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"

export interface HeadingProps extends ComponentWrapperProps {}
const Heading: React.FC<HeadingProps> = ({ value, dimensions }) => {
  const editor = useEditor({
    extensions: [StarterKit, TextAlign],
    content: "<p>Hello World! 🌎️</p>",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })
  return (
    <DroppedComponentWrapper
      value={value}
      dimensions={dimensions}
      toolbar={<TextEditorToolbar editor={editor} />}
    >
      <div className="prose prose-sm max-w-none size-full">
        <small>
          {value.position?.w} x {value.position?.h}
        </small>
        <EditorContent editor={editor} className="h-full outline-none" />
      </div>
    </DroppedComponentWrapper>
  )
}

export default Heading
