import { TranslateService } from './../../../../shared/services/translate.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { NewsRouteNames, Errors } from '../../constants/news.constant';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { NewViewModel, NewsFields, News } from '../../../../shared/models/news.model';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { filter, head, equals } from 'ramda';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public items: NewViewModel[] = [];
  currentFilterArgs: IFilterChangedEvent;

  constructor(private service: NewsService,
    private notificationService: NotificationService,
    private translateService:TranslateService, private route: Router) { }

  ngOnInit() {
  }

  public count = (searchKey: string): Observable<number> => {
    return this.service.count(searchKey);
  }

  convertTime(date: Date): string {
    return moment(date).fromNow();
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.currentFilterArgs = eventArg;
    this.loadNews();
  }

  loadNews() {
    const pagination = this.currentFilterArgs.pagination;
    this.service
      .getNews(
        pagination.itemsPerPage,
        pagination.page,
        this.currentFilterArgs.searchKey
      )
      .subscribe((response: NewViewModel[]) => {
        this.items = response;
        this.items.forEach(item => {
          item.create_date = this.convertTime(item.create_on);
          item.publish_date = this.convertTime(item.published_on);
        });
      });
  }

  NewProcessing(id: string) {
    const processedItem = head(filter(c => equals(c[NewsFields.ID], id), this.items));

    this.service.updateStatus(id, processedItem.status).subscribe((updateNew) => {
      processedItem.status = updateNew.status;
      processedItem.publish_date = this.convertTime(updateNew.publishedOn);
    });
  }

  navigateToCreate() {
    this.route.navigate([NewsRouteNames.CREATE]);
  }

  navigateToEdit(id: string) {
    this.route.navigate([`${NewsRouteNames.EDIT}/${id}`]);
  }

  navigateToDetail(news:News) {
    this.route.navigate([`${NewsRouteNames.VIEW}/${news._id}`]);
  }

  delete(id:string) {
    this.service.remove(id).subscribe((ret) => {
        const msg = this.getMessage(Errors.Delete_News_Success);
        this.notificationService.showSuccess(msg);
        this.loadNews();
    });
  }

  private getMessage(code: string, ...params) {
    if (params.length) {
      return this.translateService.translateWithParams(code, params);
    } else {
      return this.translateService.translate(code);
    }
  }
}
