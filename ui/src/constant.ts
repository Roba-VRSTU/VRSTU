/**
 * ログーバル定数クラス
 */
export class Constant {
  /** サポートする言語リスト */
  static readonly LANG: string[] = ['ja', 'zh']

  // --------------------------------------------------------------------------
  // ルーター　URL 情報
  // --------------------------------------------------------------------------
  /** ルート */
  static readonly ROUTER_ROOT_URL: string = ''
  /** Blog 投稿一覧 */
  static readonly ROUTER_BLOG_LIST_URL: string = 'blog'
  /** Blog 投稿詳細 */
  static readonly ROUTER_BLOG_BLOG_URL: string = 'blog/post/:id'
}
