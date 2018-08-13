declare function require(path: string);

export function i18nFactory(locale: string) {
  locale = locale || 'vi'; // default to vietnamese if no locale provided

  switch (locale) {
    case 'en':
      return require('raw-loader!../assets/i18n/messages.en.xlf');

    case 'vi':
      return require('raw-loader!../assets/i18n/messages.vi.xlf');
  }
}
