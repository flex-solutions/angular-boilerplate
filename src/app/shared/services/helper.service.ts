import { Injectable } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class HelperService {
  addContentTypeHeader: boolean | string = true;

  constructor(public slimLoadingBarService: SlimLoadingBarService) {}

  startLoader(delay?: number): void {
    delay = delay || typeof delay === 'number' ? delay : 0;
    setTimeout(() => {
      this.slimLoadingBarService.start(() => {
        // Loading Completed;
      });
    }, delay);
  }

  stopLoader(delay?: number): void {
    delay = delay || typeof delay === 'number' ? delay : 0;
    setTimeout(() => {
      this.slimLoadingBarService.complete();
    }, delay);
  }
}
