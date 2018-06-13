import { log } from 'util';
import { WizardStep } from './../../../../shared/ui-common/wizard/wizard-step/wizard-step.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  // For editable mode
  private _isEditableMode: boolean;
  private _promotionId: any;

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    private _activeRoute: ActivatedRoute
  ) {
    this._isEditableMode = false;
    this.formGroup = this.fb.group({});
  }

  ngOnInit() {
    this._activeRoute.params.subscribe((params: Params) => {
      this._promotionId = params['id'] ? params['id'] : '';
      this._isEditableMode = params['id'] ? true : false;

      this.resolveTitle();

    });
  }

  // Resolve multilangual message for app card title and sub title
  private resolveTitle() {
    if (!this._isEditableMode) {
      this.title = this.translateService.translate(MessageConstant.CreatePromotionTitle);
      this.subTitle = this.translateService.translate(MessageConstant.CreatePromotionDescription);
    } else {
      this.title = this.translateService.translate(MessageConstant.EditPromotionTitle);
      this.subTitle = this.translateService.translate(MessageConstant.EditPromotionDescription);
    }
  }

  // Load promotion info from server
  private loadPromotion() {

  }

  onFinshAndStart() {
    console.log('[CreatePromotionComponent] onFinshAndStart');
  }

  onWizardCancel() {
    console.log('[CreatePromotionComponent] onCancel');
  }

  onWizardFinish() {
    console.log('[CreatePromotionComponent] onFinish');
  }

  onStepChanged(step: WizardStep) {
    console.log('[CreatePromotionComponent] Step change: ' + step);
    this.currentStep = step;
  }

  onHtmlEditorChange(content) {
    console.log(content);

  }
}
