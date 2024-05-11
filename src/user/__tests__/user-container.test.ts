import { describe, test, expect, expectTypeOf } from 'vitest'
import { DatabaseClientInterface } from '@/_adapters/database-interface'
import { ContainerWrapper } from '@/_core/container/container-wrapper'
import { UserContainer } from '../user-container'
import { UserRepositoryInterface } from '../infra/repositories/user-repository-interface'
import { CreateUserUseCaseInterface } from '../domain/use-cases/create-user/create-user-use-case-interface'

describe('User / User Container', () => {
  test('Deve registrar os artefatos de user no container', () => {
    const db = {} as DatabaseClientInterface
    const containerWrapper = new ContainerWrapper()
    containerWrapper.add<DatabaseClientInterface>('db', db)

    const userContainer = new UserContainer(containerWrapper)

    userContainer.register()

    const userRepository =
      userContainer.get<UserRepositoryInterface>('UserRepository')

    const createUserUseCase =
      userContainer.get<CreateUserUseCaseInterface>('CreateUserUseCase')

    expect(userRepository).toBeDefined()
    expect(createUserUseCase).toBeDefined()

    expectTypeOf(userRepository).toMatchTypeOf<UserRepositoryInterface>()
    expectTypeOf(createUserUseCase).toMatchTypeOf<CreateUserUseCaseInterface>()
  })
})
