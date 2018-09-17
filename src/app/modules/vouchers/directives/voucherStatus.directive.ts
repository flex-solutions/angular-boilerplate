import { VoucherMessageConst } from './../vouchers.constants';
import { VoucherStatus } from './../../../shared/models/voucher.model';
import { Directive, ElementRef, Input, OnChanges, AfterViewInit } from '@angular/core';
import { TranslateService } from '../../../shared/services/translate.service';
declare let $: any;

@Directive({
  selector: '[appVoucherStatus]'
})
export class VoucherStatusDirective implements OnChanges, AfterViewInit {

  @Input() status: VoucherStatus;
    host: any;
    runningText: string;
    expiredText: string;

    constructor(el: ElementRef,
        private translateService: TranslateService) {
        this.host = el.nativeElement;
        this.runningText = this.translateService.translate(VoucherMessageConst.RunningStatus);
        this.expiredText = this.translateService.translate(VoucherMessageConst.ExpiredStatus);
    }

    ngOnChanges() {
        this.createStatusCtrl();
    }

    ngAfterViewInit() {
        this.createStatusCtrl();
    }

    private createStatusCtrl() {
        switch (this.status) {
            case VoucherStatus.running:
                $(this.host).html(`<label class="badge badge-info">${this.runningText}</label>`);
                break;
            case VoucherStatus.expired:
                $(this.host).html(`<label class="badge badge-danger">${this.expiredText}</label>`);
                break;
        }
    }
}
