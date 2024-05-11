import { describe, test, expect, expectTypeOf } from 'vitest'
import { ServiceContainer } from '../service-container'
import { ContainerWrapper } from '@/_core/container/container-wrapper'
import { HashServiceInterface } from '../hash/hash-service-interface'
import { PasswordServiceInterface } from '../password/password-service-interface'

describe('Services / ServiceContainer', () => {
  test('Deve registrar os serviços no container', () => {
    const salt = 'edd40b537a141ea62ce1808b0019606b2b6c9c'
    const serviceContainer = new ServiceContainer(new ContainerWrapper(), salt)

    serviceContainer.register()

    const hashService =
      serviceContainer.get<HashServiceInterface>('HashService')
    const passwordService =
      serviceContainer.get<PasswordServiceInterface>('PasswordService')

    expect(hashService).toBeDefined()
    expect(passwordService).toBeDefined()
    expectTypeOf(hashService).toMatchTypeOf<HashServiceInterface>()
    expectTypeOf(passwordService).toMatchTypeOf<PasswordServiceInterface>()
  })
})
