export interface BasePost {
    userId: number,
    title: string,
    body: string
}

export interface Post extends BasePost {
    id: number
}