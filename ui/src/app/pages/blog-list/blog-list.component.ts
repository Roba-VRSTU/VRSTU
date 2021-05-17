import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'

import { HttpTransferService } from 'src/app/services/http-transfer.service'
import { Constant } from 'src/constant'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.less'],
})
export class BlogListComponent implements OnInit {
  /** グローバル定数 */
  readonly cst: any = Constant
  /** 環境設定 */
  readonly env: any = environment
  /** 投稿一覧 */
  posts: any = null

  constructor(private ttls: Title, private tsls: TranslateService, private tfs: HttpTransferService) {}

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.tfs.getData('/blog/posts/').subscribe((data: any) => {
      this.posts = data
      const blogTitle = this.tsls.instant('nav.blog')
      this.ttls.setTitle(`${blogTitle} | ${environment.siteTitle}`)
      console.log(this.posts)
    })
  }
}
