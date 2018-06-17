import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { NewViewModel, NewsFields, News } from '../../../../shared/models/news.model';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';
import { NewNavigationRoute } from '../../constant/common-const';
import * as moment from 'moment';
import { NewsStatusType } from '../../../../shared/enums/news-type.enum';
import { NewStatusDirective } from '../../directives/new-status.directive';
import { filter, head, equals } from 'ramda';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NewMessageConst } from '../../constant/message.const';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public items: NewViewModel[] = [];
  currentFilterArgs: IFilterChangedEvent;

  constructor(private service: NewsService,
     private route: Router,
     private dialogManager: ExDialog,
     private translateService: TranslateService,
    private notificationService: NotificationService) { }

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

    this.service.processNew(processedItem).subscribe((updateNew) => {
      processedItem.status = updateNew.status;
      processedItem.publish_date = this.convertTime(updateNew.published_on);
    });
  }

  deletenew(newModel: NewViewModel) {
    const confirmMsg = this.translateService.translateWithParams(NewMessageConst.ConfirmDeletNew, newModel.title);
    this.dialogManager.openConfirm(confirmMsg).subscribe(result => {
      if (result) {
        const successMessage = this.translateService.translate(NewMessageConst.DeleteSuccessfullyNotification);
        this.service.deleteNew(newModel._id).subscribe(res => {
          this.loadNews();
          this.notificationService.showSuccess(successMessage);
        });
      }
    });
  }

  navigateToCreate() {
    this.route.navigate([NewNavigationRoute.CREATE_PAGE]);
  }

  navigateToEdit(id: string) {
    this.route.navigate([`${NewNavigationRoute.EDIT_PAGE}/${id}`]);
  }

  navigateToDetail(id: string) {
    this.route.navigate([`${NewNavigationRoute.DETAIL}/${id}`]);
  }
}
