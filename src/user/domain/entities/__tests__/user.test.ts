import { describe, test, expect } from 'vitest'
import { CreateUserDto } from '../dto/create-user-dto'
import { User } from '../user'

describe('User / Domain / Entities / User', () => {
  test('Deve criar uma nova instancia de User com dados validos', () => {
    const dto = new CreateUserDto('Marcelo', 'marcelo@email.com', '$54ga$6ga@')

    const user = User.create(dto)

    expect(user.getId()).toBe(dto.id)
    expect(user.getName()).toBe(dto.name)
    expect(user.getEmail()).toBe(dto.email)
    expect(user.getCreatedAt()).toBe(dto.createdAt)
    expect(user.getUpdatedAt()).toBe(dto.updatedAt)
    expect(user.getDeletedAt()).toBe(dto.deletedAt)
    expect(user.getArchivedAt()).toBe(dto.archivedAt)
  })
})
