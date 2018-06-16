import { NewsStatusType } from "../enums/news-type.enum";
import {Buffer} from "Buffer"

export class News {
    _id: string;
    title: string;
    banner: Buffer;
    content: string;
    status: NewsStatusType = NewsStatusType.New ;
    viewCount: number = 0;
}