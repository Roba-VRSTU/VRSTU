import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core'
import { OneMaxSolution } from 'src/app/models/onemax/onemax-solution.model'

import { Constant } from 'src/constant'

@Component({
  selector: 'app-onemax-fs',
  templateUrl: './onemax-fs.component.html',
  styleUrls: ['./onemax-fs.component.less'],
})
export class OnemaxFsComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  /** 初期化時間（単位：秒） */
  readonly initTime: number = 4
  /** 円グラフの数 */
  pointSize: number = 0
  /** 表示用解 */
  solutionEle: any[] = []
  /** 最適解 */
  bestSolution!: OneMaxSolution
  /** 解 */
  solution!: OneMaxSolution
  /** タイマー */
  intervalTimer: any = null
  /** 評価回数 */
  evalTimes: number = 0
  /** */
  initFlg: boolean = true

  @ViewChild('fsSide') fsSide: any

  /** 表示用の円グラフのサイズ（単位：ピクセル） */
  @Input()
  pointEleSize: number = 40
  /** 円グラフの行数 */
  @Input()
  pointRow: number = 5
  /**  */
  @Input()
  execFlg: boolean = false
  @Output()
  updateInfo: EventEmitter<any> = new EventEmitter<any>()

  /**
   * コンストラクター
   *
   * @param renderer レンダー
   */
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.initFlg) {
      this.initFlg = !this.initFlg
      this.initFS()
    }
  }

  ngAfterViewChecked(): void {
    if (this.execFlg) {
      this.execFlg = !this.execFlg
      setTimeout(() => {
        this.execFS()
      }, 100)
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalTimer)
  }

  initFS(): void {
    // 円グラフの数を算出する．
    this.pointSize = Math.floor(this.fsSide.nativeElement.offsetWidth / this.pointEleSize) * this.pointRow
    // 最適解を初期化する．
    this.bestSolution = this.createFirstSolution()
    // 画面に表示される．
    this.initVisualization()
    setTimeout(() => {
      this.emitInfo({ status: Constant.INIT_COMPLETED, size: this.pointSize })
    }, this.initTime * 1000)
  }

  execFS(): void {
    this.solution = this.createFirstSolution()
    this.updateEvalTimes(1)
    this.intervalTimer = setInterval(() => {
      for (let i = 0; i < this.solution.sequence.length; i++) {
        this.solution.fitness = 0
        if (this.solution.sequence[i] === 0) {
          this.solution.sequence[i] = 1
          break
        } else {
          this.solution.sequence[i] = 0
        }
      }
      this.solution.sequence.forEach((v: number) => (this.solution.fitness += v))
      this.updateEvalTimes(1)
      if (this.solution.fitness > this.bestSolution.fitness) {
        this.bestSolution = this.copySolution(this.solution)
        this.emitInfo({ bestFitness: this.bestSolution.fitness })
        this.updateVisualization()
      }
      // 処理終了
      if (this.bestSolution.fitness === this.pointSize) {
        this.emitInfo({ status: Constant.EXEC_COMPLETED })
        clearInterval(this.intervalTimer)
      }
    }, 11)
  }

  createFirstSolution(): OneMaxSolution {
    const solution: OneMaxSolution = {
      fitness: 0,
      sequence: new Array(this.pointSize).fill(0),
    }

    return solution
  }

  /**
   * 表示用の個体オブジェクトを生成する．
   */
  private initVisualization(): void {
    this.bestSolution.sequence.forEach((gene: number) => {
      const sequenceEle = this.renderer.createElement('span')
      this.renderer.addClass(sequenceEle, 'sequence')
      this.renderer.addClass(sequenceEle, 'sequence-zoom-in-anim')
      const delayTimeStr: string = (Math.random() * 3).toString().slice(0, this.initTime)
      this.renderer.setStyle(sequenceEle, 'width', this.pointEleSize - 10 + 'px')
      this.renderer.setStyle(sequenceEle, 'height', this.pointEleSize - 10 + 'px')
      this.renderer.setStyle(sequenceEle, 'animation-delay', delayTimeStr + 's')
      this.solutionEle.push(sequenceEle)
      this.renderer.appendChild(this.fsSide.nativeElement, sequenceEle)
    })
  }

  /**
   * 表示を更新する．
   */
  private updateVisualization(): void {
    this.bestSolution.sequence.forEach((val: number, idx: number) => {
      const ele = this.solutionEle[idx]
      if (val === 1) {
        this.renderer.removeStyle(ele, 'animation-delay')
        this.renderer.removeClass(ele, 'sequence-zoom-in-anim')
        this.renderer.removeClass(ele, 'sequence-rotation-anim')
        // this.renderer.addClass(ele, 'active')
        this.renderer.addClass(ele, 'sequence-rotation-reverse-anim')
      } else {
        if (ele.classList.contains('sequence-rotation-reverse-anim')) {
          this.renderer.removeStyle(ele, 'animation-delay')
          this.renderer.removeClass(ele, 'sequence-zoom-in-anim')
          this.renderer.removeClass(ele, 'sequence-rotation-reverse-anim')
          // this.renderer.addClass(ele, 'active')
          this.renderer.addClass(ele, 'sequence-rotation-anim')
        }
      }
    })
  }

  private copySolution(individual: OneMaxSolution): OneMaxSolution {
    const chrome: number[] = []
    individual.sequence.forEach((val: number) => {
      chrome.push(val)
    })

    return {
      fitness: individual.fitness,
      sequence: chrome,
    } as OneMaxSolution
  }

  private emitInfo(info: any): void {
    const type = { type: Constant.ONEMAX_TYPE_FS }
    this.updateInfo.emit({ ...type, ...info })
  }

  private updateEvalTimes(times: number): void {
    this.evalTimes += times
    this.emitInfo({ evalTimes: this.evalTimes })
  }
}
