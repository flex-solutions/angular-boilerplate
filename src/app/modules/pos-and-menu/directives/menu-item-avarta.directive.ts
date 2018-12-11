import {
  Input,
  Directive,
  OnChanges,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { MenuItemStatus } from '../../../shared/models/menu.model';
import { getBase64 } from '../../../utilities/convert-image-to-base64';
import { isNullOrEmptyOrUndefined } from '../../../utilities/util';

declare let $: any;

@Directive({ selector: '[appMenuItemAvarta]' })
export class MenuItemAvartaDirective implements OnChanges, AfterViewInit {
  @Input('appMenuItemAvarta') avarta: string;
  host: any;
  defaultImage: any;

  constructor(el: ElementRef) {
    this.host = el.nativeElement;
  }

  ngOnChanges() {
    this.createAvartaCtrl();
  }

  ngAfterViewInit() {
    this.createAvartaCtrl();
  }

  private createAvartaCtrl() {
    console.log(this.avarta);
    if (isNullOrEmptyOrUndefined(this.avarta)) {
      getBase64('assets/images/defaultavatar.png').then(data => {
        $(this.host).html(
          `<img src="${data.toString()}" class="rounded" alt="image" style="width: 92px !important;height: 92px !important;">`
        );
      });
    } else {
      $(this.host).html(
        `<img src="${this.avarta}" class="rounded" alt="image" style="width: 92px !important;height: 92px !important;">`
      );
    }
  }
}
