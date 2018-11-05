// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // host: 'http://localhost:3000',
  host: 'http://209.97.160.16:3000',
  INVISIBLE_RECAPTCHA_SITEKEY: '6LdiA10UAAAAALuxIB1bCFAYJmNtr1ezF-muzAQF',
  VERSION: require('../../package.json').version
};
