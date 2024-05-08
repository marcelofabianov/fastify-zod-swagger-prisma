import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function hello(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    url: '/',
    method: 'GET',
    handler: async () => {
      return { hello: 'world' }
    },
  })
}
