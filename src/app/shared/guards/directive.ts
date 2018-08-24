import { OnInit } from '@angular/core/src/core';
import { Directive, ViewContainerRef, ElementRef } from '@angular/core';

@Directive({ selector: '[appCanUpdate]' })
export class CanUpdateDirective implements OnInit {
   constructor(private el: ElementRef) {
  }

  ngOnInit() {
      const component = (<any>this.el)._element.component;
 }
}
