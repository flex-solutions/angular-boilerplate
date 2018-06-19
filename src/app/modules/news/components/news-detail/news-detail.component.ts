import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../../../../shared/models/news.model';
import { NewsService } from '../../services/news.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { NewsRouteNames, Errors } from '../../constants/news.constant';
import { TranslateService } from '../../../../shared/services/translate.service';
import { NewsStatusType } from '../../../../shared/enums/news-type.enum';
import { calculateRelativeTime } from '../../../../utilities/methods.common';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  newsModel: News = new News();
  base64Image: any;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private notificationService: NotificationService,
    private exDlg: ExDialog,
    private translateService: TranslateService,
    @Inject(LOCALE_ID) protected localeId: string,
  ) {}

  private getMessage(code: string, ...params) {
    if (params.length) {
      return this.translateService.translateWithParams(code, params);
    } else {
      return this.translateService.translate(code);
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getNews(this.id);
  }

  getNews(id: string) {
    if (id) {
      this.newsService.getById(id).subscribe(news => {
        if (news) {
          this.newsModel = news;
          this.base64Image = atob(this.newsModel.banner);
          console.log(news);
        }
      });
    }
  }

  navigateToEditPage() {
    this.router.navigate([NewsRouteNames.EDIT, this.newsModel._id]);
  }

  changeNewsStatus() {
    this.newsService
    .updateStatus(this.newsModel._id, this.newsModel.status)
    .subscribe(ret => {
      let newStatusItem = ret;
      if (newStatusItem.status != this.newsModel.status) {
        const msg = this.getMessage(
          Errors.Change_Status_News_Success,
          this.newsModel.status.toString()
        );
        this.notificationService.showSuccess(msg);
        this.newsModel = newStatusItem;
      }
    });
  }

  deleteNews(_id: string) {
    this.newsService.remove(_id).subscribe(ret => {
        const msg = this.getMessage(Errors.Delete_News_Success);
        this.notificationService.showSuccess(msg);
    });
  }

  getRelativeTime(value) {
    return calculateRelativeTime(value, this.localeId);
  }
}
