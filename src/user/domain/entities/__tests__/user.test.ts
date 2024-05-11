import { describe, test, expect } from 'vitest'
import { CreateUserDto } from '../dto/create-user-dto'
import { User } from '../user'

describe('User / Domain / Entities / User', () => {
  const dto = new CreateUserDto('Marcelo', 'marcelo@email.com')

  test('Deve criar uma nova instancia de User com dados validos', () => {
    const user = User.create(dto)

    expect(user.getId()).toBe(dto.id.getValue())
    expect(user.getName()).toBe(dto.name)
    expect(user.getEmail()).toBe(dto.email.getValue())
    expect(user.getCreatedAt()).toBe(dto.createdAt)
    expect(user.getUpdatedAt()).toBe(dto.updatedAt)
    expect(user.getDeletedAt()).toBe(dto.deletedAt)
    expect(user.getArchivedAt()).toBe(dto.archivedAt)
  })

  test('Deve retornar false quando verificado se usuário esta deletado e nao estiver', () => {
    const user = User.create(dto)

    expect(user.isDeleted()).toBe(false)
  })

  test('Deve retornar true quando verificado se usuário esta deletado e estiver', () => {
    const user = User.create(dto)

    user.delete()

    expect(user.isDeleted()).toBe(true)
  })

  test('Deve retornar false quando verificado se usuário esta arquivado e nao estiver', () => {
    const user = User.create(dto)

    expect(user.isArchived()).toBe(false)
  })

  test('Deve retornar true quando verificado se usuário esta arquivado e estiver', () => {
    const user = User.create(dto)

    user.archive()

    expect(user.isArchived()).toBe(true)
  })

  test('Deve deletar um usuário', () => {
    const user = User.create(dto)

    user.delete()

    expect(user.getDeletedAt()).not.toBeNull()
  })

  test('Deve arquivar um usuário', () => {
    const user = User.create(dto)

    user.archive()

    expect(user.getArchivedAt()).not.toBeNull()
  })

  test('Deve restaurar um usuário', () => {
    const user = User.create(dto)

    user.delete()
    user.restore()

    expect(user.getDeletedAt()).toBeNull()
  })

  test('Deve ativar um usuário', () => {
    const user = User.create(dto)

    user.archive()
    user.activate()

    expect(user.getArchivedAt()).toBeNull()
  })
})
