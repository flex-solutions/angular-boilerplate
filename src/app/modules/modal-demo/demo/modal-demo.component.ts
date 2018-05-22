import { Component, OnInit } from '@angular/core';
import { ExDialog } from '../../../shared/ui-common/modal/services/ex-dialog.service';
import { HostedModalComponent } from './hosted-modal.component';

@Component({
    selector: 'app-modal-demo',
    templateUrl: 'modal-demo.component.html'
})

export class ModalDemoComponent implements OnInit {
    constructor(private exDialog: ExDialog) { }

    ngOnInit() { }

    showConfirm() {
        this.exDialog.openConfirm('this is a confirm dialog', 'Xac Nhan').subscribe(result => {
          if (result) {
            alert('you clicked Submit button');
          } else {
            alert('you clicked cancel button');
          }
        });
    }

    showHostedModal() {
      this.exDialog.openPrime(HostedModalComponent, 'This is hosted modal component').subscribe(result => {
        if (result) {
          alert('you clicked Submit button');
        } else {
          alert('you clicked cancel button');
        }
      });
    }
}
