import { AuthenticationService } from './shared/services/authentication.service';
import { Component, LOCALE_ID, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  languages = [
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'en', label: 'English' }
  ];

  constructor(
    @Inject(LOCALE_ID) protected localeId: string,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (
      this.authenticationService.authenticated() &&
      this.authenticationService.hasAuthRemember()
    ) {
      // Have authenticate to login CMS
    } else {
      this.authenticationService.navigateToLoginPage();
    }
  }
}
