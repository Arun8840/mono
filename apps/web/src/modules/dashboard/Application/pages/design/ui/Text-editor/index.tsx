import React from "react"
import type { Editor } from "@tiptap/react"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components"
import { headings, lineHeightOptions, textAligner } from "./editor.data"
import { HugeiconsIcon } from "@hugeicons/react"
import { Heading, Space } from "@hugeicons/core-free-icons"

interface TextEditorToolbarProps {
  editor: Editor | null
}
type LineHeightValue = (typeof lineHeightOptions)[number]["value"]
const baseClass =
  "w-fit absolute -top-12 left-0 z-50 bg-card rounded-lg p-1.5 flex items-center gap-2"

const TextEditorToolbar = ({ editor }: TextEditorToolbarProps) => {
  if (!editor) return null

  return (
    <div className={baseClass}>
      {createTextLineHeight(editor)}
      {createHeadingSize(editor)}
      {createTextAligner(editor)}
    </div>
  )
}

export default TextEditorToolbar

const createHeadingSize = (editor: Editor) => {
  const currentLevel = [1, 2, 3, 4, 5, 6].find((level) =>
    editor.isActive("heading", { level }),
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton={true}
        render={
          <Button
            size={"icon-xs"}
            variant={currentLevel ? "default" : "outline"}
            className={"rounded"}
          >
            <HugeiconsIcon icon={Heading} />
          </Button>
        }
      />
      <DropdownMenuContent>
        {headings.map((heading) => {
          const isActive = editor.isActive("heading", { level: heading.level })
          return (
            <DropdownMenuItem
              key={heading.level}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: heading.level as any })
                  .run()
              }
              className={isActive ? "bg-accent" : ""}
            >
              <HugeiconsIcon icon={heading.icon} />
              <span className="ml-2">Heading {heading.level}</span>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={!currentLevel ? "bg-accent" : ""}
        >
          <span>Paragraph</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const createTextAligner = (editor: Editor) => {
  return textAligner.map((aligner) => {
    const isActive = editor.isActive({ textAlign: aligner.value })

    return (
      <Button
        key={aligner.value}
        size={"icon-xs"}
        variant={isActive ? "default" : "outline"}
        className={"rounded"}
        title={aligner.label}
        onClick={() => editor.chain().focus().setTextAlign(aligner.value).run()}
      >
        <HugeiconsIcon icon={aligner.icon} />
      </Button>
    )
  })
}

const isLineHeightActive = (editor: Editor, value: LineHeightValue) => {
  if (!value) return false
  return (
    editor.isActive("paragraph", { lineHeight: value }) ||
    editor.isActive("heading", { lineHeight: value })
  )
}

const createTextLineHeight = (editor: Editor) => {
  const currentLevel = lineHeightOptions.find((opt) =>
    isLineHeightActive(editor, opt.value),
  )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton={true}
        render={
          <Button
            size={"icon-xs"}
            variant={currentLevel ? "default" : "outline"}
            className={"rounded"}
          >
            <HugeiconsIcon icon={Space} />
          </Button>
        }
      />
      <DropdownMenuContent>
        {lineHeightOptions.map((lineHeight) => {
          const isActive = lineHeight.value
            ? isLineHeightActive(editor, lineHeight.value)
            : !currentLevel
          return (
            <DropdownMenuItem
              key={lineHeight.value ?? "default"}
              className={isActive ? "bg-accent" : ""}
            >
              <span className="ml-2">{lineHeight.label}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
