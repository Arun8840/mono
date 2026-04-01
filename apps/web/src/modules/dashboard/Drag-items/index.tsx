"use client";
import { Button, ModalDrawer, Spinner } from "@repo/ui/components";
import React from "react";
import Header from "../Header";
import { useGetModalState } from "@repo/ui/hooks/use-get-modal-state";
import { CreateDragItemForm } from "./create-form";
import { useQuery } from "@tanstack/react-query";
import { client } from "@repo/server/client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  AddCircleHalfDotFreeIcons,
  ThreeDViewIcon,
} from "@hugeicons/core-free-icons";

function DragItems() {
  const { open, isOpen, setIsOpen, close } = useGetModalState({
    value: "create-drag-item",
  });
  const { data, isPending, isError } = useQuery({
    queryKey: ["drag-items"],
    queryFn: async () => {
      const res = await client.dragItems.get();
      return res;
    },
  });

  const dragItems = data?.data || [];

  if (isPending)
    return (
      <div className="flex items-center justify-center p-3">
        <Spinner />{" "}
        <small className="ml-2 text-muted-foreground">Loading...</small>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center p-3">
        <small className="text-destructive">Something went wrong</small>
      </div>
    );
  return (
    <section className="p-4">
      <Header
        title="Drag Components"
        description="Drag items directly into your page design area to build your layout."
        event={
          <Button type="button" onClick={open}>
            <HugeiconsIcon icon={AddCircleHalfDotFreeIcons} /> Add Component
          </Button>
        }
      />
      <ModalDrawer
        open={isOpen}
        setOpen={setIsOpen}
        title="Create Drag Item"
        description="Fill out the form below to create a new drag item."
      >
        <CreateDragItemForm afterClose={close} />
      </ModalDrawer>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2">
        {dragItems?.map((item) => {
          return (
            <div
              key={item?.id}
              className="border bg-card rounded p-2 h-20 flex flex-col gap-2 justify-center items-center text-muted-foreground"
            >
              <HugeiconsIcon icon={ThreeDViewIcon} />
              <small>{item?.name}</small>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DragItems;
