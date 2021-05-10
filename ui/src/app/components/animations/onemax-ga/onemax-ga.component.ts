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
import { OneMaxIndividual } from 'src/app/models/onemax/onemax-individual.model'

import { Constant } from 'src/constant'

@Component({
  selector: 'app-onemax-ga',
  templateUrl: './onemax-ga.component.html',
  styleUrls: ['./onemax-ga.component.less'],
})
export class OnemaxGaComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  /** 初期化時間（単位：秒） */
  readonly initTime: number = 4
  /** １世代の個体数（４の倍数） */
  readonly populationSize: number = 80
  /** 突然変異確率 */
  readonly mutationProb: number = 0.01
  /** 突然変異回数 */
  mutationTimes: number = 0
  /** 染色体が持つ遺伝子の数 */
  geneSize: number = 0
  /** 表示用の個体 */
  individualEle: any[] = []
  /** 最適解の個体 */
  bestIndividual!: OneMaxIndividual
  /** 世帯 */
  population!: OneMaxIndividual[]
  /** 世帯数 */
  populationNum: number = 0
  /** タイマー */
  intervalTimer: any = null
  /** 評価回数 */
  evalTimes: number = 0
  /** */
  initFlg: boolean = true

  @ViewChild('gaSide') gaSide: any

  /** 表示用の遺伝子グラフのサイズ（単位：ピクセル） */
  @Input()
  geneEleSize: number = 40
  /** 遺伝子グラフの行数 */
  @Input()
  geneRow: number = 5
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
      this.initGA()
    }
  }

  ngAfterViewChecked(): void {
    if (this.execFlg) {
      this.execFlg = !this.execFlg
      setTimeout(() => {
        this.execGA()
      }, 100)
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalTimer)
  }

  initGA(): void {
    // 染色体が持つ遺伝子の数を算出する．
    this.geneSize = Math.floor(this.gaSide.nativeElement.offsetWidth / this.geneEleSize) * this.geneRow
    // 最適解を初期化する．
    this.bestIndividual = this.createOneMaxIndividual(true)
    // 画面に表示される．
    this.initVisualization()
    // 画面初期化完了
    setTimeout(() => {
      this.emitInfo({ status: Constant.INIT_COMPLETED, size: this.geneSize, mutationProb: this.mutationProb })
    }, this.initTime * 1000)
  }

  execGA(): void {
    // 初期世代を生成する．
    this.population = this.firstGeneration()
    this.population.sort((a: OneMaxIndividual, b: OneMaxIndividual) => b.fitness - a.fitness)
    this.updateEvalTimes(this.populationSize)
    this.updatePopulationNum()
    // 最適解の個体を更新する．
    this.updateBestIndividual(this.population[0])
    this.emitInfo({ firstFitness: this.bestIndividual.fitness })

    this.intervalTimer = setInterval(() => {
      this.newGeneration()
      this.updatePopulationNum()
      // 最適解の個体を更新する．
      this.updateBestIndividual(this.population[0])
      this.updateVisualization()
      // 処理終了
      if (this.bestIndividual.fitness === this.geneSize) {
        this.emitInfo({ status: Constant.EXEC_COMPLETED })
        clearInterval(this.intervalTimer)
      }
    }, 500)
  }

  /**
   * 個体を作成する．
   *
   * 初期化フラグが true の場合，全ての遺伝子が 0 で作成され，
   * 初期化フラグが false の場合，遺伝子がランダムで作成される．
   *
   * @param initFlg 初期フラグ
   * @returns 作成された個体
   */
  private createOneMaxIndividual(initFlg: boolean = false): OneMaxIndividual {
    let fit: number = 0
    let chrome: number[] = []
    if (initFlg) {
      chrome = new Array(this.geneSize).fill(0)
    } else {
      for (let i = 0; i < this.geneSize; i++) {
        const v = Math.floor(Math.random() * 2)
        chrome.push(v)
        fit += v
      }
    }
    const individual: OneMaxIndividual = {
      fitness: fit,
      chromosomes: chrome,
    }

    return individual
  }

  /**
   * 表示用の個体オブジェクトを生成する．
   */
  private initVisualization(): void {
    this.bestIndividual.chromosomes.forEach((gene: number) => {
      const geneEle = this.renderer.createElement('span')
      this.renderer.addClass(geneEle, 'gene')
      this.renderer.addClass(geneEle, 'gene-zoom-in-anim')
      const delayTimeStr: string = (Math.random() * 3).toString().slice(0, this.initTime)
      this.renderer.setStyle(geneEle, 'width', this.geneEleSize - 10 + 'px')
      this.renderer.setStyle(geneEle, 'height', this.geneEleSize - 10 + 'px')
      this.renderer.setStyle(geneEle, 'animation-delay', delayTimeStr + 's')
      this.individualEle.push(geneEle)
      this.renderer.appendChild(this.gaSide.nativeElement, geneEle)
    })
  }

  /**
   * 表示を更新する．
   */
  private updateVisualization(): void {
    this.bestIndividual.chromosomes.forEach((val: number, idx: number) => {
      const ele = this.individualEle[idx]
      if (val === 1) {
        this.renderer.removeStyle(ele, 'animation-delay')
        this.renderer.removeClass(ele, 'gene-zoom-in-anim')
        this.renderer.removeClass(ele, 'gene-rotation-anim')
        // this.renderer.addClass(ele, 'active')
        this.renderer.addClass(ele, 'gene-rotation-reverse-anim')
      } else {
        if (ele.classList.contains('gene-rotation-reverse-anim')) {
          this.renderer.removeStyle(ele, 'animation-delay')
          this.renderer.removeClass(ele, 'gene-zoom-in-anim')
          this.renderer.removeClass(ele, 'gene-rotation-reverse-anim')
          // this.renderer.addClass(ele, 'active')
          this.renderer.addClass(ele, 'gene-rotation-anim')
        }
      }
    })
  }

  private firstGeneration(): OneMaxIndividual[] {
    const pop: OneMaxIndividual[] = []
    for (let i = 0; i < this.populationSize; i++) {
      pop.push(this.createOneMaxIndividual())
    }

    return pop
  }

  private newGeneration(): void {
    let newPopulation: OneMaxIndividual[] = []
    for (let i = 0, j = this.populationSize / 2 - 1; i < this.populationSize / 2; i += 2, j++) {
      const crossPoint = Math.floor(Math.random() * this.geneSize)
      newPopulation = newPopulation.concat(this.cross(this.population[i], this.population[i + 1], crossPoint))
    }
    newPopulation.sort((a: OneMaxIndividual, b: OneMaxIndividual) => b.fitness - a.fitness)
    this.population.splice((this.populationSize / 4) * 3)
    this.population = this.population.concat(newPopulation.slice(0, this.populationSize / 4))
    this.population.sort((a: OneMaxIndividual, b: OneMaxIndividual) => b.fitness - a.fitness)
  }

  /**
   * １点交叉
   *
   * @param individualA 個体 A
   * @param individualB 個体 B
   * @param point 交差点
   * @returns 交叉後の新しい個体（２つ）
   */
  private cross(individualA: OneMaxIndividual, individualB: OneMaxIndividual, point: number): OneMaxIndividual[] {
    const a: OneMaxIndividual = this.copyIndividual(individualA)
    const b: OneMaxIndividual = this.copyIndividual(individualB)
    const result: OneMaxIndividual[] = [a, b]
    for (let i = point; i < this.geneSize; i++) {
      a.chromosomes[i] = a.chromosomes[i] + b.chromosomes[i]
      b.chromosomes[i] = a.chromosomes[i] - b.chromosomes[i]
      a.chromosomes[i] = a.chromosomes[i] - b.chromosomes[i]
    }
    // 突然変異
    if (Math.random() <= this.mutationProb) {
      this.emitInfo({ mutationTimes: ++this.mutationTimes })
      const idx: number = Math.floor(Math.random() * this.geneSize)
      if (Math.floor(Math.random() * 2) === 0) {
        a.chromosomes[idx] = a.chromosomes[idx] === 1 ? 0 : 1
      } else {
        b.chromosomes[idx] = b.chromosomes[idx] === 1 ? 0 : 1
      }
    }

    a.fitness = 0
    for (let i = 0; i < this.geneSize; i++) {
      a.fitness += a.chromosomes[i]
    }
    b.fitness = 0
    for (let i = 0; i < this.geneSize; i++) {
      b.fitness += b.chromosomes[i]
    }
    this.updateEvalTimes(2)

    return result
  }

  private copyIndividual(individual: OneMaxIndividual): OneMaxIndividual {
    const chrome: number[] = []
    individual.chromosomes.forEach((val: number) => {
      chrome.push(val)
    })

    return {
      fitness: individual.fitness,
      chromosomes: chrome,
    } as OneMaxIndividual
  }

  private emitInfo(info: any): void {
    const type = { type: Constant.ONEMAX_TYPE_GA }
    this.updateInfo.emit({ ...type, ...info })
  }

  private updateBestIndividual(individual: OneMaxIndividual): void {
    if (individual.fitness > this.bestIndividual.fitness) {
      this.bestIndividual = this.copyIndividual(individual)
      this.emitInfo({ bestFitness: this.bestIndividual.fitness })
    }
  }

  private updateEvalTimes(times: number): void {
    this.evalTimes += times
    this.emitInfo({ evalTimes: this.evalTimes })
  }

  private updatePopulationNum(): void {
    this.populationNum += 1
    this.emitInfo({ populationNum: this.populationNum })
  }
}
