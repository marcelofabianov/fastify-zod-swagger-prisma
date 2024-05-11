import { CreateUserDtoInterface } from './dto/create-user-dto-interface'
import { UserInterface } from './user-interface'

export class User implements UserInterface {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
    private readonly deletedAt: Date | null,
    private readonly archivedAt: Date | null,
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
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getEmail(): string {
    return this.email
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
}