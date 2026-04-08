import React from "react";
import type { Editor } from "@tiptap/react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components";
import { headings, textAligner } from "./editor.data";
import { HugeiconsIcon } from "@hugeicons/react";
import { Heading } from "@hugeicons/core-free-icons";

interface TextEditorToolbarProps {
  editor: Editor | null;
}

const baseClass =
  "w-fit absolute -top-12 left-0 z-50 bg-card rounded-lg p-1.5 flex items-center gap-2";

const TextEditorToolbar = ({ editor }: TextEditorToolbarProps) => {
  if (!editor) return null;

  return (
    <div className={baseClass}>
      {createHeadingSize(editor)}
      {createTextAligner(editor)}
    </div>
  );
};

export default TextEditorToolbar;

const createHeadingSize = (editor: Editor) => {
  const currentLevel = [1, 2, 3, 4, 5, 6].find((level) =>
    editor.isActive("heading", { level }),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton={true}
        render={
          <Button
            size={"icon-sm"}
            variant={currentLevel ? "default" : "outline"}
            className={"rounded-lg"}
          >
            <HugeiconsIcon icon={Heading} />
          </Button>
        }
      />
      <DropdownMenuContent>
        {headings.map((heading) => {
          const isActive = editor.isActive("heading", { level: heading.level });
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
          );
        })}
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={!currentLevel ? "bg-accent" : ""}
        >
          <span>Paragraph</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const createTextAligner = (editor: Editor) => {
  return textAligner.map((aligner) => {
    const isActive = editor.isActive({ textAlign: aligner.value });

    return (
      <Button
        key={aligner.value}
        size={"icon-sm"}
        variant={isActive ? "default" : "outline"}
        className={"rounded-lg"}
        title={aligner.label}
        onClick={() => editor.chain().focus().setTextAlign(aligner.value).run()}
      >
        <HugeiconsIcon icon={aligner.icon} />
      </Button>
    );
  });
};
