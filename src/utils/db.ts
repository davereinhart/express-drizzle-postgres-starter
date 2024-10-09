//import process from 'node:process'
import postgres from 'postgres'
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import 'dotenv/config'

export const db = drizzle(postgres(process.env.DATABASE_URL!))
