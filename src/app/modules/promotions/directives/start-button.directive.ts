import { Directive, ElementRef, Input, OnChanges, AfterViewInit } from '@angular/core';
import { TranslateService } from '../../../shared/services/translate.service';
import { PromotionStatus } from './promotion-status.directive';
import { MessageConstant } from '../messages';
declare let $: any;

@Directive({
    selector: '[appStartButton]'
})
export class StartButtonDirective implements OnChanges, AfterViewInit {

    @Input() status: PromotionStatus;
    host: any;
    text: string;

    constructor(el: ElementRef,
        private translateService: TranslateService) {
        this.host = el.nativeElement;
    }

    ngOnChanges() {
        this.createStatusCtrl();
    }

    ngAfterViewInit() {
        this.createStatusCtrl();
    }

    private createStatusCtrl() {
        switch (this.status) {
            case PromotionStatus.Active:
                {
                    this.text = this.translateService.translate(MessageConstant.StopButton);
                    $(this.host).html(`<i class="mdi mdi-eye-off btn-pink" aria-hidden="false"></i>
                     <span i18n="@@list-news-btn-publish">${this.text}</span>`);
                }
                break;
            default:
                {
                    this.text = this.translateService.translate(MessageConstant.StartButton);
                    $(this.host).html(`<i class="mdi mdi-eye text-primary" aria-hidden="false"></i>
                     <span i18n="@@list-news-btn-publish">${this.text}</span>`);
                }
                break;
        }
    }
}
