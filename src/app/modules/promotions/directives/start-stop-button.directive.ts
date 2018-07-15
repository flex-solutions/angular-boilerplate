import { OnChanges, AfterViewInit, Input, ElementRef, Directive } from '@angular/core';
import { PromotionStatus } from './promotion-status.directive';
import { TranslateService } from '../../../shared/services/translate.service';
import { MessageConstant } from '../messages';
declare let $: any;

export enum ButtonSize {
    Small,
    Normal
}

@Directive({
    selector: '[appStartStopButton]'
})
export class StartStopButtonDirective implements OnChanges, AfterViewInit {

    @Input() status: PromotionStatus;
    @Input() buttonSize: ButtonSize;
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
                    this.createStopButton();
                }
                break;
            default:
                {
                    this.text = this.translateService.translate(MessageConstant.StartButton);
                    this.createStartButton();
                }
                break;
        }
    }

    createStartButton() {
        switch (this.buttonSize) {
            case ButtonSize.Small:
                $(this.host).html(`<i class="mdi mdi-play text-success" aria-hidden="false"></i>
            <span i18n="@@list-news-btn-publish">${this.text}</span>`);
                break;
            case ButtonSize.Normal:
                $(this.host).html(`<button type="button" class="btn btn-success btn-fw m-0">
                    <i class="mdi mdi-play"></i>
                    <span i18n="@@list-news-btn-publish">${this.text}</span></button>`);
                break;
        }

    }
    createStopButton() {
        switch (this.buttonSize) {
            case ButtonSize.Small:
                $(this.host).html(`<i class="mdi mdi-stop text-warning" aria-hidden="false"></i>
            <span i18n="@@list-news-btn-publish">${this.text}</span>`);
                break;
            case ButtonSize.Normal:
            $(this.host).html(`<button type="button" class="btn btn-warning btn-fw m-0">
            <i class="mdi mdi-stop"></i>
            <span i18n="@@list-news-btn-publish">${this.text}</span></button>`);
                break;
        }


    }
}
