import { Input, Directive, OnChanges, AfterViewInit, ElementRef } from '@angular/core';

declare let $: any;

@Directive({ selector: '[appMenuItemExchangePoint]' })

export class MenuItemExchangePointDirective implements OnChanges, AfterViewInit {
    @Input('appMenuItemExchangePoint') isEchangePoint: boolean;
    host: any;

    constructor(el: ElementRef) {
        this.host = el.nativeElement;
    }

    ngOnChanges() {
        this.createStatusCtrl();
    }

    ngAfterViewInit() {
        this.createStatusCtrl();
    }

    private createStatusCtrl() {
        const icon = this.isEchangePoint ? '<i class="mdi mdi-heart text-success"></i>'
         : '<i class="mdi mdi-heart-broken text-danger"></i>';
         $(this.host).html(icon);
    }
}
