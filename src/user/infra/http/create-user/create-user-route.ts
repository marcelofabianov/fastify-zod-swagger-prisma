import type { FastifyInstance, FastifyReply } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { createUserSchema } from './create-user-schema'
import { CreateUserUseCaseInterface } from '@/user/domain/use-cases/create-user/create-user-use-case-interface'
import { RouterInterface } from '@/_core/router-interface'
import { Password } from '@/user/domain/value-objects/password'
import { PasswordServiceInterface } from '@/_services/password/password-service-interface'

export class CreateUserRoute implements RouterInterface {
  public constructor(
    private readonly createUserUseCase: CreateUserUseCaseInterface,
    private readonly passwordService: PasswordServiceInterface,
  ) {}

  public async handler(app: FastifyInstance, reply: FastifyReply) {
    app
      .withTypeProvider<ZodTypeProvider>()
      .post('/api/v1/users', createUserSchema, async (request) => {
        const { name, email, password } = request.body

        const isValid = this.passwordService.validate(password)

        if (!isValid) {
          reply.status(422).send(this.passwordService.getErrorMessages())
        }

        const createUserRequest = {
          name,
          email,
        }

        try {
          const user = await this.createUserUseCase.execute(
            createUserRequest,
            Password.create(password, this.passwordService),
          )

          return user
        } catch (error) {
          reply.status(500).send({ message: error.message })
        }
      })
  }
}
