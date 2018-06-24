import { NewsStatusType } from '../enums/news-type.enum';
import { ModelBase } from './model-base';

class News extends ModelBase {
    _id: string;
    title: string;
    banner: any;
    content: string;
    status: NewsStatusType = NewsStatusType.New ;
    viewCount = 0;
    published_on: Date;
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

export {News, NewsFields};

