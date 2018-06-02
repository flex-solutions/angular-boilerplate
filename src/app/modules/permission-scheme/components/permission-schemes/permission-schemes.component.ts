import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { IPermissionScheme } from '../../../../shared/models/permission-scheme.model';
import { PermissionSchemeServcie } from '../../services/permission-scheme.service';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { CopySchemeComponent } from '../copy-scheme/copy-scheme.component';

@Component({
  selector: 'app-permission-schemes',
  templateUrl: './permission-schemes.component.html',
  styleUrls: ['./permission-schemes.component.css']
})
export class PermissionSchemesComponent implements OnInit {
  items: IPermissionScheme[];
  currentFilterArgs: IFilterChangedEvent;

  constructor(private permissionService: PermissionSchemeServcie,
    private dialogManager: ExDialog) { }

  ngOnInit() { }

  assignToUserGroups(item) {

  }

  copy(item) {
    this.dialogManager.openPrime(CopySchemeComponent, { callerData: item }).subscribe(result => {
      if (result) {
        this.loadPermissionSchemes();
      }
    });
  }

  navigateToEditPage(item) {

  }
  navigateToCreatePage() {

  }

  public count = (searchKey: string): Observable<number> => {
    return this.permissionService.count(searchKey);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.currentFilterArgs = eventArg;
    this.loadPermissionSchemes();
  }

  loadPermissionSchemes() {
    const pagination = this.currentFilterArgs.pagination;
    this.permissionService.getPermissionSchemes(pagination.itemsPerPage, pagination.page,
      this.currentFilterArgs.searchKey).subscribe((response: IPermissionScheme[]) => {
        this.items = response;
      });
  }
}
