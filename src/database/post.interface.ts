import { BasePost, Post } from "../models/post";

export default interface PostService {
    insertPost(post: BasePost): Post
}