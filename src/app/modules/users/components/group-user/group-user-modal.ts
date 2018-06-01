import { UserGroup } from './../../../../shared/models/user-group.model';
import { Component, OnInit, PipeTransform, Pipe, Input } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { UserGroupService } from '../../../user-groups/services/usergroup.service';
import { TransferGroupData } from '../../../../shared/models/transfer-group-data.model';

@Component({
  selector: 'app-group-user-modal',
  templateUrl: 'group-user-modal.html'
})

export class GroupUserModalComponent extends DialogComponent implements OnInit {
  constructor(protected dialogService: DialogService,
    private grService: UserGroupService,
    private translateService: TranslateService) {
    super(dialogService);
  }
  groupInfo = new TransferGroupData();
  groupUsers: UserGroup[] = [];
  selectedGroupId: string;

  ngOnInit() {
    this.groupInfo = this.callerData as TransferGroupData;
    this.selectedGroupId = this.groupInfo.groupId;
    this.getGroups();
  }

  onValueChanged(value) {
    this.selectedGroupId = value;
  }

  cancel() {
    this.result = false;
    this.dialogResult();
  }

  submit() {
    this.result = true;
    this.dialogResult();
  }

  private getGroups() {
    this.grService.find(this.groupInfo.filterEvent.pagination.itemsPerPage, this.groupInfo.filterEvent.pagination.page)
      .subscribe(groups => this.groupUsers = groups);
  }
}
