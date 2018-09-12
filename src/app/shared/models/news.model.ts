import { NewsStatusType } from '../enums/news-type.enum';
import { ModelBase } from './model-base';

class News extends ModelBase {
    title: string;
    banner: any;
    content: string;
    brief_content: string;
    status: NewsStatusType = NewsStatusType.New ;
    viewCount = 0;
    published_on: Date;
    published_by: string;
    isNotification = true;
    notificationMessage: string;
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

