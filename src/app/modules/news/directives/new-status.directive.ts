import { Directive, ElementRef, Input, OnChanges, AfterViewInit } from '@angular/core';
import { NewsStatusType } from '../../../shared/enums/news-type.enum';
import { TranslateService } from '../../../shared/services/translate.service';
import { NewMessageConst } from '../constant/message.const';
declare let $: any;

@Directive({
  selector: '[appNewStatus]'
})
export class NewStatusDirective implements OnChanges, AfterViewInit {

  @Input() status: NewsStatusType;
    host: any;
    publicText: string;
    newText: string;
    deactivedText: string;

    constructor(el: ElementRef,
        private translateService: TranslateService) {
        this.host = el.nativeElement;
        this.publicText = this.translateService.translate(NewMessageConst.PublicStatus);
        this.newText = this.translateService.translate(NewMessageConst.NewStatus);
        this.deactivedText = this.translateService.translate(NewMessageConst.DeactivedStatus);
    }

    ngOnChanges() {
        this.createStatusCtrl();
    }

    ngAfterViewInit() {
        this.createStatusCtrl();
    }

    private createStatusCtrl() {
        switch (this.status) {
            case NewsStatusType.New:
                $(this.host).html(`<label class="badge badge-info">${this.newText}</label>`);
                break;
            case NewsStatusType.Published:
                $(this.host).html(`<label class="badge badge-success">${this.publicText}</label>`);
                break;
            case NewsStatusType.Deactived:
                $(this.host).html(`<label class="badge badge-danger">${this.deactivedText}</label>`);
                break;
        }
    }
}
