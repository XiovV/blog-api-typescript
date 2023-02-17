import Joi, { string } from "joi"

export interface BaseUser {
    username: string,
    email: string,
    password: string,
}

export interface User extends BaseUser {
    id: number,
    mfa_secret: string,
    role: number,
    recovery: string[],
    active: boolean,
}

export const baseUserValidationSchema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

export const loginUserValidationSchema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(8).required()
})