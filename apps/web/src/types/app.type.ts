import { CSSProperties } from "react";
import { componentType } from "./global";

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
  getPage: (page: PageTypes) => void;
  addComponent: (component: componentType) => void;
  updateComponent: (id: string, updates: Partial<componentType>) => void;
  removeComponent: (id: string) => void;
  setComponents: (components: componentType[]) => void;
  clearPage: () => void;
}
