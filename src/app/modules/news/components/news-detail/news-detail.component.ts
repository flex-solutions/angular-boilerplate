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
import { NewMessageConst } from '../../constants/message.const';
import { ModuleRoute } from '../../../../shared/constants/const';
import { convertStringToBase64 } from '../../../../utilities/convertStringToBase64';

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
      return this.translateService.translate(code, params);
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
          this.base64Image = convertStringToBase64(this.newsModel.banner);
        }
      });
    }
  }

  navigateToEditPage() {
    this.router.navigate([NewsRouteNames.EDIT, this.newsModel._id]);
  }

  changeNewsStatus() {
    this.newsService
    .processNew(this.newsModel)
    .subscribe(ret => {
      const newStatusItem = ret;
      if (newStatusItem.status !== this.newsModel.status) {
        const msg = this.getMessage(
          Errors.Change_Status_News_Success,
          this.newsModel.status.toString()
        );
        this.notificationService.showSuccess(msg);
        this.newsModel.status = newStatusItem.status;
      }
    });
  }

  deleteNews(newViewModel: News) {
    const confirmMsg = this.translateService.translate(NewMessageConst.ConfirmDeletNew, newViewModel.title);
    this.exDlg.openConfirm(confirmMsg).subscribe(result => {
      if (result) {
        const successMessage = this.translateService.translate(NewMessageConst.DeleteSuccessfullyNotification);
        this.newsService.deleteNew(newViewModel._id).subscribe(res => {
          this.notificationService.showSuccess(successMessage);
          this.router.navigate([ModuleRoute.NEWS]);
        });
      }
    });
  }

  getRelativeTime(value) {
    return calculateRelativeTime(value, this.localeId);
  }
}
