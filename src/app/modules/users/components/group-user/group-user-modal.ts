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
  @Input() currentGroup: string;
  public groupUsers: UserGroup[] = [];

  ngOnInit() {
    this.grService.find(100, 1).subscribe(gr => this.groupUsers = gr);
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
