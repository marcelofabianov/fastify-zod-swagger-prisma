import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function getUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/api/v1/users',
    {
      schema: {
        tags: ['users'],
      },
    },
    async () => {
      return {
        id: 1,
      }
    },
  )
}
