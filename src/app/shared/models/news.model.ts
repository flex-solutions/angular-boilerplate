import { NewsStatusType } from '../enums/news-type.enum';

export class News {
    _id: string;
    title: string;
    banner: string;
    content: string;
    status: NewsStatusType = NewsStatusType.New ;
    viewCount = 0;
    publishedOn: number;
    publishedBy: string;
}
