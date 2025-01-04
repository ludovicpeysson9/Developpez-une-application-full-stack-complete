export interface Article {
    id: number;
    title: string;
    content: string;
    authorId: number;
    themeId: number;
    themeTitle: string;
    date: string;
    articleAuthor: string;
}

export interface ArticleInput {
    title: string;
    content: string;
    authorId: number;
    themeId: number;
}