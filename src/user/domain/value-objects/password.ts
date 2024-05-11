import { ErrorHandle } from '@core/errors/error-handle'
import { PasswordServiceInterface } from '@/_services/password/password-service-interface'
import { PasswordInterface } from './password-interface'

export class Password implements PasswordInterface {
  private constructor(
    private readonly value: string,
    private readonly service: PasswordServiceInterface,
  ) {}

  public getValue(): string {
    return this.value
  }

  public async getHash(): Promise<string> {
    return await this.service.hash(this.value)
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

    return new Password(password, service)
  }
}
