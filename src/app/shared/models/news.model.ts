import { NewsType } from '../enums/news-type.enum';

class News {
    _id: string;
    title: string;
    banner: string;
    content: string;
    status: NewsType = NewsType.New;
    viewCount = 0;
}

class NewViewModel extends News {
    create_date: string;
    publish_date: string;
    create_on: Date;
    publish_on: Date;
}

export { NewViewModel, News };
