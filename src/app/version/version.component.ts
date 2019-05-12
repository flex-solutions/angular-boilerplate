import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DialogService } from './../shared/ui-common/modal/services/dialog.service';
import { AppService } from './../app.service';
import { Component } from '@angular/core';
import { DialogComponent } from '../shared/ui-common/modal/components/dialog.component';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-version',
    templateUrl: 'version.component.html',
    styleUrls: ['version.component.css']
})
export class VersionComponent extends DialogComponent implements AfterViewInit {

    guiVersion: string;
    apiVersion: string;
    cmsTitle: string;
    contactMail: string;
    homepage: string;

    constructor(private readonly appService: AppService,
        dialogService: DialogService) {
        super(dialogService);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.getApiVersion();
            this.getGUIVersion();

            this.cmsTitle = environment.CMS_TITLE;
            this.contactMail = environment.CONTACT_MAIL;
            this.homepage = environment.HOMEPAGE;
        });
    }

    private getApiVersion() {
        this.appService.getApiVersion().subscribe(res => {
            this.apiVersion = res.version;
        });
    }

    private getGUIVersion() {
        this.guiVersion = environment.VERSION;
    }

    close() {
        this.result = true;
        this.dialogResult();
    }
}
