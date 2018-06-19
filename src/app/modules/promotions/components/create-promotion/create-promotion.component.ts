import { WizardComponent } from './../../../../shared/ui-common/wizard/wizard/wizard.component';
import { FileInfo, ErrorType, DropifyComponent } from './../../../../shared/ui-common/dropify/dropify.component';
import { Location } from '@angular/common';
import { isNil } from 'ramda';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Promotion } from './../../interfaces/promotion';
import { PromotionService } from './../../services/promotion.service';
import { WizardStep } from './../../../../shared/ui-common/wizard/wizard-step/wizard-step.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '../../../../shared/services/translate.service';
import { MessageConstant } from '../../messages';
import { ActivatedRoute, Params } from '@angular/router';
import { TynimceEditorComponent } from '../../../../shared/ui-common/tinymce-editor/tinymce-editor.component';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.css']
})
export class CreatePromotionComponent implements OnInit {

  // Properties
  cardTitle: string;
  cardSubTitle: string;
  currentStep: WizardStep;
  promotion: Promotion;
  banerInvalid: boolean;
  contentInvalid: boolean;
  titleInvalid: boolean;
  isCreateAnother: boolean;
  banner: string;
  isBlurEditor: boolean;

  // For editable mode
  isEditableMode: boolean;

  private _isError: boolean;

  @ViewChild(WizardComponent)
  private wizardComponent: WizardComponent;

  @ViewChild(DropifyComponent)
  private dropifyComponent: DropifyComponent;

  @ViewChild(TynimceEditorComponent)
  private tynimceEditor: TynimceEditorComponent;

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    private _activeRoute: ActivatedRoute,
    private _promotionService: PromotionService,
    private _notificationService: NotificationService,
    private _location: Location
  ) {
    this.promotion = new Promotion();
    this.banerInvalid = false;
    this.titleInvalid = false;
    this.contentInvalid = false;
    this.isEditableMode = false;
    this.isCreateAnother = false;
  }
  ngOnInit() {
    this.wizardComponent.canNext = true;
    this._activeRoute.params.subscribe((params: Params) => {
      const promotionId = params['id'] ? params['id'] : null;
      this.isEditableMode = promotionId ? true : false;

      this.resolveTitle();

      if (this.isEditableMode) {
        this.loadPromotion(promotionId);
      }
    });
  }

  // Resolve multilangual message for app card title and sub title
  private resolveTitle() {
    if (!this.isEditableMode) {
      this.cardTitle = this.translateService.translate(MessageConstant.CreatePromotionTitle);
      this.cardSubTitle = this.translateService.translate(MessageConstant.CreatePromotionDescription);
    } else {
      this.cardTitle = this.translateService.translate(MessageConstant.EditPromotionTitle);
      this.cardSubTitle = this.translateService.translate(MessageConstant.EditPromotionDescription);
    }
  }

  // Load promotion info from server
  private loadPromotion(promotionId) {
    this._promotionService.getPromotion(promotionId).subscribe(p => {
      this.promotion = p as Promotion;
    });
  }

  onFinshAndStart() {
    this.onWizardFinish();
  }

  onWizardCancel() {
    this._location.back();
  }

  onWizardFinish() {
    if (this.isEditableMode) {
      // Update promotion
      this._promotionService.update(this.promotion).subscribe(() => {
        this.showNotification(MessageConstant.UpdatePromotionSuccess);
      });
    } else {
      // Create promotion
      this._promotionService.create(this.promotion).subscribe(() => {
        this.showNotification(MessageConstant.CreatePromotionSuccess);
        this.onHandleCreateSuccess();
      });
    }
  }

  onWizardValidated() {
    this.titleInvalid = false;
    this.contentInvalid = false;
    // Content is empty
    if (!this.promotion.content || this.promotion.content === '') {
      this.contentInvalid = true;
    }

    // Title is empty
    if (!this.promotion.title || this.promotion.title === '') {
      this.titleInvalid = true;
    }

    this.wizardComponent.canNext = !this.contentInvalid && !this.banerInvalid && !this.titleInvalid;
  }

  onStepChanged(step: WizardStep) {
    this.currentStep = step;
  }

  onHtmlEditorChange(htmlContent) {
    this.promotion.content = htmlContent;
    this.contentInvalid = isNil(htmlContent) || htmlContent === '';
  }

  onFileChanged($event: FileInfo) {
    if (!this._isError) {
      this.banerInvalid = false;
    }
    this._isError = false;
    this.promotion.banner = $event.content;
  }

  onFileRemoved() {
    this.banerInvalid = false;
    this.promotion.banner = '';
  }

  onErrors($event: ErrorType) {
    if ($event === ErrorType.FileSize) {
      this._isError = true;
      this.banerInvalid = true;
    }
  }

  get titleError() {
    return this.translateService.translate(MessageConstant.RequireTitle);
  }

  onTitleChange($event) {
    this.titleInvalid = false;
  }

  private showNotification(messageKey) {
    const message = this.translateService.translate(messageKey);
    this._notificationService.showSuccess(message);
  }

  onTinyEditorBlur(event: any) {
    this.isBlurEditor = event;
  }

  isTinymceContentEmpty() {
    return (isNil(this.promotion.content) || this.promotion.content === '') && this.isBlurEditor;
  }

  private onHandleCreateSuccess() {
    if (this.isCreateAnother) {
      this.promotion = new Promotion();
      // Reset drotify control
      this.dropifyComponent.reset();
      // Reset tinycme control
      this.tynimceEditor.reset();
      // Reset wizard
      this.wizardComponent.reset();

    } else {
      this._location.back();
    }
  }
}
