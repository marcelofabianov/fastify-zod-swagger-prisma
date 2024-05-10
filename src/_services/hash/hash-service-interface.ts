export interface HashServiceInterface {
  hash(password: string): Promise<string>
  verify(value: string, hash: string): Promise<boolean>
}
