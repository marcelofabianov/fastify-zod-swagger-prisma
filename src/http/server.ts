import { fastify } from 'fastify'
import { env } from '../config/env.js'
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { hello } from './routes/hello.js'

const app = fastify({
  logger: false,
}).withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

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
