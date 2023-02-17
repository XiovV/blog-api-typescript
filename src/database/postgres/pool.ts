import { Pool } from "pg";

export default function newPool(host: any, user: any, password: any, database: any): Pool {
    return new Pool({
        host: host,
        user: user,
        password: password,
        database: database, 
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    })
}