import { Directive, ElementRef, AfterViewInit } from '@angular/core';

declare let $: any;

@Directive({
  selector: '[appInputNumber]'
})
export class InputNumberDirective implements AfterViewInit {
  host: any;

  constructor(el: ElementRef) {
    this.host = el.nativeElement;
  }

  ngAfterViewInit() {
    $(this.host).bind({
      keydown: function(e) {
        if (e.shiftKey === true) {
          if (e.which === 9) {
            return true;
          }
          return false;
        }
        if (e.which > 57) {
          return false;
        }
        if (e.which === 32) {
          return false;
        }
        return true;
      }
    });
  }
}
