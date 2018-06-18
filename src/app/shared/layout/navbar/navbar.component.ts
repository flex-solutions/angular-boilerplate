import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ExDialog } from '../../ui-common/modal/services/ex-dialog.service';
import { TranslateService } from '../../services/translate.service';
import { BasicUserInfo } from '../../models/user.model';
import { ChangePasswordComponent } from '../../../modules/users/components/change-password/change-password.modal';
declare let $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  constructor(private authenticationService: AuthenticationService, private exDialog: ExDialog,
    private translateService: TranslateService) { }

  currentUser: BasicUserInfo;

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
  }

  ngAfterViewInit(): void {
    const body = $('body');
    $('[data-toggle="minimize"]').on('click', function () {
      if (
        body.hasClass('sidebar-toggle-display') ||
        body.hasClass('sidebar-absolute')
      ) {
        body.toggleClass('sidebar-hidden');
      } else {
        body.toggleClass('sidebar-icon-only');
      }
    });
  }

  signOut() {
    this.exDialog.openConfirm(this.confirmMessage, this.confirmTitle).subscribe(result => {
      if (result) {
        // Submit button has clicked
        this.authenticationService.logOut();
      }
    });
  }

  changePassword() {
      this.exDialog
        .openPrime(ChangePasswordComponent, {

        })
        .subscribe(t => {
          if (t) {
            console.log(t);
          }
        });
  }

  get confirmTitle() {
    return this.translateService.translate('account-logout-dialog-confirm_title');
  }

  get confirmMessage() {
    return this.translateService.translate('account-logout-dialog-confirm_message');
  }
}
