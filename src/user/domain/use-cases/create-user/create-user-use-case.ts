import { ErrorHandle } from '@/_core/errors/error-handle'
import { CreateUserDto } from '../../entities/dto/create-user-dto'
import { CreateUserDtoInterface } from '../../entities/dto/create-user-dto-interface'
import { UserRepositoryInterfacePort } from './user-repository-interface-port'
import { CreateUserRequestInterface } from './create-user-request-interface'
import { CreateUserResponseInterface } from './create-user-response.interface'
import { CreateUserUseCaseInterface } from './create-user-use-case-interface'
import { PasswordInterface } from '../../value-objects/password-interface'

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  public constructor(
    private readonly userRepository: UserRepositoryInterfacePort,
  ) {}

  public async execute(
    request: CreateUserRequestInterface,
    password: PasswordInterface,
  ): Promise<CreateUserResponseInterface> {
    const dto = this.createUser(request)

    try {
      await this.userRepository.create(dto, password)

      return {
        id: dto.id.getValue(),
        name: dto.name,
        email: dto.email.getValue(),
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
        archivedAt: dto.archivedAt,
      }
    } catch (error) {
      throw new ErrorHandle('Error to create user')
    }
  }

  private createUser(
    request: CreateUserRequestInterface,
  ): CreateUserDtoInterface {
    try {
      const dto = new CreateUserDto(request.name, request.email)

      return dto
    } catch (error) {
      throw new ErrorHandle('Error to create user dto')
    }
  }
}
