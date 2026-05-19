import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false,},
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});

const db = new Kysely({
    dialect: new PostgresDialect({
        pool,
    }),
});

export default db;