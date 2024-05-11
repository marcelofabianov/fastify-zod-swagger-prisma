import { z } from 'zod'

const createUserSchema = {
  schema: {
    tags: ['users'],
    body: z.object({
      name: z.string().min(3).max(255),
      email: z.string().email().min(5).max(255),
      password: z.string().min(8),
    }),
  },
}

export { createUserSchema }
