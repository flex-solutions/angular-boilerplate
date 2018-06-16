import { WizardComponent } from './../../../../shared/ui-common/wizard/wizard/wizard.component';
import { FileInfo, ErrorType } from './../../../../shared/ui-common/dropify/dropify.component';
import { Location } from '@angular/common';
import { isNil } from 'ramda';
import { NotificationService } from './../../../../shared/services/notification.service';
import { IPromotion } from './../../interfaces/promotion';
import { PromotionService } from './../../services/promotion.service';
import { WizardStep } from './../../../../shared/ui-common/wizard/wizard-step/wizard-step.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '../../../../shared/services/translate.service';
import { MessageConstant } from '../../messages';
import { ActivatedRoute, Params } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.css']
})
export class CreatePromotionComponent implements OnInit, AfterViewInit {

  // Properties
  cardTitle: string;
  cardSubTitle: string;
  currentStep: WizardStep;
  promotion: IPromotion;
  banerInvalid: boolean;
  contentInvalid: boolean;
  isCreateAnother: boolean;

  // For editable mode
  isEditableMode: boolean;

  @ViewChild(WizardComponent)
  private wizardComponent: WizardComponent;
  private _isError: boolean;

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    private _activeRoute: ActivatedRoute,
    private _promotionService: PromotionService,
    private _notificationService: NotificationService,
    private _location: Location
  ) {
    this.promotion = { title: '', content: '', banner: '' } as IPromotion;
    this.banerInvalid = false;
    this.contentInvalid = false;
    this.isEditableMode = false;
  }
  ngOnInit() {
    this.wizardComponent.canNext = true;
    this._activeRoute.params.subscribe((params: Params) => {
      const promotionId = params['id'] ? params['id'] : '';
      this.isEditableMode = promotionId ? true : false;

      this.resolveTitle();

      if (this.isEditableMode) {
        this.loadPromotion(promotionId);
      }
    });
  }

  ngAfterViewInit(): void {
    { $('.dropify').dropify({}); }
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
      this.promotion = p as IPromotion;
    });
  }

  onFinshAndStart() {
    console.log('[CreatePromotionComponent] onFinshAndStart');
  }

  onWizardCancel() {
    this._location.back();
  }

  onWizardFinish() {
    if (this.isEditableMode) {
      // Update promotion
      this._promotionService.update(this.promotion).subscribe(p => {
        this.showNotification(MessageConstant.UpdatePromotionSuccess);
      });
    } else {
      // Create promotion
      this._promotionService.create(this.promotion).subscribe(p => {
        this.showNotification(MessageConstant.CreatePromotionSuccess);
        this.onHandleCreateSuccess();
      });
    }
  }

  onWizardValidated() {
    console.log('onValidated...');
    this.wizardComponent.canNext = false;
    console.log('onValidated...DONE' + this.wizardComponent.canNext);
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
    this._isError = true;
    if ($event === ErrorType.FileSize) {
      this.banerInvalid = true;
    }
  }

  get titleError() {
    return this.translateService.translate('promotion-create_promotion-error-require_title');
  }

  private showNotification(messageKey) {
    const message = this.translateService.translate(messageKey);
    this._notificationService.showSuccess(message);
  }

  private onHandleCreateSuccess() {
    if (this.isCreateAnother) {
      // Reset drotify control

      // Reset tinycme control


    } else {
      this._location.back();
    }
  }
}
