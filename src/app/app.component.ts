import { Router, NavigationStart } from '@angular/router';
import { AuthenticationService } from './shared/services/authentication.service';
import { Component, LOCALE_ID, Inject, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BrowserNotificationService } from './shared/services/browser-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  hasAuthenticated: boolean;

  languages = [
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'en', label: 'English' }
  ];

  constructor(
    @Inject(LOCALE_ID) protected localeId: string,
    public authenticationService: AuthenticationService,
    private router: Router,
    private browserNotificationService: BrowserNotificationService
  ) {
    moment.locale(this.localeId);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Check authenticate
        this.hasAuthenticated = this.authenticationService.authenticated();
      }
    });

    // Request permission for notification
    this.browserNotificationService.requestPermission();
  }

  ngOnInit(): void {
    if (this.authenticationService.authenticated()) {
      // Have authenticate to login CMS. Verify can get new token on server side
      this.authenticationService.verifyToken().catch(err => {
        this.authenticationService.navigateToLoginPage();
      });
    } else {
      this.authenticationService.navigateToLoginPage();
    }
  }
}
