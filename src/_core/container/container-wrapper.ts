import { ErrorHandle } from '../errors/error-handle'

import { ContainerWrapperInterface } from './container-wrapper-interface'

export class ContainerWrapper implements ContainerWrapperInterface {
  private readonly container: Record<string, unknown>

  public constructor() {
    this.container = {}
  }

  public add<T>(key: string, value: T): void {
    if (this.has(key)) {
      throw new ErrorHandle(`Key ${key} already exists in container`)
    }

    this.container[key] = value
  }

  public get<T>(key: string): T {
    if (!this.has(key)) {
      throw new ErrorHandle(`Key ${key} does not exist in container`)
    }

    return this.container[key] as T
  }

  public has(key: string): boolean {
    return this.container[key] !== undefined
  }
}
