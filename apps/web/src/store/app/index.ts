import { ApplicationStore } from "@/types/app.type";
import { create } from "zustand";
import { initialAppState } from "./app.state";

export const useApplicationStore = create<ApplicationStore>((set) => ({
  ...initialAppState,
  getPage: (page) => {
    set({ page });
  },
  addComponent: (component) => {
    set((state) => ({
      page: {
        ...state.page,
        components: [...state.page.components, component],
      },
    }));
  },
  updateComponent: (id, updates) => {
    set((state) => ({
      page: {
        ...state.page,
        components: state.page.components.map((comp) =>
          comp.id === id ? { ...comp, ...updates } : comp,
        ),
      },
    }));
  },
  removeComponent: (id) => {
    set((state) => ({
      page: {
        ...state.page,
        components: state.page.components.filter((comp) => comp.id !== id),
      },
    }));
  },
  setComponents: (components) => {
    set((state) => ({
      page: {
        ...state.page,
        components,
      },
    }));
  },
  clearPage: () => {
    set((state) => ({
      page: {
        ...state.page,
        components: [],
      },
    }));
  },
}));
