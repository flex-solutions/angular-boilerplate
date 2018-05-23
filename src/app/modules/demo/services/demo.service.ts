import { Injectable, Injector } from '@angular/core';
import { DemoDto } from '../models/demo-dto.model';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { Observable } from 'rxjs';

@Injectable()
export class DemoService extends AbstractRestService {
  protected controllerName: string;

  constructor() {
    super();
    this.controllerName = 'demo';
  }

  findAll(): Observable<string> {
    return this.get<string>('findall');
  }

  create(): Observable<DemoDto> {
    const dto = new DemoDto();
    dto.message = 'this is message';
    dto.title = 'this is title';

    return this.post<DemoDto>('create', dto);
  }

  testException(): Observable<string> {
    return this.get<string>('testexceptioddn');
  }
}
