import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { createUserSchema } from './create-user-schema'
import { CreateUserUseCaseInterface } from '@/user/domain/use-cases/create-user/create-user-use-case-interface'
import { RouterInterface } from '@/_core/router-interface'

export class CreateUserRoute implements RouterInterface {
  public constructor(
    private readonly createUserUseCase: CreateUserUseCaseInterface,
  ) {}

  public async handler(app: FastifyInstance) {
    app
      .withTypeProvider<ZodTypeProvider>()
      .post('/api/v1/users', createUserSchema, async (request) => {
        const { name, email } = request.body

        return {
          name,
          email,
        }
      })
  }
}
