import { NewsStatusType } from '../enums/news-type.enum';
import {Buffer} from 'Buffer';

class News {
    _id: string;
    title: string;
    banner: Buffer;
    content: string;
    status: NewsStatusType = NewsStatusType.New;
    viewCount = 0;
    publishedOn: Date;
    publishedBy: string;
    edit_on: Date;
    edit_by: string;
    create_on: Date;
    create_by: string;
}

const NewsFields = {
    ID: '_id',
    TITLE: 'title',
    BANNER: 'banner',
    CONTENT: 'content',
    STATUS: 'status',
    VIEWCOUNT: 'viewCount',
    PUBLISHED_ON: 'published_on'
  };

class NewViewModel extends News {
    create_date: string;
    publish_date: string;
    create_on: Date;
    published_on: Date;
}

export { NewViewModel, News, NewsFields };
