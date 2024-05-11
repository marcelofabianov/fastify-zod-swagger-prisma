import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function getUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/api/v1/users',
    {
      schema: {
        tags: ['default'],
      },
    },
    async () => {
      return {
        id: 1,
      }
    },
  )
}
