import * as argon2 from 'argon2'

import { HashServiceInterface } from './hash-service-interface'
import { ErrorHandle } from '@/_core/errors/error-handle'
import { HashErrorEnum } from './hash-error-enum'

export class HashService implements HashServiceInterface {
  private readonly hashOptions

  public constructor(hashSalt: string, timeCost: number = 3) {
    if (timeCost < 2) {
      throw new ErrorHandle(HashErrorEnum.ERROR_TIME_COST)
    }
    if (hashSalt.length < 8) {
      throw new ErrorHandle(HashErrorEnum.ERROR_SALT_INVALID)
    }

    this.hashOptions = {
      raw: false,
      type: argon2.argon2id,
      hashLength: 33,
      timeCost: timeCost,
      salt: Buffer.from(hashSalt, 'utf8'),
    }
  }

  public async hash(value: string): Promise<string> {
    try {
      const hashed = await argon2.hash(value, this.hashOptions)
      return hashed
    } catch (error) {
      throw new ErrorHandle(HashErrorEnum.ERROR_HASHING)
    }
  }

  public async verify(value: string, hash: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, value)
    } catch (error) {
      throw new ErrorHandle(HashErrorEnum.ERROR_COMPARING)
    }
  }
}
