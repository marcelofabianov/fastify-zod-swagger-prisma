import { PrismaClient } from '@prisma/client'
import { DatabaseClient } from './_adapters/database-client'
import { ContainerWrapper } from './_core/container/container-wrapper'
import { ServiceContainer } from './_services/service-container'
import { env } from './_core/environment'
import { UserContainer } from './user/user-container'

const db = new DatabaseClient(new PrismaClient())
const containerWrapper = new ContainerWrapper()

containerWrapper.add('db', db)

const salt = env.HASH_SALT
const serviceContainer = new ServiceContainer(containerWrapper, salt)

serviceContainer.register()

const userContainer = new UserContainer(containerWrapper)

userContainer.register()

export { containerWrapper }
