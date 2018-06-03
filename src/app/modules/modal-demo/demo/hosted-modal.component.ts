import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../shared/ui-common/modal/services/dialog.service';

@Component({
  selector: 'app-hosted-modal',
  templateUrl: 'hosted-modal.component.html'
})

export class HostedModalComponent extends DialogComponent implements OnInit {
  constructor(protected dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() { }

  public cancel() {
    this.result = false;
    this.dialogResult();
  }

  public submit() {
    this.result = true;
    this.dialogResult();
  }
}
