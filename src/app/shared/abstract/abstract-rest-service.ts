import { ApplicationConfigurationService } from '../services/application-configuration.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';

export abstract class AbstractRestService {
  protected baseUrl: string;
  constructor(
    protected controllerName: string,
    protected configurationService: ApplicationConfigurationService,
    protected httpClient: HttpClient
  ) {
    // Get base url provide by application configuration service
    this.baseUrl = configurationService.getApiURI();
  }

  get(url: string) {
    return this.httpClient.get(url).pipe(catchError(this.handleError));
  }

  getWithRetry(url: string, retryTimes: number) {
    return this.httpClient.get(url).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
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
