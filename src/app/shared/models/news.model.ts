import { NewsStatusType } from '../enums/news-type.enum';
import {Buffer} from 'Buffer';
import { ModelBase } from './model-base';

export class News extends ModelBase {
    _id: string;
    title: string;
    banner: Buffer;
    content: string;
    status: NewsStatusType = NewsStatusType.New ;
    viewCount = 0;
    publishedOn: Date;
    publishedBy: string;
}
