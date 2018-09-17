import { VersionComponent } from './version.component';
import { IVersionController } from './../shared/interfaces/version';
import { Injectable } from '@angular/core';
import { ExDialog } from '../shared/ui-common/modal/services/ex-dialog.service';

@Injectable()
export class VersionController implements IVersionController {

    constructor(private readonly exDialog: ExDialog) {}

    showVersion() {
        this.exDialog.openPrime(VersionComponent);
    }
}
