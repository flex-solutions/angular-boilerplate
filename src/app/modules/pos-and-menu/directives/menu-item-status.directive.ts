import { Input, Directive, OnChanges, AfterViewInit, ElementRef } from '@angular/core';
import { MenuItemStatus } from '../../../shared/models/menu.model';

declare let $: any;

@Directive({ selector: '[appMenuItemStatus]' })

export class MenuItemStatusDirective implements OnChanges, AfterViewInit {
    @Input('appMenuItemStatus') status: string;
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
        switch (this.status) {
            case MenuItemStatus[MenuItemStatus.ACTIVE]:
                $(this.host).html(`<i class="mdi mdi-emoticon-happy green-color"></i><i class="mdi mdi-heart green-color"></i>`);
                break;
            case MenuItemStatus[MenuItemStatus.DEACTIVE]:
                $(this.host).html(`<i class="mdi mdi-emoticon-sad red-color"></i><i class="mdi mdi-heart-broken red-color"></i>`);
                break;
        }
    }
}
