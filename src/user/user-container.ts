import { ContainerInterface } from '@/_core/container/container-interface'
import { ContainerWrapperInterface } from '@/_core/container/container-wrapper-interface'
import { UserRepository } from './infra/repositories/user-repository'
import { DatabaseClientInterface } from '@/_adapters/database-interface'
import { UserRepositoryInterface } from './infra/repositories/user-repository-interface'
import { CreateUserUseCase } from './domain/use-cases/create-user/create-user-use-case'
import { CreateUserUseCaseInterface } from './domain/use-cases/create-user/create-user-use-case-interface'
import { CreateUserRoute, GetUserRoute } from './infra/http'
import { PasswordServiceInterface } from '@/_services/password/password-service-interface'

export class UserContainer implements ContainerInterface {
  public constructor(private container: ContainerWrapperInterface) {
    if (!this.container.has('db')) {
      throw new Error('Database client not found in container')
    }
    if (!this.container.has('PasswordService')) {
      throw new Error('Password service not found in container')
    }
  }

  public register(): void {
    this.registerRepositories()
    this.registerUseCases()
    this.registerRoutes()
  }

  public get<T>(key: string): T {
    return this.container.get<T>(key)
  }

  private registerRepositories(): void {
    const db = this.get<DatabaseClientInterface>('db')
    const userRepository = new UserRepository(db)

    this.container.add<UserRepositoryInterface>(
      'UserRepository',
      userRepository,
    )
  }

  private registerUseCases(): void {
    const userRepository = this.get<UserRepositoryInterface>('UserRepository')
    const createUserUseCase = new CreateUserUseCase(userRepository)

    this.container.add<CreateUserUseCaseInterface>(
      'CreateUserUseCase',
      createUserUseCase,
    )
  }

  private registerRoutes(): void {
    const createUserUseCase =
      this.get<CreateUserUseCaseInterface>('CreateUserUseCase')

    const passwordService =
      this.get<PasswordServiceInterface>('PasswordService')

    const createUserRoute = new CreateUserRoute(
      createUserUseCase,
      passwordService,
    )
    const getUserRoute = new GetUserRoute()

    this.container.add<CreateUserRoute>('CreateUserRoute', createUserRoute)
    this.container.add<GetUserRoute>('GetUserRoute', getUserRoute)
  }
}
