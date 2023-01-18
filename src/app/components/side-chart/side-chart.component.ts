import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-side-chart',
  templateUrl: './side-chart.component.html',
  styleUrls: ['./side-chart.component.scss'],
})
export class SideChartComponent implements OnInit {
  firstData: any;
  data: any;
  subscription!: Subscription;

  daySpentList100Mto1B: number[] = [];
  daySpentList1Bto10B: number[] = [];
  daySpentList10Bto100B: number[] = [];
  daySpentList100Bto1T: number[] = [];
  daySpentListAbove1T: number[] = [];

  constructor(public dataService: DataService) {
    this.data = [
      {
        close: '$0.00000',
        date: 'Sep 24, 2017',
        epoch: 0,
        high: '$0.00000',
        marketcap: 0,
        open: '$0.00000',
        volume: '$0.00000',
      },
    ];
  }

  ngOnInit() {
    this.subscription = this.dataService.getChartData().subscribe((data) => {
      let lastValue = data[data.length - 1];

      ///

      ///
      if (
        lastValue.marketcap > 100000000 &&
        lastValue.marketcap <= 1000000000
      ) {
        this.daySpentList100Mto1B.push(lastValue.marketcap);
      } else if (
        lastValue.marketcap > 1000000000 &&
        lastValue.marketcap <= 10000000000
      ) {
        this.daySpentList1Bto10B.push(lastValue.marketcap);
      } else if (
        lastValue.marketcap > 10000000000 &&
        lastValue.marketcap <= 100000000000
      ) {
        this.daySpentList10Bto100B.push(lastValue.marketcap);
      } else if (
        lastValue.marketcap > 100000000000 &&
        lastValue.marketcap <= 1000000000000
      ) {
        this.daySpentList100Bto1T.push(lastValue.marketcap);
      } else if (lastValue.marketcap > 1000000000000) {
        this.daySpentListAbove1T.push(lastValue.marketcap);
      }
    });
  }

  getWidth(arrayLength: number) {
    const scaleFactor = 0.08;

    return arrayLength * scaleFactor + '%';
  }
}
