import { test, describe, beforeAll, vi, expect } from 'vitest'
import { CreateUserUseCase } from '../create-user-use-case'
import { PasswordInterface } from '@/user/domain/value-objects/password-interface'

describe('User / Domain / Use Cases / Create User', () => {
  let createUserUseCase: CreateUserUseCase

  const createUserRequestMock = {
    name: 'Marcelo',
    email: 'marcelo@email.com',
  }

  const passwordMock = {} as PasswordInterface

  const userRepositoryMock = {
    create: vi.fn(),
  }

  beforeAll(() => {
    createUserUseCase = new CreateUserUseCase(userRepositoryMock)
  })

  test('Deve criar um usuário com o request recebido e retornar response', async () => {
    const response = await createUserUseCase.execute(
      createUserRequestMock,
      passwordMock,
    )

    expect(response).toEqual({
      id: expect.any(String),
      name: createUserRequestMock.name,
      email: createUserRequestMock.email,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      archivedAt: null,
    })

    expect(userRepositoryMock.create).toHaveBeenCalledTimes(1)
  })

  test('Deve lançar um erro ao criar uma instância de CreateUserDto com dados invalidos', async () => {
    const createUserRequestMock = {
      name: '',
      email: '',
    }

    await expect(
      createUserUseCase.execute(createUserRequestMock, passwordMock),
    ).rejects.toThrow('Error to create user dto')
  })

  test('Deve lançar uma exception se ocorrer um erro ao criar um usuário', async () => {
    userRepositoryMock.create = vi.fn().mockRejectedValue(new Error('Error'))

    await expect(
      createUserUseCase.execute(createUserRequestMock, passwordMock),
    ).rejects.toThrow('Error to create user')
  })
})
