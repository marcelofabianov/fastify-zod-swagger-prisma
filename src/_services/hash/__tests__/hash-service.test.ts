import { beforeEach, describe, expect, test } from 'vitest'

import { HashService } from '../hash-service'
import { HashErrorEnum } from '../hash-error-enum'

describe('HashService', () => {
  let hashService: HashService

  beforeEach(() => {
    const salt =
      'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855'
    hashService = new HashService(salt)
  })

  test('Deve retornar um hash gerado a partir do valor informado', async () => {
    const hashedValue = await hashService.hash('value')

    expect(hashedValue).toEqual(expect.any(String))
    expect(hashedValue).not.toEqual('value')
  })

  test('Deve retornar true ao comparar o valor com o hash', async () => {
    const value = 'value'
    const hashed = await hashService.hash(value)

    const isMatch = await hashService.verify(value, hashed)

    expect(isMatch).toBeTruthy()
  })

  test('Deve retornar false ao comparar o valor com um hash diferente', async () => {
    const value = 'value'
    const hashed = await hashService.hash(value)

    const isMatch = await hashService.verify('different value', hashed)

    expect(isMatch).toBeFalsy()
  })

  test('Deve lançar um excetion quando o salt esta invalido ao tentar gerar o hash', async () => {
    const salt = 'invalid'
    const hashServiceInvalid = new HashService(salt)

    expect(() => hashServiceInvalid.hash('value')).rejects.toThrow(
      HashErrorEnum.ERROR_HASHING,
    )
  })

  test('Deve lançar um exception quando o salt esta invalido ao tentar fazer comparacao', async () => {
    const salt = 'invalid'
    const hashServiceInvalid = new HashService(salt)

    expect(() => hashServiceInvalid.verify('value', 'hash')).rejects.toThrow(
      HashErrorEnum.ERROR_COMPARING,
    )
  })
})
