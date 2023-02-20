import Joi from "joi"

export interface BasePost {
    userId: number,
    title: string,
    body: string
}

export interface Post extends BasePost {
    id: number
}

export const createPostValidationSchema = Joi.object({
    title: Joi.string().min(5).max(300).required(),
    body: Joi.string().min(5).max(10000).required()
})