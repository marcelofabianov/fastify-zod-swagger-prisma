import { PasswordValidate } from './password/password-validate'
import { ContainerInterface } from '@/_core/container/container-interface'
import { ContainerWrapperInterface } from '@/_core/container/container-wrapper-interface'
import { env } from '@/_core/environment'
import { HashService } from './hash/hash-service'
import { PasswordRandom } from './password/password-random'
import { PasswordService } from './password/password-service'

export class ServiceContainer implements ContainerInterface {
  public constructor(private container: ContainerWrapperInterface) {}

  public register(): void {
    const hashSalt = env.HASH_SALT
    const hashService = new HashService(hashSalt)
    const passwordValidate = new PasswordValidate()
    const passwordRandom = new PasswordRandom(passwordValidate)

    const passwordService = new PasswordService(
      hashService,
      passwordRandom,
      passwordValidate,
    )

    this.container.add('hashService', hashService)
    this.container.add('passwordService', passwordService)
  }
}
