import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateCacheModule, TranslateCacheService, TranslateCacheSettings } from 'ngx-translate-cache'

import { Constant } from 'src/constant'
import { environment } from 'src/environments/environment'

/**
 *
 */
@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: translateCacheFactory,
        deps: [TranslateService, TranslateCacheSettings],
      },
      cacheMechanism: 'Cookie',
    }),
  ],
  exports: [TranslateModule],
})
export class I18nModule {
  /**
   * コンストラクター
   *
   * サポートする全ての言語リストを作成し，初期言語をセットする．
   *
   * @param translate 翻訳サービス
   */
  constructor(private translate: TranslateService, private translateCacheService: TranslateCacheService) {
    this.translateCacheService.init()
    this.translate.addLangs(Constant.LANG)

    let langRegStr = ''
    Constant.LANG.forEach((lang: string) => {
      langRegStr += lang + '|'
    })
    langRegStr = langRegStr.substr(0, langRegStr.length - 1)

    const langRegExp = new RegExp(langRegStr, 'g')
    // TODO: ブラウザーにより言語の自動検知に切り替える
    // const browserLang = translateCacheService.getCachedLanguage() || this.translate.getBrowserLang()
    const browserLang = translateCacheService.getCachedLanguage() || environment.defaultLang

    this.translate.use(browserLang.match(langRegExp) ? browserLang : environment.defaultLang)
  }
}

export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, environment.i18nBaseUrl + '/assets/i18n/', '.json')
}

export function translateCacheFactory(
  translateService: TranslateService,
  translateCacheSettings: TranslateCacheSettings
): TranslateCacheService {
  return new TranslateCacheService(translateService, translateCacheSettings)
}
