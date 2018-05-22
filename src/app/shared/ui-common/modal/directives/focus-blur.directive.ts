import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appModalFocusBlur]'
})
export class FocusBlurDirective implements AfterViewInit {
  constructor(private element: ElementRef) {}

  @Input() focusBlurOpt = 'focus';

  ngAfterViewInit() {
    const pThis: any = this;
    setTimeout(() => {
      if (pThis.option === 'focus' || pThis.option === 'focus_blur') {
        pThis.element.nativeElement.focus();
      }
      if (pThis.option === 'blur' || pThis.option === 'focus_blur') {
        pThis.element.nativeElement.blur();
      }
    }, 10);
  }
}
