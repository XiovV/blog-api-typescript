import { Pool } from "pg"
import { BasePost, Post } from "../../models/post"
import PostService from "../post.interface"

export default class PostRepository implements PostService {
    constructor(private pool: Pool) { }

    async insertPost(post: BasePost): Promise<Post> {
        const result = await this.pool.query('INSERT INTO post (user_id, title, body) VALUES ($1, $2, $3) RETURNING *', [post.userId, post.title, post.body])

        const createdPost: Post = result.rows[0]
        return createdPost
    }

    getPostById(postId: number): Post {
        throw new Error("Method not implemented.")
    }


}