import { TranslateService } from './../../../shared/services/translate.service';
import { Input, Directive, OnChanges, AfterViewInit, ElementRef } from '@angular/core';
import { DataScope } from '../../../shared/models/permission-scheme.model';

declare let $: any;

@Directive({ selector: '[appDatascope]' })

export class DataScopeDirective implements OnChanges, AfterViewInit {
    @Input() dataScope: DataScope;
    host: any;
    branchDataScopeMessage: string;
    fullDataMessage: string;

    constructor(el: ElementRef,
        private translateService: TranslateService) {

        this.host = el.nativeElement;
        this.branchDataScopeMessage = translateService.translate('permissiom-scheme-datascope-branch');
        this.fullDataMessage = translateService.translate('permissiom-scheme-datascope-full');
    }

    ngOnChanges() {
        this.createStatusCtrl();
    }

    ngAfterViewInit() {
        this.createStatusCtrl();
    }

    private createStatusCtrl() {
        switch (this.dataScope) {
            case DataScope.Branch:
                $(this.host).html(`<label class="badge badge-info">${this.branchDataScopeMessage}</label>`);
                break;
            case DataScope.Full:
                $(this.host).html(`<label class="badge badge-success">${this.fullDataMessage}</label>`);
                break;
        }
    }
}
