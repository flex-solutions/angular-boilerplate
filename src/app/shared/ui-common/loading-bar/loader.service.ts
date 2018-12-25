import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from './loader.interface';

@Injectable()
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  show() {
    this.loaderSubject.next({ show: true });
  }

  hide() {
    this.loaderSubject.next({ show: false });
  }
}
