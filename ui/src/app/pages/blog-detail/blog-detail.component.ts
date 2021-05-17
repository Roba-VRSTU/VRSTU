import { Component, OnInit } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'

import { HttpTransferService } from 'src/app/services/http-transfer.service'
import { Constant } from 'src/constant'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.less'],
})
export class BlogDetailComponent implements OnInit {
  /** グローバル定数 */
  readonly cst: any = Constant
  /** 投稿 */
  post: any = null

  constructor(
    private route: ActivatedRoute,
    private ttls: Title,
    private mts: Meta,
    private tfs: HttpTransferService
  ) {}

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.route.paramMap.subscribe((params) => {
      const url = '/blog/post/' + params.get('id')
      // tslint:disable-next-line: deprecation
      this.tfs.getData(url).subscribe((data: any) => {
        this.post = data[0]
        this.ttls.setTitle(`${this.post.fields.title} | ${environment.siteTitle}`)
        this.mts.updateTag({ name: 'keywords', content: this.post.fields.keywords })
        this.mts.updateTag({ name: 'description', content: this.post.fields.description })
        console.log(this.post)
      })
    })
  }
}
