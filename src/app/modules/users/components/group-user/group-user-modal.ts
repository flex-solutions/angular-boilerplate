import { UserGroup } from './../../../../shared/models/user-group.model';
import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';
import { TranslateService } from '../../../../shared/services/translate.service';

@Pipe({
  name: 'userGroupFilter'
})
export class GroupFilterPipe implements PipeTransform {
  transform(items: UserGroup[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.name.toLowerCase().includes(searchText)
        || it.permissionScheme.name.toLowerCase().includes(searchText);
    });
  }
}

@Component({
  selector: 'app-group-user-modal',
  templateUrl: 'group-user-modal.html'
})

export class GroupUserModalComponent extends DialogComponent implements OnInit {
  constructor(protected dialogService: DialogService) {
    super(dialogService);
  }
  public groupUsers: UserGroup[] = [];

  ngOnInit() {

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
