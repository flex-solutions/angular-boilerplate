import { News } from './../../../../shared/models/news.model';
import { NewsService } from './../../services/news.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../../shared/services/translate.service';
import { GenericValidator } from '../../../../shared/validation/generic-validator';
import { FormBuilder, Validators } from '@angular/forms';
import { getBase64 } from '../../../../utilities/convert-image-to-base64';
import { User } from '../../../../shared/models/user.model';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NewsType } from '../../../../shared/enums/news-type.enum';

@Component({
  moduleId: module.id,
  selector: 'app-create-edit-news',
  templateUrl: './create-edit-news.component.html',
})

export class CreateEditNewsComponent extends AbstractFormComponent {
  isEdit : boolean = false;
  isPublish: boolean = false;
  news: News = new News();
  constructor(
    // fb: FormBuilder,
    private newsService: NewsService,
    translateService: TranslateService,
    private notificationService: NotificationService,
    private router: Router,
    private location: Location
  ) {
    super();
  }

  protected onSubmit() {
    // TODO: check box
    this.newsService.create(this.news)
  }

  public submitAndPublishNews() {
    // TODO: check box
    this.news.status = NewsType.Publish;
    this.newsService.create(this.news)
  }

  protected onCancel() {
    this.location.back();
  }

  private onHandleCreateNewsSuccessful() {
    // if check new one, refresh page
    // if uncheck new one, return previous
  }
}
