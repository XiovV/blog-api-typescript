import { Pool } from "pg";
import { BaseUser, User } from "../../models/user";
import UserService from "../user.interface";

export default class UserRepository implements UserService {
    constructor(private pool: Pool) {} 

    insertUser(user: BaseUser): User {
        throw new Error("Method not implemented.");
    }
    
}