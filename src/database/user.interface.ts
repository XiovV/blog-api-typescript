import { BaseUser, User } from "../models/user";

export default interface UserService {
    insertUser(user: BaseUser): User
}