import { Input, Directive, OnChanges, AfterViewInit, ElementRef } from '@angular/core';
import { MenuItemStatus } from '../../../shared/models/menu.model';
import { getBase64 } from '../../../utilities/convert-image-to-base64';
import { isNullOrEmptyOrUndefined } from '../../../utilities/util';

declare let $: any;

@Directive({ selector: '[appMenuItemAvatar]' })
export class MenuItemAvatarDirective implements OnChanges, AfterViewInit {
    @Input('appMenuItemAvatar') avatar: string;
    host: any;
    defaultImage: any;

    constructor(el: ElementRef) {
        this.host = el.nativeElement;
    }

    ngOnChanges() {
        this.createAvatarCtrl();
    }

    ngAfterViewInit() {
        this.createAvatarCtrl();
    }

    private createAvatarCtrl() {
        if (isNullOrEmptyOrUndefined(this.avatar)) {
            getBase64('assets/images/menu-default-avatar.png').then(data => {
                $(this.host).html(
                    `<img src="${data.toString()}" class="rounded" alt="image" style="width: 125px !important;height: 125px !important;">`
                );
            });
        } else {
            $(this.host).html(
                `<img src="${this.avatar}" class="rounded" alt="image" style="width: 92px !important;height: 92px !important;">`
            );
        }
    }
}
