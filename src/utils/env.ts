import process from 'node:process'
import { ZodError, z } from 'zod'
import 'dotenv/config'

const configSchema = z.object({
  PORT: z
    .string()
    .regex(/^\d{4,5}$/)
    .optional()
    .default('3000'),
  API_BASE_URL: z.string().url().default('/api'),
  DATABASE_URL: z
    .string()
    .url()
    .refine(
      url => url.startsWith('postgres://') || url.startsWith('postgresql://'),
      'DB_URL must be a valid postgresql url',
    ),
  SES_ENABLED: z.string(),
  FROM_NAME: z.string().default('Verify'),
  FROM_EMAIL: z.string().email(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AUTH_JWT_ACCESS_TOKEN_SECRET: z.string(),
  AUTH_JWT_REFRESH_TOKEN_SECRET: z.string(),
  AUTH_JWT_ACCESS_TOKEN_EXPIRES_IN: z.string(),
  AUTH_JWT_REFRESH_TOKEN_EXPIRES_IN: z.string(),
})

try {
  configSchema.parse(process.env)
}
catch (error) {
  if (error instanceof ZodError)
    console.error(error.errors)

  process.exit(1)
}

export type Env = z.infer<typeof configSchema>
