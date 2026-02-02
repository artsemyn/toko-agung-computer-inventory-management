import { defineConfig, env } from 'prisma/config'
import 'dotenv/config'

export default defineConfig({
  schema: './prisma/schema.prisma',

  datasource: {
    url: env('DIRECT_DATABASE_URL'),
  },

  migrations: {
    path: './prisma/migrations',
    seed: 'node prisma/seed.js',
  },
})
