// prisma.config.ts
import { config } from 'dotenv'
import path from 'path'

// config({ path: path.join(__dirname, '.env.local') })
config({ path: path.join(__dirname, '.env.deploy') })

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
   url: env('DIRECT_URL'),
  },
});
