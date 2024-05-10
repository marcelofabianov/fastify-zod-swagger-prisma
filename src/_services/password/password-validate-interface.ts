export interface PasswordValidateInterface {
  validate(password: string): boolean
  getMessages(): string[]
}
