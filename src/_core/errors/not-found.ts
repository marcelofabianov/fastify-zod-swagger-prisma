export class NotFoundError extends Error {
  public readonly statusCode: number

  public constructor(message: string = 'Not Found') {
    super(message)
    this.name = 'NotFoundError'
    this.statusCode = 404
  }
}
