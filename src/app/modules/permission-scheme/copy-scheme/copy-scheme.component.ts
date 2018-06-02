import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../shared/ui-common/modal/services/dialog.service';
import { IPermissionScheme } from '../../../shared/models/permission-scheme.model';

@Component({
  selector: 'app-copy-scheme',
  templateUrl: './copy-scheme.component.html',
  styleUrls: ['./copy-scheme.component.css']
})
export class CopySchemeComponent extends DialogComponent implements OnInit {
  schemeDescription: string;
  copiedPermissionScheme: IPermissionScheme;
  constructor(protected dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.copiedPermissionScheme = this.callerData as IPermissionScheme;
    this.schemeDescription = 'schemeDescription';
  }

  public cancel() {
    this.result = false;
    this.dialogResult();
  }

  public submit() {
    // TODO: Call api to update scheme description

    this.result = true;
    this.dialogResult();
  }
}
