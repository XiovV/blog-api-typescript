export interface BaseUser {
    username: string,
    email: string,
    password: string,
    active: boolean,
}

export interface User extends BaseUser {
    id: number
}