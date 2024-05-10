import { ContainerInterface } from '@/_core/container/container-interface'
import { ContainerWrapperInterface } from '@/_core/container/container-wrapper-interface'
import { HashService } from './hash/hash-service'
import { env } from '@/_core/environment'

export class ServiceContainer implements ContainerInterface {
  public constructor(private container: ContainerWrapperInterface) {}

  public register(): void {
    const hash = new HashService(env.HASH_SALT)

    this.container.add('HashService', hash)
  }
}
