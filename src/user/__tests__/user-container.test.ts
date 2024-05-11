import { describe, test, expect, expectTypeOf } from 'vitest'
import { DatabaseClientInterface } from '@/_adapters/database-interface'
import { ContainerWrapper } from '@/_core/container/container-wrapper'
import { UserContainer } from '../user-container'
import { UserRepositoryInterface } from '../infra/repositories/user-repository-interface'
import { CreateUserUseCaseInterface } from '../domain/use-cases/create-user/create-user-use-case-interface'
import { RouterInterface } from '@/_core/router-interface'
import { HashService } from '@/_services/hash/hash-service'
import { PasswordService } from '@/_services/password/password-service'
import { PasswordRandom } from '@/_services/password/password-random'
import { PasswordValidate } from '@/_services/password/password-validate'

describe('User / User Container', () => {
  const salt = 'asdfjsklfjalsjdfalsjfsakfjlsdfasdfa'
  const hashService = new HashService(salt)
  const passwordValidate = new PasswordValidate()
  const passwordRandom = new PasswordRandom(passwordValidate)
  const passwordService = new PasswordService(
    hashService,
    passwordRandom,
    passwordValidate,
  )

  test('Deve registrar os artefatos de user no container', () => {
    const containerWrapper = new ContainerWrapper()
    containerWrapper.add<PasswordService>('PasswordService', passwordService)

    const db = {} as DatabaseClientInterface
    containerWrapper.add<DatabaseClientInterface>('db', db)

    const userContainer = new UserContainer(containerWrapper)

    userContainer.register()

    const userRepository =
      userContainer.get<UserRepositoryInterface>('UserRepository')

    const createUserUseCase =
      userContainer.get<CreateUserUseCaseInterface>('CreateUserUseCase')

    const getUserRoute = userContainer.get<RouterInterface>('GetUserRoute')
    const createUserRoute =
      userContainer.get<RouterInterface>('CreateUserRoute')

    expect(userRepository).toBeDefined()
    expect(createUserUseCase).toBeDefined()
    expect(getUserRoute).toBeDefined()
    expect(createUserRoute).toBeDefined()

    expectTypeOf(userRepository).toMatchTypeOf<UserRepositoryInterface>()
    expectTypeOf(createUserUseCase).toMatchTypeOf<CreateUserUseCaseInterface>()
    expectTypeOf(getUserRoute).toMatchTypeOf<RouterInterface>()
    expectTypeOf(createUserRoute).toMatchTypeOf<RouterInterface>()
  })

  test('Deve lançar erro se tentar acessar um artefato não registrado', () => {
    const db = {} as DatabaseClientInterface
    const containerWrapper = new ContainerWrapper()
    containerWrapper.add<DatabaseClientInterface>('db', db)
    containerWrapper.add<PasswordService>('PasswordService', passwordService)

    const userContainer = new UserContainer(containerWrapper)

    userContainer.register()

    expect(() => {
      userContainer.get<unknown>('InvalidRepository')
    }).toThrowError('Key InvalidRepository does not exist in container')
  })

  test('Deve lançar erro se tentar registrar um artefato já registrado', () => {
    const db = {} as DatabaseClientInterface
    const containerWrapper = new ContainerWrapper()
    containerWrapper.add<DatabaseClientInterface>('db', db)
    containerWrapper.add<PasswordService>('PasswordService', passwordService)

    const userContainer = new UserContainer(containerWrapper)

    userContainer.register()

    expect(() => {
      userContainer.register()
    }).toThrowError('Key UserRepository already exists in container')
  })

  test('Deve lançar erro se tentar criar um UserContainer sem a conexao com banco no container wrapper', () => {
    const containerWrapper = new ContainerWrapper()
    containerWrapper.add<PasswordService>('PasswordService', passwordService)

    expect(() => {
      new UserContainer(containerWrapper)
    }).toThrowError('Database client not found in container')
  })

  test('Deve lançar erro se tentar criar um UserContainer sem o PasswordService no container wrapper', () => {
    const db = {} as DatabaseClientInterface
    const containerWrapper = new ContainerWrapper()
    containerWrapper.add<DatabaseClientInterface>('db', db)

    expect(() => {
      new UserContainer(containerWrapper)
    }).toThrowError('Password service not found in container')
  })
})
