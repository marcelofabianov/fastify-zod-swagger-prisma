import { expect, test, describe, beforeAll, vi } from 'vitest'
import { PasswordService } from '../password-service'

describe('Services / PasswordService', () => {
  let passwordService: PasswordService

  const hashServiceMock = {
    hash: vi.fn().mockResolvedValue('hashed-password'),
    verify: vi.fn().mockResolvedValue(true),
  }

  const passwordRandomMock = {
    random: vi.fn().mockResolvedValue('random-password'),
  }

  const passwordValidateMock = {
    validate: vi.fn().mockReturnValue(true),
    getMessages: vi.fn().mockReturnValue([]),
  }

  beforeAll(() => {
    passwordService = new PasswordService(
      hashServiceMock,
      passwordRandomMock,
      passwordValidateMock,
    )
  })

  test('Deve chamar o metodo hash do HashService', async () => {
    const password = 'password'
    const hashedPassword = await passwordService.hash(password)

    expect(hashedPassword).toBe('hashed-password')
    expect(hashServiceMock.hash).toHaveBeenCalledWith(password)
    expect(hashServiceMock.hash).toHaveBeenCalledTimes(1)
  })

  test('Deve chamar o metodo verify do HashService', async () => {
    const password = 'password'
    const hashedPassword = 'hashed-password'
    const result = await passwordService.compare(password, hashedPassword)

    expect(result).toBe(true)
    expect(hashServiceMock.verify).toHaveBeenCalledWith(
      password,
      hashedPassword,
    )
    expect(hashServiceMock.verify).toHaveBeenCalledTimes(1)
  })

  test('Deve chamar o metodo random do PasswordRandom', async () => {
    const length = 10
    const randomPassword = await passwordService.random(length)

    expect(randomPassword).toBe('random-password')
    expect(passwordRandomMock.random).toHaveBeenCalledWith(length)
    expect(passwordRandomMock.random).toHaveBeenCalledTimes(1)
  })

  test('Deve chamar o metodo validate do PasswordValidate', async () => {
    const password = 'password'
    const result = passwordService.validate(password)

    expect(result).toBe(true)
    expect(passwordValidateMock.validate).toHaveBeenCalledWith(password)
    expect(passwordValidateMock.validate).toHaveBeenCalledTimes(1)
  })
})
