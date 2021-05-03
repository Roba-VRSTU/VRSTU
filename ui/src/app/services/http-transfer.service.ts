import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { catchError, debounceTime, distinctUntilChanged, retry } from 'rxjs/operators'

import { Constant } from 'src/constant'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class HttpTransferService {
  /** グローバル定数 */
  readonly cst: any = Constant
  /** 環境設定 */
  readonly env: any = environment
  /** HTTP オプション（ヘッダー付き） */
  private httpOptions: any = {
    headers: new HttpHeaders(this.cst.HTTP_HEADER),
    params: null,
    withCredentials: true,
  }

  constructor(private http: HttpClient) {}

  /**
   * エラーハンドル
   *
   * @returns エラー処理 コールバック
   */
  private handleError<T>(): any {
    return (error: HttpErrorResponse): Observable<T> => {
      console.log(error)
      throw error
    }
  }

  /**
   * 通信時の共通処理（リトライ・デバウンス・エラーハンドル）
   *
   * @param ob$ 通信結果 Observable
   * @returns 加工後の通信結果 Observable
   */
  private processPipe(ob$: Observable<object>): Observable<object> {
    return ob$.pipe(
      debounceTime(this.cst.DEBOUNCE_TIME),
      distinctUntilChanged(),
      retry(this.cst.RETRY_TIMES),
      catchError(this.handleError<object>())
    )
  }

  /**
   * HTTP オプションを更新する．
   *
   * ヘッダー情報と HTTP パラメータを更新する．
   *
   * @param params HTTP パラメータ
   */
  private updateHttpOptions(params?: object): void {
    // this.httpOptions.headers = this.httpOptions.headers.set(
    //   'Authorization',
    //   Constant.AUTHORIZATION_TYPE + ' ' + this.cks.get('accessToken')
    // )
    // this.httpOptions.headers = this.httpOptions.headers.set('X-CSRF-TOKEN', this.cks.get(Constant.COOKIE_NAME_CSRF))
    if (params) {
      this.httpOptions.params = params
    } else {
      delete this.httpOptions.params
    }
  }

  /**
   * GET 方式で API と通信する．
   *
   * @param url 通信先の URL
   * @param param パラメータ
   * @returns 通信結果の Observable
   */
  getData(url: string, param?: object): Observable<object> {
    console.log(`connected to ${url} using GET method.`)
    this.updateHttpOptions(param)

    return this.processPipe(this.http.get<object>(this.env.apiUrl + url, this.httpOptions))
  }
}
