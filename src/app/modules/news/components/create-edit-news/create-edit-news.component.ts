
import { ErrorType, DropifyComponent } from './../../../../shared/ui-common/dropify/dropify.component';
import { TranslateService } from './../../../../shared/services/translate.service';
import { News } from './../../../../shared/models/news.model';
import { NewsService } from './../../services/news.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { TynimceEditorComponent } from '../../../../shared/ui-common/tinymce-editor/tinymce-editor.component';
import { Errors } from '../../constants/news.constant';

const TITLE_CREATE_NEWS: string = 'news-create_edit_news-h4-create_news';
const DESCRIPTION_CREATE_NEWS: string = 'news-create_edit_news-h4-create_news_description';
const TITLE_EDIT_NEWS: string = 'news-create_edit_news-h4-edit_news';
const DESCRIPTION_EDIT_NEWS: string = 'news-create_edit_news-h4-edit_news_description';
@Component({
  moduleId: module.id,
  selector: 'app-create-edit-news',
  templateUrl: './create-edit-news.component.html',
  styleUrls: ['./create-edit-news.component.css']
})
export class CreateEditNewsComponent extends AbstractFormComponent {
  isEdit: boolean = false;
  isPublish: boolean = false;
  isCreateAnother: boolean = false;
  isBannerError: boolean = false;
  rawContent: String;
  isBlurEditor: boolean = false;
  isFinishedBannerComponent: boolean = false;
  isFinishedContentComponent:boolean = false;

  news: News = new News();
  newsId: string;
  cardTitle: string;
  cardDescription: string;

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

  LoadNews() {
    if(!this.isFinishedBannerComponent || !this.isFinishedContentComponent) {
      return;
    }
    if (this.isEdit) {
      this.newsService.getById(this.newsId).subscribe(
        (value: News) => {
          if (value) {
            this.news = value as News;
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

  get createAnother() {
    return this.formGroup.get('createAnother');
  }

  hasErrorBanner() {
    return this.isBannerError;
  }

  hasEmptyAndBlurContent() {
    return (isNullOrUndefined(this.rawContent) || this.rawContent === '') && this.isBlurEditor ;
  }

  protected onCreateForm() {
    this.formGroup = this.formbuilder.group({
      title: ['', [Validators.required]],
      banner: ['', []],
      content: ['', []],
      createAnother: ['', []]
    });
  }

  protected onSubmit() {
    if (!this.isEdit) {
      this.newsService.create(this.news).subscribe(
        (value: News) => {
          // * Create news successful, display success notification
          const msg = this.getMessage(
            Errors.Create_News_Sucess,
            this.news.title
          );
          this.notificationService.showSuccess(msg);
          this.refreshPageIfCreateAnother();
        }
      );
    } else {
      this.newsService.update(this.news).subscribe(
        (value: News) => {
          // * Create news successful, display success notification
          const msg = this.getMessage(
            Errors.Edit_News_Success,
            this.news.title
          );
          this.notificationService.showSuccess(msg);
          this.refreshPageIfCreateAnother();
        }
      );
    }
  }

  public submitAndPublishNews() {
    this.newsService.createAndPublish(this.news).subscribe(
      (value: News) => {
        // * Create news successful, display success notification
        const msg = this.getMessage(
          Errors.Create_Published_News_Sucess,
          this.news.title
        );
        this.notificationService.showSuccess(msg);
        this.refreshPageIfCreateAnother();
      }
    );
  }

  protected onCancel() {
    this.location.back();
  }

  private refreshPageIfCreateAnother() {
    if (this.isCreateAnother) {
      this.news = new News();
      this.resetForm();
      this.ContentEditor.reset();
      this.BannerEditor.reset();
    } else {
      this.location.back();
    }
  }

  onHtmlEditorChange(text: string) {
    this.news.content = text;
  }

  onContentEmpty(event) {
    this.rawContent = event;
  }

  onTinyEditorBlur(event: any) {
    this.isBlurEditor = event;
  }

  onFileChanged(event: any) {
    if (this.isBannerError && event.content != "") {
      this.isBannerError = false;
    }
    this.news.banner = event.content;
  }

  onBannerErrors(event: ErrorType) {
    if (event === ErrorType.FileSize) {
      this.isBannerError = true;
    }
  }

  saveNews() {
    this.newsService.update(this.news).subscribe(
      (value: News) => {
        // * Create news successful, display success notification
        const msg = this.getMessage(
          Errors.Edit_News_Success,
          this.news.title
        );
        this.notificationService.showSuccess(msg);
      }
    );
  }

  finishBannerComponent() {
    this.isFinishedBannerComponent = true;
    this.LoadNews();
  }

  finishContentComponent() {
    this.isFinishedContentComponent = true;
    this.LoadNews();
  }

  protected getMessage(key: string, ...params) {
    if (params.length) {
      return this.translateService.translateWithParams(key, params);
    }
    return this.translateService.translate(key);
  }
}
