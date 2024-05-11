import { z } from 'zod'
import { ErrorHandle } from './errors/error-handle'

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  HASH_SALT: z.string(),
  LOG_QUERY: z.coerce.boolean().default(false),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  throw new ErrorHandle('Environment variables are not set correctly.')
}

export const env = _env.data
