import { NewsRouteNames } from './../../news.constants';
import { TranslateService } from './../../../../shared/services/translate.service';
import { TransferGroupData } from './../../../../shared/models/transfer-group-data.model';
import {NewsErrors} from "./../../errors/NewsErrors";
import { News } from './../../../../shared/models/news.model';
import { NewsService } from './../../services/news.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Component, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { GenericValidator } from '../../../../shared/validation/generic-validator';
import { FormBuilder, Validators } from '@angular/forms';
import { getBase64 } from '../../../../utilities/convert-image-to-base64';
import { User } from '../../../../shared/models/user.model';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NewsStatusType } from '../../../../shared/enums/news-type.enum';
import { isNullOrUndefined } from 'util';
import { TynimceEditorComponent } from '../../../../shared/ui-common/tinymce-editor/tinymce-editor.component';

const TITLE_CREATE_NEWS: string = 'news-news-h4-create_news';
const DESCRIPTION_CREATE_NEWS: string = 'news-create_edit_news-h4-create_news_description';
const TITLE_EDIT_NEWS: string = 'news-create_edit_news-h4-edit_news';
const DESCRIPTION_EDIT_NEWS: string = 'news-create_edit_news-h4-edit_news_description';
@Component({
  moduleId: module.id,
  selector: 'app-create-edit-news',
  templateUrl: './create-edit-news.component.html',
})
export class CreateEditNewsComponent extends AbstractFormComponent {
  isEdit: boolean = false;
  isPublish: boolean = false;
  isCreateAnother: boolean = false;
  isBlurEditor: boolean = false;
  news: News = new News();
  newsId: string;
  cardTitle: string;
  cardDescription: string;

  @ViewChild(TynimceEditorComponent)
  private ContentEditor : TynimceEditorComponent;

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
      this.initForm();
    });
    this.onCreateForm();
  }

  private initForm() {
    if (this.isEdit) {
      this.cardTitle = this.translateService.translate(TITLE_EDIT_NEWS);
      this.cardDescription = this.translateService.translate(DESCRIPTION_EDIT_NEWS);
      this.newsService.getById(this.newsId).subscribe(
        (value: News) => {
          if (value) {
            this.news = value;
          } else {
            // Navigate to previous if user group not found
            this.location.back();
          }
        }
      );
    } else {
      this.cardTitle = this.translateService.translate(TITLE_CREATE_NEWS);
      this.cardDescription = this.translateService.translate(DESCRIPTION_CREATE_NEWS);
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

  hasEmptyBanner() {
    return this.news.banner == null;
  }

  hasEmptyAndBlurContent() {
    return (isNullOrUndefined(this.news.content) || this.news.content == "") && this.isBlurEditor ;
  }

  protected onCreateForm() {
    this.formGroup = this.formbuilder.group({
      title: ['', [Validators.required]],
      banner: ['',[]],
      content: ['', []],
      createAnother: ['',[]]
    });
  }

  protected onSubmit() {
    if (!this.isEdit) {
      this.newsService.create(this.news).subscribe(
        (value: News) => {
          // * Create news successful, display success notification
          const msg = this.getMessage(
            NewsErrors.Create_News_Sucess,
            this.news.title
          );
          this.notificationService.showSuccess(msg);
          this.refreshPageIfCreateAnother();
        }
      );
    }
  }

  public submitAndPublishNews() {
    // TODO: check boxNewsStatusType
    this.newsService.createAndPublish(this.news).subscribe(
      (value: News) => {
        // * Create news successful, display success notification
        const msg = this.getMessage(
          NewsErrors.Create_News_Sucess,
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
    } else {
      this.location.back();
    }
  }

  onHtmlEditorChange(text: string) {
    this.news.content = text;
  }

  onTinyEditorBlur(event: any) {
    this.isBlurEditor = event;
  }

  imageChanged(event: any) {
    this.news.banner = event.content;
  }

  onErrors(event:any) {
  }

  protected getMessage(key: string, ...params) {
    if (params.length) {
      return this.translateService.translateWithParams(key, params);
    }
    return this.translateService.translate(key);
  }
}
