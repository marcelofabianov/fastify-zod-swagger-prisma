import { CreateUserDtoInterface } from '../../entities/dto/create-user-dto-interface'
import { PasswordInterface } from '../../value-objects/password-interface'

export interface UserRepositoryInterfacePort {
  create(
    dto: CreateUserDtoInterface,
    password: PasswordInterface,
  ): Promise<void>
}
