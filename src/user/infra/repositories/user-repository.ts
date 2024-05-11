import { CreateUserDtoInterface } from '@/user/domain/entities/dto/create-user-dto-interface'
import { PasswordInterface } from '@/user/domain/value-objects/password-interface'
import { UserRepositoryInterface } from './user-repository-interface'
import { DatabaseClientInterface } from '@/_adapters/database-interface'

export class UserRepository implements UserRepositoryInterface {
  public constructor(private readonly db: DatabaseClientInterface) {}

  public async create(
    dto: CreateUserDtoInterface,
    password: PasswordInterface,
  ): Promise<void> {
    const data = {
      ...dto,
      id: dto.id.getValue(),
      email: dto.email.getValue(),
      password: await password.getHash(),
    }

    await this.db.get().user.create({ data })
  }
}
