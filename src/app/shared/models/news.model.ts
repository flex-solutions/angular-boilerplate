import { NewsStatusType } from '../enums/news-type.enum';

export class News {
    _id: string;
    title: string;
    banner: string;
    content: string;
    status: NewsStatusType = NewsStatusType.New ;
    viewCount = 0;
    publishedOn: Date;
    publishedBy: string;
    edit_on: Date;
    edit_by: string;
    create_on: Date;
    create_by: string;
}
