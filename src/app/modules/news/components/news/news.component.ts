import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { NewViewModel, NewsFields } from '../../../../shared/models/news.model';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';
import { NewNavigationRoute } from '../../constant/common-const';
import * as moment from 'moment';
import { NewsStatusType } from '../../../../shared/enums/news-type.enum';
import { NewStatusDirective } from '../../directives/new-status.directive';
import { filter, head, equals } from 'ramda';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public items: NewViewModel[] = [];
  currentFilterArgs: IFilterChangedEvent;

  constructor(private service: NewsService, private route: Router) { }

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
        });
      });
  }

  NewProcessing(id: string, status: NewsStatusType) {
    const processedItem = head(filter(c => equals(c[NewsFields.ID], id), this.items));

    this.service.processNew(processedItem).subscribe(() => {
       if (status === NewsStatusType.Deactived || status === NewsStatusType.New) {
        processedItem.status = NewsStatusType.Published;
      } else {
        processedItem.status = NewsStatusType.Deactived;
      }
    });
  }

  navigateToCreate() {
    this.route.navigate([NewNavigationRoute.CREATE_PAGE]);
  }
}
