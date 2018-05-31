import { UserGroup } from './../../../../shared/models/user-group.model';
import { Component, OnInit, PipeTransform, Pipe, Input } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { UserGroupService } from '../../../user-groups/services/usergroup.service';

@Component({
  selector: 'app-group-user-modal',
  templateUrl: 'group-user-modal.html'
})

export class GroupUserModalComponent extends DialogComponent implements OnInit {
  constructor(protected dialogService: DialogService,
    private grService: UserGroupService) {
    super(dialogService);
  }
  currentGroup: UserGroup = new UserGroup();
  groupUsers: UserGroup[] = [];
  selectedGroup: string;

  ngOnInit() {
    this.currentGroup = this.callerData as UserGroup;
    this.selectedGroup = this.currentGroup._id;
  }

  onValueChanged(value) {
    this.selectedGroup = value;
  }

  cancel() {
    this.result = false;
    this.dialogResult();
  }

  submit() {
    this.result = true;
    this.dialogResult();
  }

}
