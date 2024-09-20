import { AfterViewInit, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

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

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  bubbleChartData: ChartConfiguration['data'] = {
    datasets: []
  }

  bubbleChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: 'transparent'
  };

  bubbleChartType: ChartType = 'bubble';


  intervalId: any;
  suscription!: Subscription;

  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private chartsService: ChartsService) { 
      this.isBrowser = isPlatformBrowser(this.platformId);
    }

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
}
