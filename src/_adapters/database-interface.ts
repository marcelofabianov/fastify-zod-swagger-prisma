import { PrismaClient } from '@prisma/client'

export interface DatabaseClientInterface {
  get(): PrismaClient
}
