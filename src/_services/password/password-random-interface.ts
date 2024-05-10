export interface PasswordRandomInterface {
  random(length: number): Promise<string>
}
