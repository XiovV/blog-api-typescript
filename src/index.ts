import * as dotenv from 'dotenv'
import newPool from './database/postgres/pool'
import UserRepository from './database/postgres/user'
import UsersRouter from './routes/users.router'
import Server from './server/server'
dotenv.config()

const pool = newPool(process.env.POSTGRES_HOST, process.env.POSTGRES_USERNAME, process.env.POSTGRES_PASSWORD, process.env.POSTGRES_DATABASE)
const userRepository = new UserRepository(pool)

const usersRouter = new UsersRouter(userRepository)


const server = new Server(parseInt(process.env.PORT || "5000"), usersRouter)
server.start()