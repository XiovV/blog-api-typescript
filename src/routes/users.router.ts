import express, { Request, Response, Router } from 'express'
import UserService from "../database/user.interface";

export default class UsersRouter {
    router: Router

    constructor(private database: UserService) {
        this.registerUser = this.registerUser.bind(this)

        this.router = express.Router()

        this.router.post('/register', this.registerUser)
    }

    private async registerUser(req: Request, res: Response) {
        res.send('testing')
    }
}