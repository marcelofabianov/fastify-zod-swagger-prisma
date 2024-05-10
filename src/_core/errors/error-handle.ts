export class ErrorHandle extends Error {
  public readonly statusCode: number

  public constructor(message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
