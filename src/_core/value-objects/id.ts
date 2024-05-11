import { v4 as uuidv4, validate } from 'uuid'

import { IdInterface } from './id-interface'
import { ErrorHandle } from '../errors/error-handle'

export class Id implements IdInterface {
  private constructor(private readonly value: string) {}

  public getValue(): string {
    return this.value
  }

  public static validate(value: string): boolean {
    return validate(value)
  }

  public static create(id: string | null = null): Id {
    if (id === null) {
      return new Id(uuidv4())
    }

    if (!Id.validate(id)) {
      throw new ErrorHandle('Invalid Id')
    }

    return new Id(id)
  }
}
