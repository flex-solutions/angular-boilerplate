
import { DropifyComponent } from './../../../../shared/ui-common/dropify/dropify.component';
import { TranslateService } from './../../../../shared/services/translate.service';
import { News } from './../../../../shared/models/news.model';
import { NewsService } from './../../services/news.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TynimceEditorComponent } from '../../../../shared/ui-common/tinymce-editor/tinymce-editor.component';
import { Errors } from '../../constants/news.constant';
import { GenericValidator, IValidationMessage } from '../../../../shared/validation/generic-validator';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
import { convertStringToBase64 } from '../../../../utilities/convertStringToBase64';

const TITLE_CREATE_NEWS = 'news-create_edit_news-h4-create_news';
const DESCRIPTION_CREATE_NEWS = 'news-create_edit_news-h4-create_news_description';
const TITLE_EDIT_NEWS = 'news-create_edit_news-h4-edit_news';
const DESCRIPTION_EDIT_NEWS = 'news-create_edit_news-h4-edit_news_description';
const BRIEF_LENGTH = 300;
@Component({
  moduleId: module.id,
  selector: 'app-create-edit-news',
  templateUrl: './create-edit-news.component.html',
  styleUrls: ['./create-edit-news.component.css']
})
export class CreateEditNewsComponent extends AbstractFormComponent implements OnInit {
  isEdit = false;
  isPublish = false;
  isCreateAnother = false;
  rawContent: string;
  isBlurEditor = false;
  isFinishedContentComponent = false;

  news: News = new News();
  newsId: string;
  cardTitle: string;
  cardDescription: string;
  protected validationMessages: {
    [key: string]: { [key: string]: IValidationMessage };
  } = {
      title: {}
    };
  @ViewChild(TynimceEditorComponent)
  private ContentEditor: TynimceEditorComponent;

  @ViewChild(DropifyComponent)
  private BannerEditor: DropifyComponent;

  constructor(
    private formbuilder: FormBuilder,
    private newsService: NewsService,
    private translateService: TranslateService,
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    super();
    this.genericValidator = new GenericValidator(this.validationMessages, this.translateService);
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.newsId = params['id'] ? params['id'] : '';
      this.isEdit = params['id'] ? true : false;
      if (this.isEdit) {
        this.cardTitle = this.translateService.translate(TITLE_EDIT_NEWS);
        this.cardDescription = this.translateService.translate(DESCRIPTION_EDIT_NEWS);
      } else {
        this.cardTitle = this.translateService.translate(TITLE_CREATE_NEWS);
        this.cardDescription = this.translateService.translate(DESCRIPTION_CREATE_NEWS);
      }
    });
    this.onCreateForm();
  }

  loadNews() {
    if (!this.isFinishedContentComponent) {
      return;
    }
    if (this.isEdit) {
      this.newsService.getById(this.newsId).subscribe(
        (value: News) => {
          if (value) {
            this.news = value as News;
            this.news.banner = convertStringToBase64(this.news.banner);
          } else {
            // Navigate to previous if user group not found
            this.location.back();
          }
        }
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

  get isNotification() {
    return this.formGroup.get('isNotification');
  }

  get notificationMessage() {
    return this.formGroup.get('notificationMessage');
  }

  get createAnother() {
    return this.formGroup.get('createAnother');
  }

  hasEmptyAndBlurContent() {
    if (isNullOrEmptyOrUndefined(this.rawContent)) {
      return this.isBlurEditor;
    }
    return false;
  }

  protected onCreateForm() {
    this.formGroup = this.formbuilder.group({
      title: ['', [Validators.required]],
      banner: ['', []],
      content: ['', []],
      createAnother: ['', []],
      isNotification: ['', []],
      notificationMessage: ['', []],
    });
  }

  protected onValidate() { }

  protected onSubmit() {
    if (!this.isEdit) {
      this.news.brief_content = this.validateRawContent();
      this.newsService.create(this.news).subscribe(
        (value: News) => {
          // * Create news successful, display success notification
          const msg = this.getMessage(
            Errors.Create_News_Sucess,
            this.news.title
          );
          this.notificationService.showSuccess(msg);
          this.refreshPageAfterSubmit();
        }
      );
    }
  }

  public submitAndPublishNews() {
    this.news.brief_content = this.validateRawContent();
    this.newsService.createAndPublish(this.news).subscribe(
      (value: News) => {
        // * Create news successful, display success notification
        const msg = this.getMessage(
          Errors.Create_Published_News_Sucess,
          this.news.title
        );
        this.notificationService.showSuccess(msg);
        this.refreshPageAfterSubmit();
      }
    );
  }

  protected onCancel() {
    this.location.back();
  }

  private refreshPageAfterSubmit() {
    if (this.isCreateAnother) {
      this.news = new News();
      this.resetForm();
      this.ContentEditor.reset();
      this.BannerEditor.reset();
    } else {
      this.location.back();
    }
  }

  onTinyEditorBlur(event: any) {
    this.isBlurEditor = event;
  }

  saveNews() {
    if (this.isEdit) {
      this.news.brief_content = this.validateRawContent();
      this.newsService.update(this.news).subscribe(
        (value: News) => {
          // * Create news successful, display success notification
          const msg = this.getMessage(
            Errors.Edit_News_Success,
            this.news.title
          );
          this.notificationService.showSuccess(msg);
          this.refreshPageAfterSubmit();
        }
      );
    }
  }

  finishContentComponent() {
    this.isFinishedContentComponent = true;
    this.loadNews();
  }

  private validateRawContent(): string {
    if (this.rawContent.length > BRIEF_LENGTH) {
      return this.rawContent.substring(0, BRIEF_LENGTH) + '...';
    }
    return this.rawContent;
  }

  protected getMessage(key: string, ...params) {
    if (params.length) {
      return this.translateService.translate(key, params);
    }
    return this.translateService.translate(key);
  }
}
