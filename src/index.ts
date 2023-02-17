import * as dotenv from 'dotenv'
import * as env from 'env-var'
import newPool from './database/postgres/pool'
import UserRepository from './database/postgres/user'
import UsersRouter from './routes/users.router'
import Server from './server/server'
dotenv.config()

const PORT: number = env.get('PORT').default('5000').asPortNumber()
const POSTGRES_HOST: string = env.get('POSTGRES_HOST').required().asString()
const POSTGRES_USERNAME: string = env.get('POSTGRES_USERNAME').required().asString()
const POSTGRES_PASSWORD: string = env.get('POSTGRES_PASSWORD').required().asString()
const POSTGRES_DATABASE: string = env.get('POSTGRES_DATABASE').required().asString()


const pool = newPool(POSTGRES_HOST, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DATABASE)
const userRepository = new UserRepository(pool)

const usersRouter = new UsersRouter(userRepository)


const server = new Server(PORT, usersRouter)
server.start()