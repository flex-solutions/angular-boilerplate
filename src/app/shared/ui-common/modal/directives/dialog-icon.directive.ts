import {
  Directive,
  Input,
  ElementRef,
  Renderer,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[appModalIcon]'
})
export class DialogIconDirective implements AfterViewInit {
  constructor(private element: ElementRef, private renderer: Renderer) {}

  @Input() modalIcon: string;

  ngAfterViewInit() {
    setTimeout(() => {
      let cssClass = '';
      switch (this.modalIcon) {
        case 'info':
          cssClass = 'dialog-icon-info';
          break;
        case 'warning':
          cssClass = 'dialog-icon-warning';
          break;
        case 'error':
          cssClass = 'dialog-icon-error';
          break;
        case 'question':
          cssClass = 'dialog-icon-question';
          break;
        default:
          break;
      }
      if (cssClass !== '') {
        this.renderer.setElementClass(
          this.element.nativeElement,
          cssClass,
          true
        );
      }
    }, 100);
  }
}
