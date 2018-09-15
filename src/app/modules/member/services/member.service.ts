import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { MemberModel, Sex, sexResourceKey } from '../../../shared/models/member.model';

@Injectable()
export class MemberService extends AbstractRestService {
  protected controllerName: string;
  constructor() {
    super();
    this.controllerName = 'member';
  }

  count(query?: any): Observable<number> {
    if (!query) {
      query = {};
    }
    return this.getWithFilter('count', query);
  }

  getMembers(
    pageNumber: number,
    pageSize: number,
    query?: any
  ): Observable<MemberModel[]> {
    if (!query) {
      query = {};
    }
    return this.getWithFilter(`?pageSize=${pageSize}&pageNumber=${pageNumber}`, query);
  }

  public getById(_id: string): Observable<MemberModel> {
    return this.get(`${_id}`);
  }

  create(member: MemberModel): Observable<Response> {
    return this.post('', member);
  }

  update(member: MemberModel): Observable<Response> {
    return this.put('', member);
  }

  getSexes() {
    return [
      {
        id: Sex.Female,
        text: this.translateService.translate(sexResourceKey.Female)
      },
      {
        id: Sex.Male,
        text: this.translateService.translate(sexResourceKey.Male)
      },
      {
        id: Sex.Other,
        text: this.translateService.translate(sexResourceKey.Other)
      }
    ];
  }
}
