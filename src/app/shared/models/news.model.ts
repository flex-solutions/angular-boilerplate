import { NewsType } from "../enums/news-type.enum";

export class News {
    _id: string;
    title: string;
    banner: string;
    content: string;
    status: NewsType = NewsType.New ;
    viewCount: number = 0;
}