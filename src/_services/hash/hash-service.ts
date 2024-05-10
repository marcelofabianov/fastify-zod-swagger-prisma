import * as argon2 from 'argon2'

import { env } from '@/_core/environment'
import { HashServiceInterface } from './hash-service-interface'
import { ErrorHandle } from '@/_core/errors/error-handle'
import { HashErrorEnum } from './hash-error-enum'

export class HashService implements HashServiceInterface {
  private readonly hashOptions = {
    raw: false,
    type: argon2.argon2id,
    hashLength: 33,
    timeCost: 3,
    salt: Buffer.from(env.PASSWORD_SALT),
  }

  public async hash(password: string): Promise<string> {
    try {
      const hashedPassword = await argon2.hash(password, this.hashOptions)
      return hashedPassword
    } catch (error) {
      throw new ErrorHandle(500, HashErrorEnum.ERROR_HASHING_PASSWORD)
    }
  }

  public async verify(value: string, hash: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, value)
    } catch (error) {
      throw new ErrorHandle(500, HashErrorEnum.ERROR_COMPARING_PASSWORD)
    }
  }
}
