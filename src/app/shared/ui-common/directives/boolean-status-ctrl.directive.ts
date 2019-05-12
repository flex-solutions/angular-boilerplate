import { Directive, Input, ElementRef, OnChanges, AfterViewInit } from '@angular/core';

declare let $: any;

@Directive({
  selector: '[appBooleanStatusCtrl]',
})
export class BooleanStatusCtrlDirective implements OnChanges, AfterViewInit {

  @Input() status: boolean;
  @Input() trueLabel: string;
  @Input() falseLabel: string;
  @Input() isInvert: boolean;

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

  createStatusCtrl(): void {
    if (this.status) {
      if (this.isInvert) {
        $(this.host).html('<span class="label bg-red">' + this.trueLabel + '</span>');
      } else {
        $(this.host).html('<span class="label bg-green">' + this.trueLabel + '</span>');
      }
    } else {
      if (this.isInvert) {
        $(this.host).html('<span class="label bg-green">' + this.falseLabel + '</span>');
      } else {
        $(this.host).html('<span class="label bg-red">' + this.falseLabel + '</span>');
      }
    }
  }
}


