import { Component, OnInit } from '@angular/core';
import { ExDialog } from '../../../shared/ui-common/modal/services/ex-dialog.service';

@Component({
    selector: 'app-modal-demo',
    templateUrl: 'modal-demo.component.html'
})

export class ModalDemoComponent implements OnInit {
    constructor(private exDialog: ExDialog) { }

    ngOnInit() { }

    showConfirm() {
        this.exDialog.openConfirm('this is a confirm dialog');
    }
}
