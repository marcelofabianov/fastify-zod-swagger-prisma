import { test, describe, expect } from 'vitest'
import { CreateUserDto } from '../../dto/create-user-dto'
import { randomUUID } from 'crypto'

describe('User / Domain / Entities / Dto / CreateUserDto', () => {
  test('Deve criar uma nova instancia de CreateUserDto com dados validos', () => {
    const id = randomUUID()
    const name = 'Marcelo'
    const email = 'marcelo@email.com'
    const createdAt = new Date()
    const updatedAt = new Date()
    const deletedAt = new Date()
    const archivedAt = new Date()

    const dto = new CreateUserDto(
      name,
      email,
      id,
      createdAt,
      updatedAt,
      deletedAt,
      archivedAt,
    )

    expect(dto.id).toBe(id)
    expect(dto.name).toBe(name)
    expect(dto.email).toBe(email)
    expect(dto.createdAt).toBe(createdAt)
    expect(dto.updatedAt).toBe(updatedAt)
    expect(dto.deletedAt).toBe(deletedAt)
    expect(dto.archivedAt).toBe(archivedAt)
  })
})
