import { ErrorHandle } from '@core/errors/error-handle'
import { PasswordServiceInterface } from '@/_services/password/password-service-interface'

export class Password {
  private constructor(private readonly value: string) {}

  public getValue(): string {
    return this.value
  }

  public static validate(
    password: string,
    service: PasswordServiceInterface,
  ): boolean {
    return service.validate(password)
  }

  public static create(
    password: string,
    service: PasswordServiceInterface,
  ): Password {
    if (!this.validate(password, service)) {
      throw new ErrorHandle(service.getErrorMessages()[0])
    }

    return new Password(password)
  }
}
