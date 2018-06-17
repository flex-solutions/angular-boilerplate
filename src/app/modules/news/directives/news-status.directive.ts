import { Directive, Input, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { NewsStatusType } from '../../../shared/enums/news-type.enum';
declare let $: any;

@Directive({
  selector: '[appNewsStatus]'
})
export class NewsStatusDirective implements OnChanges, AfterViewInit {
  @Input() status: NewsStatusType;
  constructor(private ef: ElementRef) {}

  ngAfterViewInit(): void {
    this.renderStatus();
  }

  ngOnChanges(): void {
    this.renderStatus();
  }

  private renderStatus() {
    switch (this.status) {
      case NewsStatusType.New:
        $(this.ef.nativeElement).html(
          '<span class="badge badge-info badge-lg mb-2" i18n="@@news_management-news_details-news_new_status">New</span>'
        );
        break;
      case NewsStatusType.Published:
        $(this.ef.nativeElement).html(
          '<span class="badge badge-success badge-lg mb-2" i18n="@@news_management-news_details-news_published_status">Published</span>'
        );
        break;
      case NewsStatusType.Deactivated:
        $(this.ef.nativeElement).html(
          '<span class="badge badge-danger badge-lg mb-2" i18n="@@news_management-news_details-news_deactivated_status">Deactivated</span>'
        );
        break;
      default:
        $(this.ef.nativeElement).html('');
        break;
    }
  }
}
