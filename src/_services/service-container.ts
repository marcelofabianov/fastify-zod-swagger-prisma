import { env } from '@core/environment'
import { PasswordValidate } from './password/password-validate'
import { ContainerInterface } from '@core/container/container-interface'
import { ContainerWrapperInterface } from '@core/container/container-wrapper-interface'
import { HashService } from './hash/hash-service'
import { PasswordRandom } from './password/password-random'
import { PasswordService } from './password/password-service'
import { PasswordServiceInterface } from './password/password-service-interface'
import { HashServiceInterface } from './hash/hash-service-interface'

export class ServiceContainer implements ContainerInterface {
  public constructor(
    private container: ContainerWrapperInterface,
    private salt: string,
  ) {}

  public register(): void {
    const hashService = new HashService(this.salt)
    const passwordValidate = new PasswordValidate()
    const passwordRandom = new PasswordRandom(passwordValidate)

    const passwordService = new PasswordService(
      hashService,
      passwordRandom,
      passwordValidate,
    )

    this.container.add<HashServiceInterface>('HashService', hashService)
    this.container.add<PasswordServiceInterface>(
      'PasswordService',
      passwordService,
    )
  }

  public get<T>(key: string): T {
    return this.container.get<T>(key)
  }
}
