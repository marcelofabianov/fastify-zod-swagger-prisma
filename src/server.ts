import { fastify } from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from './_core/environment'
import * as userRouter from './user/infra/http'
import { ContainerWrapperInterface } from './_core/container/container-wrapper-interface'
import { RouterInterface } from './_core/router-interface'

const app = fastify({
  logger: false,
}).withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Pluto',
      description: 'Pluto API',
      version: '0.0.1',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/api/docs',
})

const serverStart = async (container: ContainerWrapperInterface) => {
  app.get('/', async () => {
    return {}
  })

  app.register(container.get<RouterInterface>('CreateUserRoute').handler)
  app.register(container.get<RouterInterface>('GetUserRoute').handler)

  if (env.NODE_ENV !== 'test') {
    try {
      await app.listen({ port: env.PORT })
      console.log('Server is running on http://localhost:' + env.PORT)
    } catch (error) {
      app.log.error(error)
      process.exit(1)
    }
  }

  return app
}

export { app, serverStart }
