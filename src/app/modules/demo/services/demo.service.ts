import { Injectable } from '@angular/core';
import { AbstractHttpService } from '../../../shared/abstract/http-service.abstract';
import { Observable } from 'rxjs/Observable';
import { DemoDto } from '../models/demo-dto.model';

@Injectable()
export class DemoService extends AbstractHttpService {
  protected controllerName: string;
  constructor() {
    super();
    this.controllerName = 'demo';
  }

  findAll(): Observable<string> {
    return this.get('findall');
  }

  create(): Observable<DemoDto> {
    const dto = new DemoDto();
    dto.message = 'this is message';
    dto.title = 'this is title';

    return this.post('create', dto);
  }
}
