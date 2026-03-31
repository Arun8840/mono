import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { client } from "@repo/server/client";
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Spinner,
  toast,
} from "@repo/ui/components";
import {
  dragItemCreateSchema,
  CreateDragItemSchemaInput,
} from "@repo/validations";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const CreateDragItemForm = () => {
  const addComponent = useMutation({
    mutationFn: async (req: CreateDragItemSchemaInput) => {
      const body = {
        name: req.name,
        componentType: req.componentType,
        type: req.type,
      };
      const res = await client.dragItems.create.post(body);
      return res;
    },
    onSuccess: (context) => {
      toast.success(context?.data?.message);
    },
    onError: (context) => {
      toast.error(context?.message);
    },
  });
  const form = useForm<CreateDragItemSchemaInput>({
    defaultValues: {
      name: "",
      componentType: "button",
      type: "component",
    },
    resolver: standardSchemaResolver(dragItemCreateSchema),
  });
  const isSubmitting = addComponent?.isPending || form.formState.isSubmitting;
  const handleCreate: SubmitHandler<CreateDragItemSchemaInput> = async (
    data,
  ) => {
    addComponent.mutate(data);
  };
  return (
    <form
      onSubmit={form.handleSubmit(handleCreate)}
      className="flex flex-col gap-4  h-full justify-between"
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-name"
                aria-invalid={fieldState.invalid}
                placeholder="Name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="componentType"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-component-type">
                Component Type
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-component-type"
                aria-invalid={fieldState.invalid}
                placeholder="Component Type"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-type">Type</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-type"
                aria-invalid={fieldState.invalid}
                placeholder="Type"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "Add Component"}
      </Button>
    </form>
  );
};
