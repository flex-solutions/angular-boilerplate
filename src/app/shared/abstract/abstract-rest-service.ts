import { ApplicationConfigurationService } from '../services/application-configuration.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError, retry, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharedModule } from '../shared.module';
import { LoaderService } from '../ui-common/loading-bar/loader.service';

export abstract class AbstractRestService {
  protected abstract controllerName: string;
  protected baseUrl: string;
  private configurationService: ApplicationConfigurationService;
  protected httpClient: HttpClient;
  protected loaderService: LoaderService;

  constructor() {
    // Get base url provide by application configuration service
    this.configurationService = SharedModule.injector.get(
      ApplicationConfigurationService
    );
    this.baseUrl = this.configurationService.getApiUri();
    this.httpClient = SharedModule.injector.get(HttpClient);
    this.loaderService = SharedModule.injector.get(LoaderService);
  }

  get<T>(relativeUrl: string) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient
      .get<T>(url)
      .pipe(catchError(this.handleError), finalize(() => this.hideLoader()));
  }

  getWithRetry<T>(relativeUrl: string, retryTimes: number) {
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient.get<T>(url).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  showLoader() {
    this.loaderService.show();
  }

  hideLoader() {
    this.loaderService.hide();
  }

  protected getFullUrl(relativeUrl: string) {
    let fullUrl = '';
    if (this.controllerName) {
      fullUrl = this.getApiWithController(relativeUrl);
    } else {
      fullUrl = this.getApiWithoutController(relativeUrl);
    }

    return fullUrl;
  }

  // Build full path for api
  protected getApiWithController(api: string) {
    return `${this.baseUrl}/${this.controllerName}/${api}`;
  }

  protected getApiWithoutController(api: string) {
    return `${this.baseUrl}/${api}`;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return Observable.throw('Something bad happened; please try again later.');
  }
}
