import { IdInterface } from '@core/value-objects/id-interface'
import { CreateUserDtoInterface } from './dto/create-user-dto-interface'
import { UserInterface } from './user-interface'
import { EmailInterface } from '@core/value-objects/email-interface'

export class User implements UserInterface {
  private constructor(
    private readonly id: IdInterface,
    private readonly name: string,
    private readonly email: EmailInterface,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
    private deletedAt: Date | null,
    private archivedAt: Date | null,
  ) {}

  public static create(dto: CreateUserDtoInterface): UserInterface {
    return new User(
      dto.id,
      dto.name,
      dto.email,
      dto.createdAt,
      dto.updatedAt,
      dto.deletedAt,
      dto.archivedAt,
    )
  }

  public getId(): string {
    return this.id.getValue()
  }

  public getName(): string {
    return this.name
  }

  public getEmail(): string {
    return this.email.getValue()
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

  public getDeletedAt(): Date | null {
    return this.deletedAt
  }

  public getArchivedAt(): Date | null {
    return this.archivedAt
  }

  public isDeleted(): boolean {
    return this.deletedAt !== null
  }

  public isArchived(): boolean {
    return this.archivedAt !== null
  }

  public delete(): void {
    this.deletedAt = new Date()
  }

  public archive(): void {
    this.archivedAt = new Date()
  }

  public restore(): void {
    this.deletedAt = null
  }

  public activate(): void {
    this.archivedAt = null
  }
}
