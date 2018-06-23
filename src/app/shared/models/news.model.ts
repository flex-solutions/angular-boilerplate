import { NewsStatusType } from '../enums/news-type.enum';

class News {
    _id: string;
    title: string;
    banner: any;
    content: string;
    status: NewsStatusType = NewsStatusType.New ;
    viewCount = 0;
    published_on: Date;
    published_by: string;
    updated_on: Date;
    updated_by: string;
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

class NewsViewModel extends News {
    create_date: string;
    publish_date: string;
    create_on: Date;
    published_on: Date;
}

export {News, NewsFields, NewsViewModel};

