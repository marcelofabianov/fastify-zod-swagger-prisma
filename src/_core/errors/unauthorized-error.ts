export class UnauthorizedError extends Error {
  public readonly statusCode: number

  constructor(message: string = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
    this.statusCode = 401
  }
}
