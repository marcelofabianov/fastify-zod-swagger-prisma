import { ErrorHandle } from '../errors/error-handle'
import { EmailInterface } from './email-interface'

export class Email implements EmailInterface {
  private constructor(private readonly value: string) {}

  public getValue(): string {
    return this.value
  }

  public static validate(value: string): boolean {
    const re = /\S+@\S+\.\S+/
    return re.test(value)
  }

  public static create(email: string): Email {
    if (!Email.validate(email)) {
      throw new ErrorHandle('Invalid Email')
    }

    return new Email(email)
  }
}
