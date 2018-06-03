import { PermissionSchemeServcie } from './../../services/permission-scheme.service';
import { DialogService } from './../../../../shared/ui-common/modal/services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';
import { PermissionScheme, IPermissionSchemeDetail } from '../../../../shared/models/permission-scheme.model';

@Component({
    selector: 'app-permission-scheme-detail',
    templateUrl: 'permission-scheme-detail.component.html'
})

export class PermissionSchemeDetailComponent extends DialogComponent implements OnInit {

    scheme: PermissionScheme = new PermissionScheme();
    schemeDetails: IPermissionSchemeDetail[] = [];

    constructor(protected dialogService: DialogService,
        private service: PermissionSchemeServcie) {
        super(dialogService);
    }

    ngOnInit() {
        this.scheme.name = this.callerData.name;
        this.scheme.id = this.callerData._id;
        this.getPermissionScheme();
     }

    private getPermissionScheme() {
        this.service.getPermissionSchemeDetail(this.scheme.id).subscribe(scheme => {
            this.schemeDetails = scheme;
        });
    }

    close() {
        this.dialogResult();
    }
}
