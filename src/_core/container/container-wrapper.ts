import { ErrorHandle } from '../errors/error-handle'

import { ContainerWrapperInterface } from './container-wrapper-interface'

export class ContainerWrapper implements ContainerWrapperInterface {
  private readonly container: Record<string, unknown>

  constructor() {
    this.container = {}
  }

  add(key: string, value: unknown): void {
    if (this.has(key)) {
      throw new ErrorHandle(500, `Key ${key} already exists in container`)
    }

    this.container[key] = value
  }

  get(key: string): unknown {
    if (!this.has(key)) {
      throw new ErrorHandle(500, `Key ${key} does not exist in container`)
    }

    return this.container[key]
  }

  has(key: string): boolean {
    return this.container[key] !== undefined
  }
}
