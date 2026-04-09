"use client";
import React from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

function PropertyContext<T extends FieldValues = FieldValues>({
  children,
  methods,
}: {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
}) {
  return <FormProvider {...methods}>{children}</FormProvider>;
}

export default PropertyContext;
