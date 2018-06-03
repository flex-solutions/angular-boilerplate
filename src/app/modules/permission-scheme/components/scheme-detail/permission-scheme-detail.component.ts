import { DialogService } from './../../../../shared/ui-common/modal/services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';

@Component({
    selector: 'app-permission-scheme-detail',
    templateUrl: 'permission-scheme-detail.component.html'
})

export class PermissionSchemeDetailComponent extends DialogComponent implements OnInit {
    constructor(protected dialogService: DialogService) {
        super(dialogService);
     }

    ngOnInit() { }
}
