import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';
import { UserService } from '../../services/user.service';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';
import { ChangePasswordModel } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.modal.html',
})
export class ChangePasswordComponent extends DialogComponent implements OnInit {

  constructor(protected service: UserService, protected dialogService: DialogService) {
    super(dialogService);
  }

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  isSubmit = true;
  currentError = '';

  ngOnInit() {

  }

  cancel() {
    this.result = false;
    this.dialogResult();
  }

  submit() {
    this.service.changePassword(this.newPassword);
  }
}
