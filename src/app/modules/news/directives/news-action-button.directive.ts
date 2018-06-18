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
import { TranslateService } from '../../../shared/services/translate.service';
import { NewsStatusMessage, NewsActionButtonText } from '../constants/news.constant';
declare let $: any;

@Directive({
  selector: '[appNewsActionButton]'
})
export class NewsActionButtonDirective implements OnChanges, AfterViewInit {
  @Input() status: NewsStatusType;

  @HostBinding('class')
  elementClass = 'btn btn-success btn-md';

  constructor(private ef: ElementRef, private translateService: TranslateService) {}

  ngAfterViewInit(): void {
    this.renderButton();
  }

  ngOnChanges(): void {
    this.renderButton();
  }

  private renderButton() {
    let msg = '';
    switch (this.status) {
      case NewsStatusType.New:
      case NewsStatusType.Deactivated:
      msg = this.translateService.translate(NewsActionButtonText.Publish);
      this.elementClass = 'btn btn-success btn-md';
        $(this.ef.nativeElement)
          .html(`<i class="mdi mdi-eye"></i><span>${msg || 'Publish'}</span>`);
        break;
      case NewsStatusType.Published:
      msg = this.translateService.translate(NewsActionButtonText.Deactivate);
      this.elementClass = 'btn btn-danger btn-md';
        $(this.ef.nativeElement)
          .html(`<i class="mdi mdi-eye-off"></i><span>${msg || 'Deactivate'}</span>`);
        break;
      default:
        break;
    }
  }
}
