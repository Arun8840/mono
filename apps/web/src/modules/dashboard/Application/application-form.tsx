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
  CreateApplicationInputType,
  createApplicationSchema,
} from "@repo/validations"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

type ApplicationFormProps = {
  afterClose?: () => void
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  afterClose,
}) => {
  const utils = useQueryClient()
  const addApplication = useMutation({
    mutationFn: async (req: CreateApplicationInputType) => {
      const body = {
        title: req.title,
        description: req.description,
      }
      debugger
      const res = await client.app.create.post(body)
      return res
    },
    onSuccess: async (context) => {
      await utils.invalidateQueries({ queryKey: ["application-templates"] })
      afterClose?.()
      toast.success(context?.data?.message)
    },
    onError: (context) => {
      toast.error(context?.message)
    },
  })
  const form = useForm<CreateApplicationInputType>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: standardSchemaResolver(createApplicationSchema),
  })
  const isSubmitting = addApplication?.isPending || form.formState.isSubmitting
  const handleCreate: SubmitHandler<CreateApplicationInputType> = async (
    data,
  ) => {
    debugger
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
