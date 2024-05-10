export class BadRequestError extends Error {
  public readonly statusCode: number

  constructor(message: string = 'Bad Request') {
    super(message)
    this.name = 'BadRequestError'
    this.statusCode = 400
  }
}
