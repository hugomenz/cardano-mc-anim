import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss'],
})
export class MainChartComponent implements OnInit, AfterViewInit, OnDestroy {
  public chart!: Chart;

  chartData: number[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.createChart();
    setTimeout(() => {
      this.dataService.getChartData().subscribe((data) => {
        let lastValue = data[data.length - 1];

        this.chart.data.labels?.push(lastValue.epoch);
        this.chartData.push(lastValue.marketcap);

        this.chart.data.datasets[0] = {
          label: 'test',
          yAxisID: 'yAxis0',
          type: 'line',
          tension: 0,
          fill: false,
          borderColor: 'blue',
          data: this.chartData,
        };

        this.chart.options.scales = {
          yAxis0: {
            beginAtZero: true,
            grid: { display: true },
            position: 'right',
            title: {
              display: true,
              text: 'marketcap',
            },
            ticks: { font: { size: 12 } },
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 10 } },
          },
        };

        this.chart.update();
      });
    });
  }

  createChart() {
    console.log(`createChart | Chart creado!`);
    Chart.defaults.color = '#000';
    this.chart = new Chart('main', {
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        animation: {
          duration: 0,
        },

        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 2,
        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
