import { StringExtension } from './../../utilities/string.extension';
import { Injectable, TRANSLATIONS, Inject } from '@angular/core';
import { Xliff } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TranslateService {
  private _source: string;
  private _translations: any;

  constructor(@Inject(TRANSLATIONS) source: string) {
    const xliff = new Xliff();
    // this._source = source;
    // this._translations = xliff.load(this._source, '');
  }

  translate(resourceKey: string) {
    try {
      const translation = this._translations.i18nNodesByMsgId[resourceKey];
      const textNode = translation[0];

      // If have resouce value
      return textNode.value;
    } catch {
      return resourceKey;
    }
  }

  translateWithParams(resourceKey: string, params) {
    const value = this.translate(resourceKey);
    return StringExtension.format(value, params);
  }
}
