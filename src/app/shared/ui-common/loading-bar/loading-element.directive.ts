import { TranslateService } from './../../services/translate.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Directive, Inject, OnDestroy, ElementRef, Input, OnChanges } from '@angular/core';
import { INJECT_TOKEN } from '../const';
import { LoaderService } from './loader.service';
import { LoaderState } from './loader.interface';
import { Subscription } from 'rxjs';
declare let $: any;

@Directive({ selector: '[appLoadingElement]' })
export class LoadingElementDirective implements OnDestroy, OnChanges, AfterViewInit {

  @Input() showBusy = 'true';
  @Input() content: string;
  private _content: string;
  private loading = false;
  private subscription: Subscription;
  private host: any;

  constructor(@Inject(INJECT_TOKEN.LOADING_INDICATOR) private loaderService: LoaderService,
  private translator: TranslateService,
  el: ElementRef) {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.loading = state.show;
      this.setState();
    });
    this.host = el.nativeElement;
  }

  ngOnChanges() {
    this.setState();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.setState();
  }

  get elementContent() {
    if (this.content.trim() === '') {
      this._content = $(this.host).text();
    } else {
      if (this._content === '' || this._content === undefined || this._content === null) {
        this._content = this.translator.translate(this.content);
      }
    }

    return this._content;
  }

  setState() {
    if (this.loading === true) {
      $(this.host).attr('disabled', '');
      if (this.showBusy === 'true') {
        $(this.host).html('');
        $(this.host).html(`<div class="sk-circle">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
      </div>`);
      }
    } else {
      $(this.host).removeAttr('disabled');
      if (this.showBusy === 'true') {
        $(this.host).html(this.elementContent);
      }
    }
  }
}
