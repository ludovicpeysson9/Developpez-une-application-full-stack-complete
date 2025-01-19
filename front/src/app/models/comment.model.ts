export interface Comment {
    id: number;
    content: string;
    ownerId: number;
    articleId: number;
    ownerUsername: string;
    date?: string;
}