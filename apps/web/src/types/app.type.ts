import React, { CSSProperties } from "react";
import { componentType, MoveComponentRequest, PositionType } from "./global";
import { FieldValues } from "react-hook-form";

export interface PageTypes {
  id: string;
  title: string;
  description: string;
  applicationId: string;
  createdAt: Date;
  updatedAt: Date;
  styles: CSSProperties;
  components: componentType[];
}

export type ApplicationResponse = PageTypes[];

// * FOR APPLICATION STORE TYPES
export interface ApplicationStore {
  page: PageTypes;
  selectedComponent: componentType | null;
  getPage: (page: PageTypes) => void;
  addComponent: (component: componentType) => void;
  updateComponent: (updates: componentType) => void;
  resizeComponent: (id: string, updates: PositionType) => void;
  moveComponent: (id: string, updates: MoveComponentRequest) => void;
  removeComponent: (id: string) => void;
  setComponents: (components: componentType[]) => void;
  clearPage: () => void;
  setSelectedComponent: (id: string | null) => void;
}

// * FOR THEME TYPES
export interface PropProviderProps<T extends FieldValues = FieldValues> {
  children: React.ReactNode;
  methods: T;
}
