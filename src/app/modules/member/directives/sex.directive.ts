import { TranslateService } from './../../../shared/services/translate.service';
import { Input, Directive, OnChanges, AfterViewInit, ElementRef } from '@angular/core';
import { Sex, sexResourceKey } from '../../../shared/models/member.model';

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
        this.maleResource = translateService.translate(sexResourceKey.Male);
        this.femaleResource = translateService.translate(sexResourceKey.Female);
        this.otherSexResource = translateService.translate(sexResourceKey.Other);
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
