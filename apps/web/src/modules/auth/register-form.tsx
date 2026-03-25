"use client";
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from "@repo/ui/components";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterSchemaInput,
} from "@repo/validations/register.schema";
import Link from "next/link";

const RegisterForm = () => {
  const form = useForm<RegisterSchemaInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const handleRegister: SubmitHandler<RegisterSchemaInput> = async (data) => {
    console.log(data);
  };
  return (
    <form
      action=""
      onSubmit={form.handleSubmit(handleRegister)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Register</h2>
        <p className="text-muted-foreground">Enter your details to register</p>
      </div>
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-password">Password</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-password"
                aria-invalid={fieldState.invalid}
                placeholder="Password"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-confirm-password"
                aria-invalid={fieldState.invalid}
                placeholder="Confirm Password"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit">Register</Button>
      <div className="text-center">
        <p className="text-muted-foreground text-sm p-3">
          Already have an account?&nbsp;
          <Link href="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
