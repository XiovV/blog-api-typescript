import { Pool } from "pg";
import { BaseUser, User } from "../../models/user";
import UserService from "../user.interface";

export default class UserRepository implements UserService {
    constructor(private pool: Pool) { }

    async insertUser(user: BaseUser): Promise<[number, unknown]> {
        try {
            const result = await this.pool.query(`INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING id`, [user.username, user.email, user.password])

            const id = result.rows[0].id
            return [id, null]
        } catch (error) {
            return [0, null]
        }
    }

    async findUserByUsername(username: string): Promise<User> {
            const result = await this.pool.query(`SELECT * FROM "user" WHERE username = $1`, [username])

            const user: User = result.rows[0]

            if (typeof user === 'undefined') {
                throw new Error('user could not be found')
            }

            return user 
    }

}