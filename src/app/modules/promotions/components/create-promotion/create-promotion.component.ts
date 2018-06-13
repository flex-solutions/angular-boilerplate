import { WizardStep } from './../../../../shared/ui-common/wizard/wizard-step/wizard-step.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '../../../../shared/services/translate.service';

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

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
  ) {

    this.formGroup = this.fb.group({});
  }

  ngOnInit() {
    this.title = 'Create Promotion';
    this.subTitle = 'This page allows you creating a promotion and starts it if you want';
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
