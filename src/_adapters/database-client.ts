import { PrismaClient } from '@prisma/client'
import { DatabaseClientInterface } from './database-interface'

export class DatabaseClient implements DatabaseClientInterface {
  public constructor(private db: PrismaClient) {}

  public get(): PrismaClient {
    return this.db
  }
}
