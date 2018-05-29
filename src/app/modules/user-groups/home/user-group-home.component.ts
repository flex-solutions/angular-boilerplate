import { UserGroup } from './../../../shared/models/user-group.model';
import { IFilterChangedEvent } from './../../../shared/ui-common/datagrid/components/datagrid.component';
import { Observable } from 'rxjs';
import { UserGroupService } from './../services/usergroup.service';
import { OnInit, Component } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteNames } from '../constants/user-groups.constant';
import { DefaultUserGroup } from '../../../shared/constants/const';

@Component({
  moduleId: module.id,
  selector: 'app-user-group-home',
  templateUrl: './user-group-home.component.html',
})
export class UserGroupHomeComponent implements OnInit {

  usergroups: UserGroup[] = [];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: UserGroupService) {
  }

  ngOnInit(): void {
  }

  public count = (searchKey: string): Observable<number> => {
    return this.service.count(searchKey);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.service.find(eventArg.pagination.itemsPerPage, eventArg.pagination.page, eventArg.searchKey).subscribe(result => {
      this.usergroups = result;
    });
  }

  createNewUserGroup() {
    this.router.navigate([RouteNames.CREATE]);
  }

  editGroup(usergroup: UserGroup) {
    this.router.navigate([RouteNames.EDIT, usergroup._id]);
  }

  canAction(usergroup: UserGroup) {
    return usergroup.name !== DefaultUserGroup.ADMINISTRATORS && usergroup.name !== DefaultUserGroup.USERS;
  }
}
