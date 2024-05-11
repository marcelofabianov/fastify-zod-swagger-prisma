import { CreateUserDtoInterface } from './create-user-dto-interface'
import { IdInterface } from '@core/value-objects/id-interface'
import { Id } from '@core/value-objects/id'
import { ErrorHandle } from '@core/errors/error-handle'
import { EmailInterface } from '@core/value-objects/email-interface'
import { Email } from '@core/value-objects/email'

export class CreateUserDto implements CreateUserDtoInterface {
  public readonly id: IdInterface
  public readonly name: string
  public readonly email: EmailInterface
  public readonly createdAt: Date
  public readonly updatedAt: Date
  public readonly deletedAt: Date | null
  public readonly archivedAt: Date | null

  public constructor(
    name: string,
    email: string | EmailInterface,
    id: string | null | IdInterface = null,
    createdAt: Date | null = null,
    updatedAt: Date | null = null,
    deletedAt: Date | null = null,
    archivedAt: Date | null = null,
  ) {
    this.id = this.setId(id)
    this.name = name
    this.email = this.setEmail(email)
    this.createdAt = createdAt || new Date()
    this.updatedAt = updatedAt || new Date()
    this.deletedAt = deletedAt || null
    this.archivedAt = archivedAt || null
  }

  private setId(id: string | null | IdInterface): IdInterface {
    if (id instanceof Id) {
      return id
    }

    if (id === null) {
      return Id.create()
    }

    if (typeof id !== 'string') {
      throw new Error('Invalid Id')
    }

    try {
      id
      return Id.create(id)
    } catch (error) {
      throw new ErrorHandle('Invalid Id')
    }
  }

  private setEmail(email: string | EmailInterface): EmailInterface {
    if (email instanceof Email) {
      return email
    }

    if (typeof email !== 'string') {
      throw new ErrorHandle('Invalid Email')
    }

    try {
      return Email.create(email)
    } catch (error) {
      throw new ErrorHandle('Invalid Email')
    }
  }
}
