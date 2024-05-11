import { PasswordInterface } from '../../value-objects/password-interface'
import { CreateUserRequestInterface } from './create-user-request-interface'
import { CreateUserResponseInterface } from './create-user-response.interface'

export interface CreateUserUseCaseInterface {
  execute(
    request: CreateUserRequestInterface,
    password: PasswordInterface,
  ): Promise<CreateUserResponseInterface>
}
