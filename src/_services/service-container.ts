import { ContainerInterface } from '@/_core/container/container-interface'
import { ContainerWrapperInterface } from '@/_core/container/container-wrapper-interface'
import { HashService } from './hash/hash-service'

export class ServiceContainer implements ContainerInterface {
  public constructor(private container: ContainerWrapperInterface) {}

  public register(): void {
    this.container.add('HashService', new HashService())
  }
}
