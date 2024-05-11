import { describe, expect, test } from 'vitest'
import { Id } from '../id'

describe('Core / Value Objects / ID', () => {
  test('Deve criar uma nova instancia de Id quando valor informado é um id válido', () => {
    const id = 'a2d1d1b7-3f3d-4b5c-8b6a-6b5c6d4e3f2d'

    const result = Id.create(id)

    expect(result.getValue()).toBe(id)
  })

  test('Deve criar uma nova instancia de Id quando valor informado é nulo gerando um valor id Valido', () => {
    const result = Id.create()

    expect(Id.validate(result.getValue())).toBe(true)
  })

  test('Deve lançar uma exceção quando tentar criar uma instancia de Id com um valor invalido', () => {
    const id = 'invalid'

    expect(() => Id.create(id)).toThrow('Invalid Id')
  })

  test('Deve retornar false quando chamar a validacao com um valor invalido', () => {
    const id = 'invalid'

    const result = Id.validate(id)

    expect(result).toBe(false)
  })

  test('Deve retornar true quando chamar a validacao com um valor valido', () => {
    const id = 'a2d1d1b7-3f3d-4b5c-8b6a-6b5c6d4e3f2d'

    const result = Id.validate(id)

    expect(result).toBe(true)
  })

  test('Deve retornar o valor do id quando chamar o metodo getValue', () => {
    const id = 'a2d1d1b7-3f3d-4b5c-8b6a-6b5c6d4e3f2d'

    const result = Id.create(id)

    expect(result.getValue()).toBe(id)
  })
})
