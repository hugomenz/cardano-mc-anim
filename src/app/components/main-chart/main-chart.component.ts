import { Component, Input, OnInit } from '@angular/core';
import Chart, { layouts } from 'chart.js/auto';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Data } from 'src/app/core/model/data.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss'],
})
export class MainChartComponent implements OnInit {
  @Input() chartID: string = 'main';

  public chart!: Chart;

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.createChart();
      this.dataService.getChartData().subscribe((data) => {
        let lastValue = data[data.length - 1];

        this.chart.data.labels = data.map((element: Data) => element.epoch);

        this.chart.data.datasets[0] = {
          label: 'test',
          yAxisID: 'yAxis0',
          type: 'line',
          tension: 0,
          fill: false,
          borderColor: 'blue',
          data: data.map((element: Data) => parseFloat(element.marketcap)),
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
    this.chart = new Chart(this.chartID, {
      data: {
        labels: [],
        datasets: [],
      },
      options: {
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
}
