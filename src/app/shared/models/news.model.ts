import { NewsStatusType } from '../enums/news-type.enum';

class News {
    _id: string;
    title: string;
    banner: string;
    content: string;
    status: NewsStatusType = NewsStatusType.New;
    viewCount = 0;
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
    publish_on: Date;
}

export { NewViewModel, News, NewsFields };
