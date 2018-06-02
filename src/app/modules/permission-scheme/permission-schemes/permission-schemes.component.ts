import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterChangedEvent } from '../../../shared/ui-common/datagrid/components/datagrid.component';
import { PermissionSchemes } from '../../../shared/models/permission-scheme.model';
import { PermissionSchemeServcie } from '../services/permission-scheme.service';

@Component({
  selector: 'app-permission-schemes',
  templateUrl: './permission-schemes.component.html',
  styleUrls: ['./permission-schemes.component.css']
})
export class PermissionSchemesComponent implements OnInit {
  items: PermissionSchemes[];
  currentFilterArgs: IFilterChangedEvent;

  constructor(private permissionService: PermissionSchemeServcie) { }

  ngOnInit() { }

  assignToUserGroups(item) {

  }

  copy(item) {

  }

  navigateToEditPage(item) {

  }
  navigateToCreatePage() {

  }

  public count = (searchKey: string): Observable<number> => {
    return null;
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.currentFilterArgs = eventArg;
  }

  loadPermissionSchemes() {
    const pagination = this.currentFilterArgs.pagination;
    this.permissionService.getPermissionSchemes(pagination.itemsPerPage, pagination.page,
      this.currentFilterArgs.searchKey).subscribe(response => {
        Object.assign(this.items, response);
      });
  }
}
