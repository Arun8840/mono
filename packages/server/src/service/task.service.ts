import { User } from "../model"

export const createTaskService = () => {
  const users: User[] = [
    { id: 1, name: "Arun", email: "arun@example.com", role: "admin" },
  ]

  return {
    getAll: async () => users,

    getById: async (id: number) => users.find((u) => u.id === id),

    create: async (data: Omit<User, "id">) => {
      const newUser = { id: users.length + 1, ...data }
      users.push(newUser)
      return newUser
    },
  }
}

export type TaskService = ReturnType<typeof createTaskService>
