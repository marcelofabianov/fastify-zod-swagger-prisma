import { describe, test, expect } from 'vitest'
import { ContainerWrapper } from '../container-wrapper'

describe('Core / Container / ContainerWrapper', () => {
  test('Deve adicionar um novo item ao container', () => {
    const key = 'db'
    const value = { host: 'localhost' }

    const container = new ContainerWrapper()
    container.add(key, value)

    expect(container.has(key)).toBe(true)
  })

  test('Deve retornar um item do container', () => {
    const key = 'db'
    const value = { host: 'localhost' }

    const container = new ContainerWrapper()
    container.add<{ host: string }>(key, value)

    expect(container.get<{ host: string }>(key)).toBe(value)
  })

  test('Deve retonar true quando verificado existencia de um item e confirmado', () => {
    const key = 'db'
    const value = { host: 'localhost' }

    const container = new ContainerWrapper()
    container.add(key, value)

    expect(container.has(key)).toBe(true)
  })

  test('Deve retonar false quando verificado existencia de um item e negado', () => {
    const key = 'db'

    const container = new ContainerWrapper()

    expect(container.has(key)).toBe(false)
  })

  test('Deve lançar um erro ao tentar adicionar um item com uma chave que já existe', () => {
    const key = 'db'
    const value = { host: 'localhost' }

    const container = new ContainerWrapper()
    container.add(key, value)

    expect(() => container.add(key, value)).toThrowError(
      'Key db already exists in container',
    )
  })

  test('Deve lançar um erro ao tentar retornar um item que não existe', () => {
    const key = 'db'

    const container = new ContainerWrapper()

    expect(() => container.get(key)).toThrowError(
      'Key db does not exist in container',
    )
  })
})
