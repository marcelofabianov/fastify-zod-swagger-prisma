import { PasswordService } from '@/_services/password/password-service'
import { expect, test, describe, vi, beforeAll } from 'vitest'
import { Password } from '../password'

describe('User / Domain / Value Objects / Password', () => {
  let passwordService: PasswordService

  beforeAll(() => {
    passwordService = {
      validate: vi.fn(),
      getErrorMessages: vi.fn(),
    }
  })

  test('Deve criar instancia de Password quando o valor é válidado como true', () => {
    passwordService.validate.mockReturnValue(true)

    const password = Password.create('password', passwordService)

    expect(password.getValue()).toBe('password')
  })

  test('Deve lançar um erro quando o valor é inválido', () => {
    passwordService.validate.mockReturnValue(false)
    passwordService.getErrorMessages.mockReturnValue(['error-message'])

    expect(() => Password.create('password', passwordService)).toThrowError(
      'error-message',
    )
  })

  test('Deve retornar true quando o valor é válido', () => {
    passwordService.validate.mockReturnValue(true)

    const result = Password.validate('password', passwordService)

    expect(result).toBe(true)
  })

  test('Deve retornar false quando o valor é inválido', () => {
    passwordService.validate.mockReturnValue(false)

    const result = Password.validate('password', passwordService)

    expect(result).toBe(false)
  })
})
