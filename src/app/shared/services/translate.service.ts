import { StringExtension } from './../../utilities/string.extension';
import { Injectable, TRANSLATIONS, Inject, LOCALE_ID } from '@angular/core';
import { Xliff } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TranslateService {
  private _source: string;
  private _translations: any;
  private _locale: string;

  constructor(
    @Inject(TRANSLATIONS) source: string,
    @Inject(LOCALE_ID) localeId
  ) {
    const xliff = new Xliff();
    this._source = source;
    this._translations = xliff.load(this._source, '');
    this._locale = localeId;
  }

  translate(resourceKey: string, ...params) {
    try {
      const translation = this._translations.i18nNodesByMsgId[resourceKey];
      const textNode = translation[0];

      // If have resouce value
      const msg = textNode.value;
      if (msg && params) {
        return StringExtension.format(msg, params);
      } else {
        return msg;
      }
    } catch {
      return resourceKey;
    }
  }

  get currentLocale() {
    return this._locale;
  }
}
