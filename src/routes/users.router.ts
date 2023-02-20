import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import express, { Request, Response, Router } from 'express'
import UserService from "../database/user.interface";
import { BaseUser, baseUserValidationSchema, loginUserValidationSchema, User } from '../models/user';


export default class UsersRouter {
    router: Router

    constructor(private database: UserService) {
        this.registerUser = this.registerUser.bind(this)
        this.loginUser = this.loginUser.bind(this)

        this.router = express.Router()

        this.router.post('/register', this.registerUser)
        this.router.post('/login', this.loginUser)
    }

    private async registerUser(req: Request, res: Response) {
        const request: BaseUser = req.body

        let { error: validationError } = baseUserValidationSchema.validate(request, { abortEarly: false })
        if (validationError) {
            return res.status(400).json(validationError.details)
        }

        let hash: string
        try {
            hash = await argon2.hash(request.password)
        } catch (error) {
            res.send(validationError)
            return
        }

        const newUser: BaseUser = { username: request.username, email: request.email, password: hash }

        let [userId, error] = await this.database.insertUser(newUser)
        if (error) {
            console.log(`couldn't insert user: ${error}`)
            res.status(500).json({ error: error })
            return
        }

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 900,
            userId: userId,
        }, 'testingsecret')

        res.status(201).json({ access_token: token })
    }

    private async loginUser(req: Request, res: Response) {
        const request: BaseUser = req.body

        let { error: validationError } = loginUserValidationSchema.validate(request, { abortEarly: false })
        if (validationError) {
            return res.status(400).json(validationError.details)
        }

        let user: User
        try {
            user = await this.database.findUserByUsername(request.username)
        } catch (error) {
            console.log(`got error: ${error}`)
            return res.status(400).json({ error })
        }

        if (!await argon2.verify(user.password, request.password)) {
            return res.status(400).json({ msg: "username or password is incorrect" })
        }

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 900,
            userId: user.id,
        }, 'testingsecret')

        res.status(200).json({ access_token: token })
    }
}

const isError = (toBeDetermined: any | Error): toBeDetermined is Error => {
    return !!(toBeDetermined as Error)
}