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
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NewsStatusType} from '../../../../shared/enums/news-type.enum';

@Component({
  moduleId: module.id,
  selector: 'app-create-edit-news',
  templateUrl: './create-edit-news.component.html',
})

export class CreateEditNewsComponent extends AbstractFormComponent {
  isEdit : boolean = false;
  isPublish: boolean = false;
  news: News = new News();
  newsId: string;
  constructor(
    private formbuilder: FormBuilder,
    private newsService: NewsService,
    translateService: TranslateService,
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    super();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.newsId = params['id'] ? params['id'] : '';
      this.isEdit = params['id'] ? true : false;
      this.initForm();
    });
    this.onCreateForm();
  }

  private initForm() {
    if (this.isEdit) {
      this.newsService.getById(this.newsId).subscribe(
        (value: News) => {
          if (value) {
            this.news = value;
          } else {
            // Navigate to previous if user group not found
            this.location.back();
          }
        },
        error => this.notificationService.showError(error)
      );
    }
  }

  get title() {
    return this.formGroup.get('title');
  }

  get content() {
    return this.formGroup.get('content');
  }

  get banner() {
    return this.formGroup.get('banner');
  }

  protected onCreateForm() {
    this.formGroup = this.formbuilder.group({
      title: ['', [Validators.required]],
      banner: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  protected onSubmit() {
    // TODO: check box
    this.newsService.create(this.news)
  }

  public submitAndPublishNews() {
    // TODO: check boxNewsStatusType
    this.news.status = NewsStatusType.Published;
    this.newsService.create(this.news)
  }

  protected onCancel() {
    this.location.back();
  }

  private onHandleCreateNewsSuccessful() {
    // if check new one, refresh page
    // if uncheck new one, return previous
  }

  onHtmlEditorChange(text: string) {
    this.news.content = text;
  }
}
