import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss'],
})
export class MainChartComponent implements OnInit, AfterViewInit, OnDestroy {
  public chart!: Chart;

  chartData: number[] = [];
  labelData: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.createChart();

    setTimeout(() => {
      this.chartData = [];
      this.dataService.getChartData().subscribe((data) => {
        let lastValue = data[data.length - 1];

        this.chart.data.labels?.push(this.dataService.index);
        this.chartData.push(lastValue.marketcap);

        console.log(this.chartData);

        this.chart.data.datasets[0] = {
          yAxisID: 'yAxis0',
          type: 'line',
          tension: 0.3,
          fill: false,
          borderColor: 'blue',
          data: this.chartData,
        };

        this.chart.options.scales = {
          yAxis0: {
            type: 'logarithmic',
            //beginAtZero: true,
            min: 100000000,
            max: 10000000000000,
            grid: { display: false },
            position: 'right',
            title: {
              display: false,
              text: 'marketcap',
            },

            afterBuildTicks: (scale) => {
              scale.ticks = [
                {
                  value: 100000000,
                },

                {
                  value: 1000000000,
                },

                {
                  value: 10000000000,
                },

                {
                  value: 100000000000,
                },

                {
                  value: 1000000000000,
                },
                {
                  value: 10000000000000,
                },
              ];
            },
            ticks: {
              display: false,
              callback(value, index, ticks) {
                if (value >= 1000000000000) {
                  return '$' + +value / 1000000000000 + 'T';
                } else if (value < 1000000000000 && value >= 1000000000) {
                  return '$' + +value / 1000000000 + 'B';
                } else {
                  return '$' + +value / 1000000 + 'M';
                }
              },
              font: { size: 12 },
            },
          },
          x: {
            grid: { display: false },
            ticks: { display: false, font: { size: 10 } },
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
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,

        maintainAspectRatio: false,
        //devicePixelRatio: 2,
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
