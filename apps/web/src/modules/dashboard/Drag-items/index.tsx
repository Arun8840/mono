"use client";
import { Button, ModalDrawer } from "@repo/ui/components";
import React from "react";
import Header from "../Header";
import { useGetModalState } from "@repo/ui/hooks/use-get-modal-state";
import { CreateDragItemForm } from "./create-form";

function DragItems() {
  const { open, isOpen, setIsOpen } = useGetModalState({
    value: "create-drag-item",
  });
  return (
    <section className="p-4">
      <Header
        title="Drag Components"
        description="Create and manage your drag components."
        event={
          <Button type="button" onClick={open}>
            Add Component
          </Button>
        }
      />
      <ModalDrawer
        open={isOpen}
        setOpen={setIsOpen}
        title="Create Drag Item"
        description="Fill out the form below to create a new drag item."
      >
        <CreateDragItemForm />
      </ModalDrawer>

      <div className="mt-4 border border-white"></div>
    </section>
  );
}

export default DragItems;
