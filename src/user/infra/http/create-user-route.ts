import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/api/v1/users',
    {
      schema: {
        tags: ['users'],
        body: z.object({
          name: z.string().min(3).max(255),
          email: z.string().email().min(5).max(255),
          password: z.string().min(8),
        }),
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { name, email, password } = request.body

      return {
        name,
        email,
        password,
      }
    },
  )
}
