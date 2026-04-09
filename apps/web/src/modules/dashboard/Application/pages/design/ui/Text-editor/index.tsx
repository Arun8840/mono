import React from "react"
import type { Editor } from "@tiptap/react"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components"
import { headings, textAligner, textMarkdowns } from "./editor.data"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AlignLeft,
  Heading,
  ColorPickerFreeIcons,
} from "@hugeicons/core-free-icons"

interface TextEditorToolbarProps {
  editor: Editor | null
}
const baseClass =
  "w-fit absolute -top-12 left-0 z-50 bg-card rounded-lg p-1.5 flex items-center gap-2"

const TextEditorToolbar = ({ editor }: TextEditorToolbarProps) => {
  if (!editor) return null

  return (
    <div className={baseClass}>
      {createHeadingSize(editor)}
      {createTextAligner(editor)}
      {createTextMarkdown(editor)}
      {createColorModifier(editor)}
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
            {currentLevel ? (
              <small>H{currentLevel}</small>
            ) : (
              <HugeiconsIcon icon={Heading} />
            )}
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton={true}
        render={
          <Button size={"icon-xs"} variant={"outline"} className={"rounded"}>
            <HugeiconsIcon icon={AlignLeft} />
          </Button>
        }
      />
      <DropdownMenuContent>
        {textAligner.map((aligner) => {
          const isActive = editor.isActive("textAlign", {
            textAlign: aligner.value,
          })
          return (
            <DropdownMenuItem
              key={aligner.value}
              onClick={() =>
                editor.chain().focus().setTextAlign(aligner.value).run()
              }
              className={isActive ? "bg-accent" : ""}
            >
              <HugeiconsIcon icon={aligner.icon} />
              <span className="ml-2">{aligner.label}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const createTextMarkdown = (editor: Editor) => {
  return textMarkdowns?.map((markdown, markdownIdx) => {
    return (
      <Button
        key={`${markdown?.label}-${markdownIdx}`}
        size={"icon-xs"}
        variant={editor.isActive(markdown.value) ? "default" : "outline"}
        className={"rounded"}
        onClick={() => editor.chain().focus().toggleMark(markdown.value).run()}
        title={markdown?.label}
      >
        <HugeiconsIcon icon={markdown.icon} />
      </Button>
    )
  })
}

const createColorModifier = (editor: Editor) => {
  const currentColor = editor.getAttributes("textStyle").color
  return (
    <label htmlFor="colorSelector">
      <input
        type="color"
        name="editor color"
        id="colorSelector"
        className="sr-only"
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
      />
      <div
        className={"rounded p-1"}
        title="Color"
        style={{ backgroundColor: currentColor }}
      >
        <HugeiconsIcon icon={ColorPickerFreeIcons} size={15} />
      </div>
    </label>
  )
}
