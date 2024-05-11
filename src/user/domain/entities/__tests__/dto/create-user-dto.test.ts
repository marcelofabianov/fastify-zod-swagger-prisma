import { test, describe, expect } from 'vitest'
import { CreateUserDto } from '../../dto/create-user-dto'
import { randomUUID } from 'crypto'
import { Id } from '@/_core/value-objects/id'
import { Email } from '@/_core/value-objects/email'

describe('User / Domain / Entities / Dto / CreateUserDto', () => {
  test('Deve criar uma nova instancia de CreateUserDto com dados validos', () => {
    const id = 'b12be11e-e6e9-424d-83f4-9d17902073b1'
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

    expect(dto.id.getValue()).toBe(Id.create(id).getValue())
    expect(dto.name).toBe(name)
    expect(dto.email.getValue()).toBe(Email.create(email).getValue())
    expect(dto.createdAt).toBe(createdAt)
    expect(dto.updatedAt).toBe(updatedAt)
    expect(dto.deletedAt).toBe(deletedAt)
    expect(dto.archivedAt).toBe(archivedAt)
  })
})
