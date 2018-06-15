import {
  Directive,
  Input,
  HostListener,
  AfterViewInit,
  OnChanges,
  ElementRef,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';
import { NewsStatusType } from '../../../shared/enums/news-type.enum';
declare let $: any;

@Directive({
  selector: '[appNewsActionButton]'
})
export class NewsActionButtonDirective implements OnChanges, AfterViewInit {
  @Input() status: NewsStatusType;

  @HostBinding('class')
  elementClass = 'btn btn-success btn-md';

  constructor(private ef: ElementRef) {}

  ngAfterViewInit(): void {
    this.renderButton();
  }

  ngOnChanges(): void {
    this.renderButton();
  }

  private renderButton() {
    switch (this.status) {
      case NewsStatusType.New:
      case NewsStatusType.Deactivated:
      this.elementClass = 'btn btn-success btn-md';
        $(this.ef.nativeElement)
          .html(`<i class="mdi mdi-eye"></i><span>Publish</span>`);
        break;
      case NewsStatusType.Published:
      this.elementClass = 'btn btn-danger btn-md';
        $(this.ef.nativeElement)
          .html(`<i class="mdi mdi-eye-off"></i><span>Deactivate</span>`);
        break;
      default:
        break;
    }
  }
}
