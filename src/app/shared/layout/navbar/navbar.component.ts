import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ExDialog } from '../../ui-common/modal/services/ex-dialog.service';
import { TranslateService } from '../../services/translate.service';
declare let $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  constructor(private authenticationService: AuthenticationService, private exDialog: ExDialog,
    private translateService: TranslateService) { }

  ngOnInit() { }

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

  get confirmTitle() {
    return this.translateService.translate('account-logout-dialog-confirm_title');
  }

  get confirmMessage() {
    return this.translateService.translate('account-logout-dialog-confirm_message');
  }
}
