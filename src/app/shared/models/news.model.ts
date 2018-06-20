import { NewsStatusType } from '../enums/news-type.enum';

class News {
    _id: string;
    title: string;
    banner: any;
    content: string;
    status: NewsStatusType = NewsStatusType.New ;
    viewCount = 0;
    publishedOn: Date;
    publishedBy: string;
    edit_on: Date;
    edit_by: string;
    create_on: Date;
    create_by: string;

    getImageBase64() {
        const base64 = atob(this.banner);
        return base64;
    }
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

