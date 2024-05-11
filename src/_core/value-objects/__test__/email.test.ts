import { describe, expect, test } from 'vitest'
import { Email } from '../email'

describe('Core / Value Objects / Email', () => {
  test('Deve criar uma nova instancia de Email quando valor informado é um email válido', () => {
    const email = 'marcelo@email.com'

    const result = Email.create(email)

    expect(result.getValue()).toBe(email)
    expect(Email.validate(email)).toBe(true)
  })

  test('Deve lançar uma exceção quando tentar criar uma instancia de Email com um valor invalido', () => {
    const email = 'invalid'

    expect(() => Email.create(email)).toThrow('Invalid Email')
  })

  test('Deve retornar false quando chamar a validacao com um valor invalido de email', () => {
    const email = 'invalid'

    const result = Email.validate(email)

    expect(result).toBe(false)
  })

  test('Deve retornar true quando chamar a validacao com um valor valido de email', () => {
    const email = 'marcelo@email.com'

    const result = Email.validate(email)

    expect(result).toBe(true)
  })

  test('Deve retornar o valor do email quando chamar o metodo getValue', () => {
    const email = 'marcelo@email.com'

    const result = Email.create(email)

    expect(result.getValue()).toBe(email)
  })
})
