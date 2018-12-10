import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  AfterViewInit
} from '@angular/core';
import * as base64 from 'base-64';
declare let $: any;

@Directive({
  selector: '[appImgBinary]'
})
export class ImgBinaryDirective implements OnChanges, AfterViewInit {

  @Input() data: any;
  host: any;

  constructor(el: ElementRef) {
    this.host = el.nativeElement;
  }

  ngOnChanges() {
    this.showData();
  }

  ngAfterViewInit() {
    this.showData();
  }

  private showData() {
      const base64Data = base64.decode(this.data);
      this.host.src = base64Data;
  }
}
