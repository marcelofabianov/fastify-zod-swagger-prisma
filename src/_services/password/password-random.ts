import { PasswordRandomInterface } from './password-random-interface'
import { PasswordValidateInterface } from './password-validate-interface'

export class PasswordRandom implements PasswordRandomInterface {
  public constructor(
    private readonly passwordValidate: PasswordValidateInterface,
  ) {}

  public async random(length: number = 8): Promise<string> {
    const defineLength = length >= 8 ? length : 8

    const chars = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numeric: '0123456789',
      special: '!@#$%^&*_',
    }

    const allChars =
      chars.lowercase + chars.uppercase + chars.numeric + chars.special

    let password = Math.random().toString(36).slice(2, 5) + 'aA1!'
    const countChars = defineLength - password.length

    for (let i = 0; i < countChars; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length)
      password += allChars[randomIndex]
    }

    if (!this.passwordValidate.validate(password)) {
      return this.random(defineLength)
    }

    return password
  }
}
