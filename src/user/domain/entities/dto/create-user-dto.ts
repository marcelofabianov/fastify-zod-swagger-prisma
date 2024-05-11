import { randomUUID } from 'crypto'
import { CreateUserDtoInterface } from './create-user-dto-interface'

export class CreateUserDto implements CreateUserDtoInterface {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly createdAt: Date
  public readonly updatedAt: Date
  public readonly deletedAt: Date | null
  public readonly archivedAt: Date | null

  public constructor(
    name: string,
    email: string,
    id: string | null = null,
    createdAt: Date | null = null,
    updatedAt: Date | null = null,
    deletedAt: Date | null = null,
    archivedAt: Date | null = null,
  ) {
    this.id = id || randomUUID()
    this.name = name
    this.email = email
    this.createdAt = createdAt || new Date()
    this.updatedAt = updatedAt || new Date()
    this.deletedAt = deletedAt || null
    this.archivedAt = archivedAt || null
  }
}
