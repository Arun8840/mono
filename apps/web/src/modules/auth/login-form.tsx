"use client"
import React from "react"
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

import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import Link from "next/link"
import { signIn } from "@repo/better-auth"
import { loginSchema, LoginSchemaInput } from "@repo/validations"

const LoginForm = () => {
  const form = useForm<LoginSchemaInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: standardSchemaResolver(loginSchema),
  })

  const isSubmitting = form.formState.isSubmitting

  const handleLogin: SubmitHandler<LoginSchemaInput> = async (data) => {
    const res = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    })
    if (res?.error) {
      toast.error(res?.error?.message ?? "Something went wrong")
    }
    if (res.data) {
      toast.success("Logged in successfully")
    }
  }
  return (
    <div>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-muted-foreground">
            Enter your credentials to login
          </p>
        </div>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Email"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-password">
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Password"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "Login"}
        </Button>
        <div className="text-center">
          <p className="text-muted-foreground text-sm p-3">
            Don't have an account?&nbsp;
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
