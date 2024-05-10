import { HashServiceInterface } from '../hash/hash-service-interface'
import { PasswordServiceInterface } from './password-service-interface'
import { PasswordRandomInterface } from './password-random-interface'
import { PasswordValidateInterface } from './password-validate-interface'

export class PasswordService implements PasswordServiceInterface {
  public constructor(
    private readonly hashService: HashServiceInterface,
    private readonly passwordRandom: PasswordRandomInterface,
    private readonly PasswordValidate: PasswordValidateInterface,
  ) {}

  public async hash(password: string): Promise<string> {
    return this.hashService.hash(password)
  }

  public async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return this.hashService.verify(password, hashedPassword)
  }

  public async random(length: number = 8): Promise<string> {
    return this.passwordRandom.random(length)
  }

  public validate(password: string): boolean {
    return this.PasswordValidate.validate(password)
  }
}
