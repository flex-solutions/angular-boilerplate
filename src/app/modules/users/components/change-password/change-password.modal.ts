import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';
import { UserService } from '../../services/user.service';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';
import { ChangePasswordModel } from '../../../../shared/models/user.model';
import { NotificationService } from '../../../../shared/services/notification.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { UserMessages } from '../../users.constant';
import { ValidateResult } from '../../../../shared/models/validate-model.base';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.modal.html',
})
export class ChangePasswordComponent extends DialogComponent implements OnInit {

  constructor(protected service: UserService,
    protected dialogService: DialogService,
    protected notificationService: NotificationService,
    protected translateService: TranslateService) {
    super(dialogService);
  }

  model: ChangePasswordModel;

  confirmPassword = '';
  isSubmit = true;
  currentError = '';

  ngOnInit() {
    this.model = new ChangePasswordModel();
    this.model.new_password = '';
    this.model.old_password = '';
  }

  cancel() {
    this.result = false;
    this.dialogResult();
  }

  submit() {
    this.service.isPasswordCorrect(this.model).subscribe((data) => {
      const dataResult = data as ValidateResult;
      if (isNullOrUndefined(dataResult)) {
        return;
      }

      // validate the current password is correct or not.
      // if not show the error message.
      if (!dataResult.is_valid) {
        this.currentError = dataResult.error_message;
        return;
      }

      this.service.changePassword(this.model).subscribe(() => {
        this.currentError = '';
        this.notificationService.showSuccess(this.translateService.translate(UserMessages.ChangePasswordSuccessFully));
        this.result = true;
        this.dialogResult();
      });
    });
  }
}
