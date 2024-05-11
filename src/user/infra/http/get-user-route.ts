import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { RouterInterface } from '@/_core/router-interface'

export class GetUserRoute implements RouterInterface {
  public async handler(app: FastifyInstance) {
    app
      .withTypeProvider<ZodTypeProvider>()
      .get('/api/v1/users', {}, async () => {
        return {}
      })
  }
}
