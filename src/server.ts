import { fastify } from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { env } from './_core/env'
import {
  jsonSchemaTransform,
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { hello } from './http/routes/hello'

const app = fastify({
  logger: false,
}).withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Pluto',
      description: 'Pluto controle financeiro API',
      version: '0.0.1',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(hello)

const serverStart = async () => {
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
