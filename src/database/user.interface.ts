import { BaseUser, User } from "../models/user";

export default interface UserService {
    insertUser(user: BaseUser): Promise<[number, unknown]>
    findUserByUsername(username: string): Promise<User>
    findUserById(id: number): Promise<User>
}