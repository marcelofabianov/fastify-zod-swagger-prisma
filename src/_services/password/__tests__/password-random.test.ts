import { test, expect, describe, beforeAll } from 'vitest'
import { PasswordRandom } from '../password-random'
import { PasswordValidate } from '../password-validate'

describe('Services / PasswordRandom', () => {
  let passwordRandom: PasswordRandom

  beforeAll(() => {
    passwordRandom = new PasswordRandom(new PasswordValidate())
  })

  test('Deve retornar uma senha aleatória com mínimo de 8 caracteres', async () => {
    const password = await passwordRandom.random()

    expect(password.length).toBe(8)
  })

  test('Deve retornar uma senha com letras minúsculas, maiúsculas, números, simbolos e 10 caracteres', async () => {
    const password = await passwordRandom.random(10)

    const hasLowercase = /[a-z]/.test(password)
    const hasUppercase = /[A-Z]/.test(password)
    const hasNumeric = /[0-9]/.test(password)
    const hasSpecial = /[^a-zA-Z0-9]/.test(password)

    expect(hasLowercase).toBeTruthy()
    expect(hasUppercase).toBeTruthy()
    expect(hasNumeric).toBeTruthy()
    expect(hasSpecial).toBeTruthy()
    expect(password.length).toBe(10)
  })
})
