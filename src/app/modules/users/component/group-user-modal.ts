import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../shared/ui-common/modal/services/dialog.service';
import { UserGroup } from '../../../shared/models/user-group.model';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-group-user-modal',
  templateUrl: 'group-user-modal.html'
})

export class GroupUserModalComponent extends DialogComponent implements OnInit {
  constructor(protected dialogService: DialogService) {
    super(dialogService);
  }
  public dataTable: DataTable;
  userGroup: UserGroup = new UserGroup;

  ngOnInit() {
    this.userGroup.groupName = 'a';
    this.dataTable = {
      headerRow: ['', 'Group Name', 'Permission Scheme'],
      footerRow: [],
      dataRows: [
        ['Airi Satou', 'Andrew Mike'],
        ['Angelica Ramos', 'John Doe'],
      ]
    };
  }

  public cancel() {
    this.result = false;
    this.dialogResult();
  }

  public submit() {
    this.result = true;
    this.dialogResult();
  }
}
