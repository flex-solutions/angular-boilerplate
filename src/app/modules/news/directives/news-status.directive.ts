import { Directive, Input, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { NewsStatusType } from '../../../shared/enums/news-type.enum';
import { TranslateService } from '../../../shared/services/translate.service';
import { NewsStatusMessage } from '../constants/news.constant';
declare let $: any;

@Directive({
  selector: '[appNewsStatus]'
})
export class NewsStatusDirective implements OnChanges, AfterViewInit {
  @Input() status: NewsStatusType;
  constructor(private ef: ElementRef, private translateService: TranslateService) {}

  ngAfterViewInit(): void {
    this.renderStatus();
  }

  ngOnChanges(): void {
    this.renderStatus();
  }

  private renderStatus() {
    let msg = '';
    switch (this.status) {
      case NewsStatusType.New:
      msg = this.translateService.translate(NewsStatusMessage.New);
        $(this.ef.nativeElement).html(
          `<span class="badge badge-info badge-lg mb-2">${msg}</span>`
        );
        break;
      case NewsStatusType.Published:
      msg = this.translateService.translate(NewsStatusMessage.Published);
        $(this.ef.nativeElement).html(
          `<span class="badge badge-success badge-lg mb-2">${msg}</span>`
        );
        break;
      case NewsStatusType.Deactivated:
      msg = this.translateService.translate(NewsStatusMessage.Deactivated);
        $(this.ef.nativeElement).html(
          `<span class="badge badge-danger badge-lg mb-2">${msg}</span>`
        );
        break;
      default:
        $(this.ef.nativeElement).html('');
        break;
    }
  }
}
