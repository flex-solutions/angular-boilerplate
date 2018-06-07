import {
  Directive,
  HostListener,
  ElementRef,
  Renderer,
  Input,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfig } from '../dialog-config';

@Directive({
  selector: '[appModalVerticalCenter]'
})
export class VerticalCenterDirective implements OnInit {
  constructor(public element: ElementRef, public renderer: Renderer) {}

  dialogPaddingTop = 0;

  ngOnInit() {
    this.SetCenter(undefined, true);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.SetCenter(event);
  }

  SetCenter(event?: any, isInit?: boolean) {
    const eventTarget = event === undefined ? window : event.target;
    const wh = eventTarget.innerHeight;
    const sy = eventTarget.scrollY; // Top invisible height when scroll down.
    const ch = this.element.nativeElement.offsetHeight - this.dialogPaddingTop; // Dialog visible height

    // IE doesn't support scrollY but it automatically scrolls back to the top 0 position.
    // The scrollY needs to be added for Google Chrome, Firefox, and Microsoft Edge.
    let paddingTopValue =
      (wh - ch) / 2 + (sy === undefined ? 0 : sy) - DialogConfig.topOffset;

    if (paddingTopValue < 0) {
      paddingTopValue = 0;
    }

    // Cache dialogPaddingTop value for use in next resize.
    this.dialogPaddingTop = paddingTopValue;

    if (isInit) {
      paddingTopValue = paddingTopValue - DialogConfig.topOffset / 1.5;
    }

    this.renderer.setElementStyle(
      this.element.nativeElement,
      'padding-top',
      paddingTopValue + 'px'
    );

    this.renderer.setElementStyle(
      this.element.nativeElement,
      'margin-right',
      'auto'
    );
    this.renderer.setElementStyle(
      this.element.nativeElement,
      'margin-left',
      'auto'
    );
  }
}
