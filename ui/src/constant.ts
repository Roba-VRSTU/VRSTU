/**
 * ログーバル定数クラス
 */
export class Constant {
  /** サポートする言語リスト */
  static readonly LANG: string[] = ['ja', 'zh']

  /** API 通信ヘッダー情報 */
  static readonly HTTP_HEADER: any = {
    'Content-Type': 'application/json',
    // 'X-CSRF-TOKEN': '',
    // Authorization: '',
  }
  /** 通信失敗時のリトライ回数 */
  static readonly RETRY_TIMES: number = 0
  /** 通信デバウンス時間（単位：ミリ秒） */
  static readonly DEBOUNCE_TIME: number = 500
  /** 日時フォーマット */
  static readonly DATETIME_FORMAT: string = 'yyyy.MM.dd'

  // --------------------------------------------------------------------------
  // ルーター　URL 情報
  // --------------------------------------------------------------------------
  /** ルート */
  static readonly ROUTER_ROOT_URL: string = ''
  /** Blog 投稿一覧 */
  static readonly ROUTER_BLOG_LIST_URL: string = 'blog'
  /** Blog 投稿詳細 */
  static readonly ROUTER_BLOG_POST_URL: string = 'blog/post'
}
