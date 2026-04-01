import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { client } from "@repo/server/client"
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Spinner,
  toast,
} from "@repo/ui/components"

import {
  CreatePageInputType,
  createPageSchema,
} from "@repo/validations/application.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

type PageFormProps = {
  afterClose?: () => void
  applicationId: string
}

export const PageForm: React.FC<PageFormProps> = ({
  afterClose,
  applicationId,
}) => {
  const utils = useQueryClient()
  const addApplication = useMutation({
    mutationFn: async (req: CreatePageInputType) => {
      const body = {
        title: req.title,
        description: req.description,
        applicationId: req.applicationId,
      }
      const res = await client.app.pages.create.post(body)
      return res
    },
    onSuccess: async (context) => {
      await utils.invalidateQueries({
        queryKey: [`application-pages-${applicationId}`],
      })
      afterClose?.()
      toast.success(context?.data?.message)
    },
    onError: (context) => {
      toast.error(context?.message)
    },
  })
  const form = useForm<CreatePageInputType>({
    defaultValues: {
      title: "",
      description: "",
      applicationId: applicationId,
    },
    resolver: standardSchemaResolver(createPageSchema),
  })
  const isSubmitting = addApplication?.isPending || form.formState.isSubmitting
  const handleCreate: SubmitHandler<CreatePageInputType> = async (data) => {
    addApplication.mutate(data)
  }
  return (
    <form
      onSubmit={form.handleSubmit(handleCreate)}
      className="flex flex-col gap-4  h-full justify-between"
    >
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Title"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-description">
                Description
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-description"
                aria-invalid={fieldState.invalid}
                placeholder="Description"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "Create Application"}
      </Button>
    </form>
  )
}
