export interface PasswordServiceInterface {
  hash(password: string): Promise<string>
  compare(password: string, hashedPassword: string): Promise<boolean>
  random(length: number): Promise<string>
  validate(password: string): boolean
  getErrorMessages(): string[] | []
}
