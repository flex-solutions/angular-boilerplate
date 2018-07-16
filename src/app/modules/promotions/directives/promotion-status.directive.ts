import { Directive, ElementRef, Input, OnChanges, AfterViewInit } from '@angular/core';
import { TranslateService } from '../../../shared/services/translate.service';
import { MessageConstant } from '../messages';
declare let $: any;

export enum PromotionStatus {
    New,

    Active,

    Deactivated
}

@Directive({
    selector: '[appPromotionStatus]'
})
export class PromotionStatusDirective implements OnChanges, AfterViewInit {

    @Input() status: PromotionStatus;
    host: any;
    activeText: string;
    newText: string;
    deactivedText: string;

    constructor(el: ElementRef,
        private translateService: TranslateService) {
        this.host = el.nativeElement;
        this.activeText = this.translateService.translate(MessageConstant.ActiveStatus);
        this.newText = this.translateService.translate(MessageConstant.NewStatus);
        this.deactivedText = this.translateService.translate(MessageConstant.DeactivedStatus);
    }

    ngOnChanges() {
        this.createStatusCtrl();
    }

    ngAfterViewInit() {
        this.createStatusCtrl();
    }

    private createStatusCtrl() {
        switch (this.status) {
            case PromotionStatus.New:
                $(this.host).html(`<label class="status-badge badge badge-info">${this.newText}</label>`);
                break;
            case PromotionStatus.Active:
                $(this.host).html(`<label class="status-badge badge badge-success">${this.activeText}</label>`);
                break;
            case PromotionStatus.Deactivated:
                $(this.host).html(`<label class="status-badge badge badge-danger">${this.deactivedText}</label>`);
                break;
        }
    }
}
