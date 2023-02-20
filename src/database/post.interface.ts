import { BasePost, Post } from "../models/post";

export default interface PostService {
    insertPost(post: BasePost): Promise<Post>
    getPostById(postId: number): Post
    getPostsByUserId(userId: number): Promise<Post[]> 
}