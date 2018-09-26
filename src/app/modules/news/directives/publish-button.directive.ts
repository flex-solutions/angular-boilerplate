import { Directive, ElementRef, Input, OnChanges, AfterViewInit } from '@angular/core';
import { NewsStatusType } from '../../../shared/enums/news-type.enum';
import { TranslateService } from '../../../shared/services/translate.service';
import { NewMessageConst } from '../constants/message.const';
declare let $: any;

@Directive({
    selector: '[appPublishButton]'
})
export class PublishButtonDirective implements OnChanges, AfterViewInit {

    @Input() status: NewsStatusType;
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
            case NewsStatusType.Published:
                {
                    this.text = this.translateService.translate(NewMessageConst.UnpublishNews);
                    $(this.host).html(`<i class="mdi mdi-eye-off btn-pink" aria-hidden="false"></i>
                     <span i18n="@@list-news-btn-publish">${this.text}</span>`);
                }
                break;
            default:
                {
                    this.text = this.translateService.translate(NewMessageConst.PublicStatus);
                    $(this.host).html(`<i class="mdi mdi-eye text-primary" aria-hidden="false"></i>
                     <span i18n="@@list-news-btn-publish">${this.text}</span>`);
                }
                break;
        }
    }
}
