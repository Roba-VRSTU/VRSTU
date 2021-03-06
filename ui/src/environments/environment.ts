// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  /** プロダクションモード */
  production: false,
  /** サイト名 */
  siteTitle: 'VRSTU',
  /** サイト名補足情報 */
  siteDescription: 'we are students',
  /** デフォルト言語 */
  defaultLang: 'ja',
  /** コピーライト */
  copyright: '2016 vrstu.net . ',
  /** 作成者氏名 */
  poweredBy: 'Roba',
  /** 作成者メール */
  mailTo: 'roba.vrstu@gmail.com',
  /** API の URL */
  apiUrl: 'http://localhost:8000/api',
  /** 言語パッケージのベース URL */
  i18nBaseUrl: '',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
