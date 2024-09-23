import { AfterViewInit, Component, HostListener, Inject, PLATFORM_ID, ViewChild, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { ChartsService } from '../../../../core/services/charts/charts.service';
import { BubbleDataSet } from '../../../../shared/utils/chart-data';


@Component({
  selector: 'app-charts-section',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
  ],
  templateUrl: './charts-section.component.html',
  styleUrl: './charts-section.component.scss'
})
export class ChartsSectionComponent implements AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private chartsService: ChartsService,
    private renderer: Renderer2) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  bubbleChartData: ChartConfiguration['data'] = {
    datasets: []
  }

  bubbleChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: 'transparent',
    animation: {
      duration: 1000,
      easing: 'easeOutQuad'
    },
  };

  bubbleChartType: ChartType = 'bubble';


  intervalId: any;
  suscription!: Subscription;

  isBrowser: boolean;



  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.updateChartData();
    }
  }

  updateChartData(): void {
    this.intervalId = setInterval(() => {

      this.suscription = this.chartsService.getChartData().subscribe(
        (data: BubbleDataSet[]) => {
          this.bubbleChartData.datasets = data;
          this.chart?.update();
        },
        error => {
          throw new error('Error getting data', error);
        }
      )
    }, 6000);
  }

  //animate the bubbles with scroll
  @HostListener('window:scroll', []) onWindowScroll(): void{
    if(this.chart?.chart?.canvas){
      const canvas = this.chart.chart.canvas;
      this.renderer.addClass(canvas, 'bubble-glow');
      setTimeout(() => {
        this.renderer.removeClass(canvas, 'bubble-glow');
      }, 1000);
    }
  }
}
