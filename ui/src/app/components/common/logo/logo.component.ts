import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'

import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less'],
})
export class LogoComponent implements OnInit, AfterViewInit {
  /** 環境設定 */
  readonly env: any = environment
  /** ロゴキャンバス */
  @ViewChild('logoImgCanvas') logoImgCanvas: any
  /** ロゴ画像の横幅 */
  readonly logoImgWidth: number = 44
  /** ロゴ画像の高さ */
  readonly logoImgHeight: number = 44
  /** ロゴ画像の半径（最短辺を基準に） */
  logoImgRadius: number = 0
  /** 2D レンダリングコンテキスト */
  ctx!: CanvasRenderingContext2D
  /** 自転フラグ */
  rollingFlg: boolean = false
  /** 自転タイマー */
  rollingTimer!: any
  /** 自転回数 */
  rollingTimes: number = 0

  /**
   * コンストラクター
   */
  constructor() {}

  /**
   * ライフサイクル - OnInit
   *
   * 何もしない．
   */
  ngOnInit(): void {}

  /**
   * ライフサイクル - AfterViewInit
   *
   * ロゴ画像を描画する．
   */
  ngAfterViewInit(): void {
    const canvas = this.logoImgCanvas.nativeElement
    // 最短辺を基準に半径を算出
    this.logoImgRadius =
      this.logoImgWidth / 2 < this.logoImgHeight / 2 ? this.logoImgWidth / 2 - 1 : this.logoImgHeight / 2 - 1

    if (!canvas.getContext) {
      // canvas-unsupported code here
    } else {
      this.ctx = canvas.getContext('2d')
      // ロゴ画像の中心へ移動
      this.ctx.translate(this.logoImgWidth / 2, this.logoImgHeight / 2)
      this.ctx.lineCap = 'round'
      this.ctx.lineWidth = 1
      this.draw()
    }
  }

  /**
   * ロゴ画像を描き出す．
   */
  draw(): void {
    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.clearRect(-this.logoImgWidth / 2, -this.logoImgHeight / 2, this.logoImgWidth, this.logoImgHeight)
    this.drawBG()
    this.drawWings()
    const baseAngle = 30
    const angle = Math.PI / baseAngle
    if (this.rollingFlg) {
      if (this.rollingTimes >= baseAngle * 2) {
        console.log(this.rollingTimes)
        clearInterval(this.rollingTimer)
        this.rollingFlg = false
        this.rollingTimes = 0
      } else {
        this.ctx.rotate(-angle)
        this.rollingTimes += 1
      }
    }
  }

  /**
   * 背景を描き出す．
   */
  drawBG(): void {
    const vertexA: number[] = [0, -this.logoImgRadius]
    const vertexB: number[] = [Math.cos(Math.PI / 6) * this.logoImgRadius, -this.logoImgRadius / 2]
    const vertexC: number[] = [Math.cos(Math.PI / 6) * this.logoImgRadius, this.logoImgRadius / 2]
    const vertexD: number[] = [0, +this.logoImgRadius]
    const vertexE: number[] = [-Math.cos(Math.PI / 6) * this.logoImgRadius, this.logoImgRadius / 2]
    const vertexF: number[] = [-Math.cos(Math.PI / 6) * this.logoImgRadius, -this.logoImgRadius / 2]

    this.ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    this.ctx.beginPath()
    this.ctx.moveTo(vertexA[0], vertexA[1])
    this.ctx.lineTo(vertexB[0], vertexB[1])
    this.ctx.lineTo(vertexC[0], vertexC[1])
    this.ctx.lineTo(vertexD[0], vertexD[1])
    this.ctx.lineTo(vertexE[0], vertexE[1])
    this.ctx.lineTo(vertexF[0], vertexF[1])
    this.ctx.lineTo(vertexA[0], vertexA[1])
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.closePath()
  }

  /**
   * ウィングを描き出す．
   */
  drawWings(): void {
    const vertexA: number[] = [0, -this.logoImgRadius]
    const vertexB: number[] = [(Math.tan(Math.PI / 6) * this.logoImgRadius) / 2, -this.logoImgRadius / 2]
    const vertexC: number[] = [0, 0]
    const vertexD: number[] = [-(Math.tan(Math.PI / 6) * this.logoImgRadius) / 2, -this.logoImgRadius / 2]
    const vertexE: number[] = [Math.cos(Math.PI / 6) * this.logoImgRadius, -this.logoImgRadius / 2]
    const vertexF: number[] = [this.logoImgRadius / 2 / Math.cos(Math.PI / 6), 0]

    this.ctx.globalCompositeOperation = 'destination-out'

    // １２時の方向
    this.ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    this.ctx.beginPath()
    this.ctx.moveTo(vertexA[0], vertexA[1])
    this.ctx.lineTo(vertexB[0], vertexB[1])
    this.ctx.lineTo(vertexC[0], vertexC[1])
    this.ctx.lineTo(vertexD[0], vertexD[1])
    this.ctx.lineTo(vertexA[0], vertexA[1])
    this.ctx.fill()
    this.ctx.closePath()
    // ２時の方向
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'
    this.ctx.beginPath()
    this.ctx.moveTo(vertexE[0], vertexE[1])
    this.ctx.lineTo(vertexF[0], vertexF[1])
    this.ctx.lineTo(vertexC[0], vertexC[1])
    this.ctx.lineTo(vertexB[0], vertexB[1])
    this.ctx.lineTo(vertexE[0], vertexE[1])
    this.ctx.fill()
    this.ctx.closePath()
    // ４時の方向
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    this.ctx.beginPath()
    this.ctx.moveTo(vertexE[0], -vertexE[1])
    this.ctx.lineTo(vertexB[0], -vertexB[1])
    this.ctx.lineTo(vertexC[0], vertexC[1])
    this.ctx.lineTo(vertexF[0], vertexF[1])
    this.ctx.lineTo(vertexE[0], -vertexE[1])
    this.ctx.fill()
    this.ctx.closePath()
    // ６時の方向
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    this.ctx.beginPath()
    this.ctx.moveTo(-vertexA[0], -vertexA[1])
    this.ctx.lineTo(-vertexB[0], -vertexB[1])
    this.ctx.lineTo(vertexC[0], vertexC[1])
    this.ctx.lineTo(-vertexD[0], -vertexD[1])
    this.ctx.lineTo(-vertexA[0], -vertexA[1])
    this.ctx.fill()
    this.ctx.closePath()
    // ８時の方向
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
    this.ctx.beginPath()
    this.ctx.moveTo(-vertexE[0], -vertexE[1])
    this.ctx.lineTo(-vertexF[0], vertexF[1])
    this.ctx.lineTo(vertexC[0], vertexC[1])
    this.ctx.lineTo(-vertexB[0], -vertexB[1])
    this.ctx.lineTo(-vertexE[0], -vertexE[1])
    this.ctx.fill()
    this.ctx.closePath()
    // １０時の方向
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.beginPath()
    this.ctx.moveTo(-vertexE[0], vertexE[1])
    this.ctx.lineTo(-vertexB[0], vertexB[1])
    this.ctx.lineTo(vertexC[0], vertexC[1])
    this.ctx.lineTo(-vertexF[0], vertexF[1])
    this.ctx.lineTo(-vertexE[0], vertexE[1])
    this.ctx.fill()
    this.ctx.closePath()

    this.ctx.beginPath()
    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.fillStyle = 'rgba(0, 0, 0, 1)'

    this.ctx.moveTo(vertexB[0], vertexB[1])
    this.ctx.lineTo(vertexC[0], vertexC[1])

    this.ctx.moveTo(vertexF[0], vertexF[1])
    this.ctx.lineTo(vertexC[0], vertexC[1])

    this.ctx.moveTo(vertexB[0], -vertexB[1])
    this.ctx.lineTo(vertexC[0], vertexC[1])

    this.ctx.moveTo(-vertexB[0], -vertexB[1])
    this.ctx.lineTo(vertexC[0], vertexC[1])

    this.ctx.moveTo(-vertexF[0], vertexF[1])
    this.ctx.lineTo(vertexC[0], vertexC[1])

    this.ctx.moveTo(-vertexB[0], vertexB[1])
    this.ctx.lineTo(vertexC[0], vertexC[1])

    this.ctx.stroke()
    this.ctx.closePath()
  }

  /**
   * ロゴ画像を自転させる．
   */
  onRollLogo(): void {
    if (!this.rollingFlg) {
      this.rollingFlg = true
      this.rollingTimer = setInterval(() => {
        this.draw()
      }, 20)
    }
  }
}
