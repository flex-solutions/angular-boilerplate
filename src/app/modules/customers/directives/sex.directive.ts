import { TranslateService } from './../../../shared/services/translate.service';
import { Input, Directive, OnChanges, AfterViewInit, ElementRef } from '@angular/core';
import { Sex } from '../../../shared/models/customer.model';

declare let $: any;

@Directive({ selector: '[appSex]' })

export class SexDirective implements OnChanges, AfterViewInit {
    @Input() sex: Sex;
    host: any;
    maleResource: string;
    femaleResource: string;
    otherSexResource: string;

    constructor(el: ElementRef,
        private translateService: TranslateService) {

        this.host = el.nativeElement;
        this.maleResource = translateService.translate('customers-tbl-sex-male');
        this.femaleResource = translateService.translate('customers-tbl-sex-female');
        this.otherSexResource = translateService.translate('customers-tbl-sex-other');
    }

    ngOnChanges() {
        this.createStatusCtrl();
    }

    ngAfterViewInit() {
        this.createStatusCtrl();
    }

    private createStatusCtrl() {
        switch (this.sex) {
            case Sex.Male:
                $(this.host).html(`<label class="badge badge-info">${this.maleResource}</label>`);
                break;
            case Sex.Female:
                $(this.host).html(`<label class="badge badge-success">${this.femaleResource}</label>`);
                break;
            case Sex.Other:
                $(this.host).html(`<label class="badge badge-warning">${this.otherSexResource}</label>`);
                break;
        }
    }
}
