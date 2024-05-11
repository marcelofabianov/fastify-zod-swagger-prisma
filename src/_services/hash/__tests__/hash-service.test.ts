import { beforeEach, describe, expect, test } from 'vitest'

import { HashService } from '../hash-service'
import { HashErrorEnum } from '../hash-error-enum'

describe('Services / HashService', () => {
  let hashService: HashService

  beforeEach(() => {
    const salt =
      '09a4e004d6f5b4770cb36105564e3f55d98a08956038ff9ca2bf629e9866dd56'

    const timeCost = 2

    hashService = new HashService(salt, timeCost)
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

  test('Deve lançar um erro ao tentar instanciar o serviço com um timeCost menor que 2', () => {
    const salt =
      '12a5ef86aabdd779a2223427541ff5ef9715938496953125f8dffc5ab66e79d9'
    const timeCost = 1

    expect(() => new HashService(salt, timeCost)).toThrowError(
      HashErrorEnum.ERROR_TIME_COST,
    )
  })

  test('Deve lançar um erro ao tentar instanciar o serviço com um salt menor que 8 caracteres', () => {
    const salt = 'invalid'
    const timeCost = 3

    expect(() => new HashService(salt, timeCost)).toThrowError(
      HashErrorEnum.ERROR_SALT_INVALID,
    )
  })
})
