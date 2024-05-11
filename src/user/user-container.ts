import { ContainerInterface } from '@/_core/container/container-interface'
import { ContainerWrapperInterface } from '@/_core/container/container-wrapper-interface'
import { UserRepository } from './infra/repositories/user-repository'
import { DatabaseClientInterface } from '@/_adapters/database-interface'
import { UserRepositoryInterface } from './infra/repositories/user-repository-interface'
import { CreateUserUseCase } from './domain/use-cases/create-user/create-user-use-case'
import { CreateUserUseCaseInterface } from './domain/use-cases/create-user/create-user-use-case-interface'

export class UserContainer implements ContainerInterface {
  public constructor(private container: ContainerWrapperInterface) {
    if (!this.container.has('db')) {
      throw new Error('Database client not found in container')
    }
  }

  public register(): void {
    this.registerRepositories()
    this.registerUseCases()
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
}
