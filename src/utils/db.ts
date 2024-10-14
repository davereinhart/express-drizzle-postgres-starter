import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
// import process from 'node:process'
import postgres from 'postgres'
import 'dotenv/config'

export const db = drizzle(postgres(process.env.DATABASE_URL!))
