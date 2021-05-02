import { Component, OnInit } from '@angular/core'

import { Constant } from 'src/constant'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  readonly cst: any = Constant
  isNavCollapsed: any = true

  constructor() {}

  ngOnInit(): void {}
}
