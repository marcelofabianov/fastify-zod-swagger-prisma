import { describe, expect, test, vi } from 'vitest'
import { UserRepository } from '../user-repository'

describe('User / Infra / Repositories / User Repository', () => {
  const db = {
    get: () => {
      return {
        user: {
          create: vi.fn(),
        },
      }
    },
  }

  const dto = {
    id: {
      getValue: vi.fn(() => '569c1caf-a71b-44e3-843e-8f10e9463afe'),
    },
    email: {
      getValue: vi.fn(() => 'marcelo@email.com'),
    },
    name: 'Marcelo',
  }

  const password = {
    getHash: vi.fn(),
  }

  test('Deve criar um registro de usuário com dto e password', () => {
    const userRepository = new UserRepository(db)

    userRepository.create(dto, password)

    expect(dto.id.getValue).toHaveBeenCalledTimes(1)
    expect(dto.email.getValue).toHaveBeenCalledTimes(1)
    expect(password.getHash).toHaveBeenCalledTimes(1)

    //expect(db.get().user.create).toHaveBeenCalledTimes(1)
  })
})
