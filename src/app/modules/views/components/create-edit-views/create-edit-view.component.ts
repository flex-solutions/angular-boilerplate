import { NotificationService } from './../../../../shared/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../../shared/services/translate.service';
import { GenericValidator } from '../../../../shared/validation/generic-validator';
import { FormBuilder, Validators } from '@angular/forms';
import { getBase64 } from '../../../../utilities/convert-image-to-base64';
import { User } from '../../../../shared/models/user.model';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-edit-view',
  templateUrl: './create-edit-view.component.html',
})

export class CreateEditViewComponent extends AbstractFormComponent {
  isEdit : boolean = false;
  constructor(
    fb: FormBuilder,
    translateService: TranslateService,
    private notificationService: NotificationService,
    private router: Router,
    private location: Location
  ) {
    super();
  }

  protected onSubmit() {
    // TODO: check box
  }

  protected onSubmitAndPublishView() {
    // TODO: check box
  }

  protected onCancel() {
    this.location.back();
  }
}
