import { Location } from '@angular/common';
import { isNil } from 'ramda';
import { NotificationService } from './../../../../shared/services/notification.service';
import { IPromotion } from './../../interfaces/promotion';
import { PromotionService } from './../../services/promotion.service';
import { WizardStep } from './../../../../shared/ui-common/wizard/wizard-step/wizard-step.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '../../../../shared/services/translate.service';
import { MessageConstant } from '../../messages';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.css']
})
export class CreatePromotionComponent implements OnInit {

  // Properties
  title: string;
  subTitle: string;
  formGroup: FormGroup;
  currentStep: WizardStep;
  promotion: IPromotion;
  banerInvalid: boolean;
  contentInvalid: boolean;
  isCreateAnother: boolean;

  // For editable mode
  isEditableMode: boolean;

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    private _activeRoute: ActivatedRoute,
    private _promotionService: PromotionService,
    private _notificationService: NotificationService,
    private _location: Location
  ) {
    this.banerInvalid = false;
    this.contentInvalid = false;
    this.isEditableMode = false;
    this.formGroup = this.fb.group({
      title: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this._activeRoute.params.subscribe((params: Params) => {
      const promotionId = params['id'] ? params['id'] : '';
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
      this.title = this.translateService.translate(MessageConstant.CreatePromotionTitle);
      this.subTitle = this.translateService.translate(MessageConstant.CreatePromotionDescription);
    } else {
      this.title = this.translateService.translate(MessageConstant.EditPromotionTitle);
      this.subTitle = this.translateService.translate(MessageConstant.EditPromotionDescription);
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

  onStepChanged(step: WizardStep) {
    this.currentStep = step;
  }

  onHtmlEditorChange(htmlContent) {
    this.promotion.content = htmlContent;
    this.contentInvalid = isNil(htmlContent) || htmlContent === '';
  }

  private showNotification(messageKey) {
    const message = this.translateService.translate(messageKey);
    this._notificationService.showSuccess(message);
  }

  private onHandleCreateSuccess() {
    if (this.isCreateAnother) {
      this.formGroup.reset();
      // Reset drotify control

      // Reset tinycme control


    } else {
      this._location.back();
    }
  }
}
