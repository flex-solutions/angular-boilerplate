import { WizardStep } from './../../../../shared/ui-common/wizard/wizard-step/wizard-step.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '../../../../shared/services/translate.service';
import { MessageConstant } from '../../messages';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.css']
})
export class CreatePromotionComponent implements OnInit {

  title: string;
  subTitle: string;
  formGroup: FormGroup;
  currentStep: WizardStep;
  isEditableMode: boolean;

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
  ) {
    this.isEditableMode = false;
    this.formGroup = this.fb.group({});
  }

  ngOnInit() {
    if (!this.isEditableMode) {
      this.title = this.translateService.translate(MessageConstant.CreatePromotionTitle);
      this.subTitle = this.translateService.translate(MessageConstant.CreatePromotionDescription);
    } else {
      this.title = this.translateService.translate(MessageConstant.EditPromotionTitle);
      this.subTitle = this.translateService.translate(MessageConstant.EditPromotionDescription);
    }
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
}
