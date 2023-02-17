import express, { Express } from 'express'
import PostsRouter from "../routes/posts.router";
import UsersRouter from "../routes/users.router";

export default class Server {
    private express: Express

    constructor(private port: number, private usersRouter: UsersRouter) {
        this.express = express()
    }

    start(): void {
        this.express.use(express.json())
        this.express.use('/api/v1/users', this.usersRouter.router)

        this.express.listen(this.port, () => console.log(`server listening on port ${this.port}...`))
    }
}