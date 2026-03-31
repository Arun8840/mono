"use client";
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
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { registerSchema, RegisterSchemaInput } from "@repo/validations";
import Link from "next/link";
import { signUp } from "@repo/better-auth";

const RegisterForm = () => {
  const form = useForm<RegisterSchemaInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: standardSchemaResolver(registerSchema),
  });

  const isSubmitting = form.formState.isSubmitting;
  const handleRegister: SubmitHandler<RegisterSchemaInput> = async (data) => {
    const res = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/auth/login",
    });
    if (res?.error) {
      toast.error(res.error.message ?? "Something went wrong");
    }
    if (res.data) {
      toast.success("Registered successfully");
    }
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
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "Register"}
      </Button>
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
