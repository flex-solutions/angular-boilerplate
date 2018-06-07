import {
  Directive,
  HostListener,
  ElementRef,
  Input,
  AfterViewInit
} from '@angular/core';
import { DialogCache } from '../dialog-cache';

@Directive({
  selector: '[appModalDraggable]'
})
export class DraggableDirective implements AfterViewInit {
  startX = 0;
  startY = 0;
  md: boolean;

  constructor(public element: ElementRef) {}

  @Input() draggable: boolean;

  ngAfterViewInit() {
    setTimeout(() => {
      // Set CSS.
      if (this.draggable) {
        this.element.nativeElement.style.position = 'relative';
        this.element.nativeElement.style.cursor = 'move';
      }
    }, 10);
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.button === 2) { return; } // Prevents right click drag or remove this if you don't want it.
    if (this.draggable) {
      this.md = true;
      this.startY =
        event.clientY - this.element.nativeElement.style.top.replace('px', '');
      this.startX =
        event.clientX - this.element.nativeElement.style.left.replace('px', '');
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.md && this.draggable && !DialogCache.noDrag) {
      // DialogCache.noDrag for mouse on input elements.
      // Disable element/text selection.
      window.getSelection().removeAllRanges();

      this.element.nativeElement.style.top = event.clientY - this.startY + 'px';
      this.element.nativeElement.style.left =
        event.clientX - this.startX + 'px';
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(event: MouseEvent) {
    this.md = false;
  }
}
