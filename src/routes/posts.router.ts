import PostService from "../database/post.interface";
import express, { Request, Response, Router } from 'express'
import userAuth from "../middleware/authorization";
import UserService from "../database/user.interface";
import { User } from "../models/user";
import { BasePost, createPostValidationSchema, Post } from "../models/post";

export default class PostsRouter {
    router: Router

    constructor(private postRepository: PostService, private userRepository: UserService) { 
        this.createPost = this.createPost.bind(this)

        this.router = express.Router()
        this.router.use(userAuth)

        this.router.post('/', this.createPost)
    }

    private async createPost(req: Request, res: Response) {
        const { userId } = res.locals

        const request: BasePost = req.body

        let {error: validationError} = createPostValidationSchema.validate(request, {abortEarly: false})
        if (validationError) {
            return res.status(400).json(validationError.details)
        }

        const newPost: BasePost = { userId: userId, title: request.title, body: request.body }

        const createdPost: Post = await this.postRepository.insertPost(newPost)

        res.status(200).json(createdPost)
    }
}