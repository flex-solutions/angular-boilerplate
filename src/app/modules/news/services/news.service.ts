import { News, NewViewModel } from './../../../shared/models/news.model';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { of, Observable } from 'rxjs';
import { ExDialog } from '../../../shared/ui-common/modal/services/ex-dialog.service';
import { ModalSize } from '../../../shared/ui-common/modal/components/dialog.component';
import { NewsStatusType } from '../../../shared/enums/news-type.enum';


@Injectable()
export class NewsService extends AbstractRestService {
  protected controllerName: string;
  constructor(private exDialog: ExDialog) {
    super();
    this.controllerName = 'news';
  }

  create(news: News) {
    return this.post('', news);
  }

  update(news: News) {
    return this.put(news._id, news);
  }

  remove(news: News) {
  }

  public getById(_id: string): Observable<News> {
    return this.get(_id);
  }

  getNews(pageSize: number, pageNumber: number, searchKey?: string): Observable<News[]> {
    return this.get(`?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  public count(searchKey?: string): Observable<number> {
    return this.get(`count?searchKey=${searchKey}`);
  }

  processNew(newObject: News): Observable<NewViewModel> {
    return this.patch('', newObject);
  }
}
