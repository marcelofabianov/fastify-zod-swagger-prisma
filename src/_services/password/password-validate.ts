import { PasswordValidateErrorEnum } from './password-validate-error-enum'
import { PasswordValidateInterface } from './password-validate-interface'

export class PasswordValidate implements PasswordValidateInterface {
  private messages: string[] = []

  public validate(password: string): boolean {
    const isValid =
      this.hasLowerCase(password) &&
      this.hasUpperCase(password) &&
      this.hasNumber(password) &&
      this.hasSpecialCharacter(password) &&
      this.hasMinimumLength(password)

    return isValid
  }

  public getMessages(): string[] {
    return this.messages
  }

  private hasLowerCase(password: string): boolean {
    if (!/[a-z]/.test(password)) {
      this.messages.push(PasswordValidateErrorEnum.ERROR_LOWERCASE_REQUIRED)
      return false
    }
    return true
  }

  private hasUpperCase(password: string): boolean {
    if (!/[A-Z]/.test(password)) {
      this.messages.push(PasswordValidateErrorEnum.ERROR_UPPERCASE_REQUIRED)
      return false
    }
    return true
  }

  private hasNumber(password: string): boolean {
    if (!/\d/.test(password)) {
      this.messages.push(PasswordValidateErrorEnum.ERROR_NUMBER_REQUIRED)
      return false
    }
    return true
  }

  private hasSpecialCharacter(password: string): boolean {
    if (!/[^a-zA-Z0-9]/.test(password)) {
      this.messages.push(
        PasswordValidateErrorEnum.ERROR_SPECIAL_CHARACTER_REQUIRED,
      )
      return false
    }
    return true
  }

  private hasMinimumLength(password: string): boolean {
    if (password.length < 8) {
      this.messages.push(
        PasswordValidateErrorEnum.ERROR_MINIMUM_LENGTH_REQUIRED,
      )
      return false
    }
    return true
  }
}
