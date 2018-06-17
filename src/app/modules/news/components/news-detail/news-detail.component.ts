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
          console.log(news);
        }
      });
    }
  }

  navigateToEditPage() {
    this.router.navigate([NewsRouteNames.EDIT, this.newsModel._id]);
  }

  changeNewsStatus() {
    const updatedNews = Object.assign(new News(), this.newsModel);
    switch (this.newsModel.status) {
      case NewsStatusType.New:
      case NewsStatusType.Deactivated:
      updatedNews.status = NewsStatusType.Published;
        break;
      case NewsStatusType.Published:
      updatedNews.status = NewsStatusType.Deactivated;
        break;
      default:
        break;
    }
    this.newsService
    .updateStatus(updatedNews._id, updatedNews.status)
    .subscribe(ret => {
      const msg = this.getMessage(
        Errors.Change_Status_News_Success,
        this.newsModel.status.toString()
      );
      this.notificationService.showSuccess(msg);
      this.getNews(this.id);
    });
  }

  deleteNews(_id: string) {
    this.newsService.remove(_id).subscribe(ret => {
      if (ret) {
        const msg = this.getMessage(Errors.Delete_News_Success);
        this.notificationService.showSuccess(msg);
      }
    });
  }

  getRelativeTime(value) {
    return calculateRelativeTime(value, this.localeId);
  }
}
