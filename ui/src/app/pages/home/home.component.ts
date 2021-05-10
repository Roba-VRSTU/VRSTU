import { Component, OnDestroy, OnInit } from '@angular/core'

import { Constant } from 'src/constant'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit, OnDestroy {
  /** 表示グラフのサイズ（１０以上が必須，単位：ピクセル） */
  readonly pointEleSize: number = 30
  /** 表示グラフの行数 */
  readonly pointRows: number = 5
  /** 実行開始時刻 */
  execStartTime: number = 0
  /** 初期化準備が完了したコンポーネント数 */
  initCompletedNum: number = 0
  /** 実行開始フラグ */
  execStartFlg: boolean = false
  /* ----- GA の各種評価値 ------------------------------------------------------- */
  /** GA 実行時間 */
  execTimeGA: number = 0
  /** GA 探索処理完了フラグ */
  execCompletedGA: boolean = false
  /** GA 初期解適応度 */
  firstFitnessGA: number = 0
  /** GA 最適解適応度 */
  bestFitnessGA: number = 0
  /** GA 評価回数 */
  evalTimesGA: number = 0
  /** GA 数列サイズ */
  sequenceSizeGA: number = 0
  /** GA 世帯数 */
  populationNum: number = 0
  /** GA 突然変異確率 */
  mutationProb: number = 0
  /** GA 突然変異回数 */
  mutationTimes: number = 0
  /* ----- FS の各種評価値 ------------------------------------------------------- */
  /** FS 実行時間 */
  execTimeFS: number = 0
  /** FS 探索処理完了フラグ */
  execCompletedFS: boolean = false
  /** FS 初期解適応度 */
  firstFitnessFS: number = 0
  /** FS 最適解適応度 */
  bestFitnessFS: number = 0
  /** FS 評価回数 */
  evalTimesFS: number = 0
  /** FS 数列サイズ */
  sequenceSizeFS: number = 0
  /** タイマー */
  intervalTimer: any = null

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    clearInterval(this.intervalTimer)
  }

  onUpdateInfo(info: any): void {
    if (info.type === Constant.ONEMAX_TYPE_GA) {
      // console.log(info)
      if (info.status === Constant.INIT_COMPLETED) {
        this.initCompletedNum += 1
        this.sequenceSizeGA = info.size
        this.mutationProb = info.mutationProb
      } else if (info.status === Constant.EXEC_COMPLETED) {
        this.execCompletedGA = !this.execCompletedGA
      } else {
        if ('bestFitness' in info) {
          this.bestFitnessGA = info.bestFitness
        }
        if ('evalTimes' in info) {
          this.evalTimesGA = info.evalTimes
        }
        if ('firstFitness' in info) {
          this.firstFitnessGA = info.firstFitness
        }
        if ('populationNum' in info) {
          this.populationNum = info.populationNum
        }
        if ('mutationTimes' in info) {
          this.mutationTimes = info.mutationTimes
        }
      }
    } else {
      if (info.status === Constant.INIT_COMPLETED) {
        this.initCompletedNum += 1
        this.sequenceSizeFS = info.size
      } else if (info.status === Constant.EXEC_COMPLETED) {
        this.execCompletedFS = !this.execCompletedFS
      } else {
        if ('bestFitness' in info) {
          this.bestFitnessFS = info.bestFitness
        }
        if ('evalTimes' in info) {
          this.evalTimesFS = info.evalTimes
        }
        if ('firstFitness' in info) {
          this.firstFitnessFS = info.firstFitness
        }
      }
    }

    if (this.initCompletedNum === 1) {
      this.execStartTime = Date.now()
      this.execStartFlg = !this.execStartFlg
      this.initCompletedNum = 0
      this.intervalTimer = setInterval(() => {
        const nowTime: number = (Date.now() - this.execStartTime) / 1000
        if (!this.execCompletedGA) {
          this.execTimeGA = nowTime
        }
        if (!this.execCompletedFS) {
          this.execTimeFS = nowTime
        }
      }, 50)
    }
  }
}
