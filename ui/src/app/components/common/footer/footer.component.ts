import { Component, OnInit } from '@angular/core'
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap'
import { TranslateService } from '@ngx-translate/core'

import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
})
export class FooterComponent implements OnInit {
  /** 環境設定 */
  readonly env: any = environment

  /**
   * コンストラクター
   *
   * @param dropDownConf ng-bootstrap ドロップダウン設定
   * @param translate 翻訳サービス
   */
  constructor(private dropDownConf: NgbDropdownConfig, public translate: TranslateService) {
    this.dropDownConf.placement = 'top-right'
  }

  ngOnInit(): void {}

  /**
   * 言語切り替え
   *
   * @param lang 切り替えたい言語コード
   */
  onSwitchLang(lang: string): void {
    this.translate.use(lang)
  }
}
