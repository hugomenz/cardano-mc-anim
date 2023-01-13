import { Component, OnInit } from '@angular/core';
import { defaultIfEmpty, Subscription } from 'rxjs';
import { Data } from 'src/app/core/model/data.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  firstData: any;
  data: any;
  subscription!: Subscription;

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
    this.subscription = this.dataService.getData().subscribe((data) => {
      this.firstData = data[0];
      console.log(this.firstData);
      this.data = data;
    });
  }

  next() {
    this.dataService.next();
    this.data = this.dataService.data[this.dataService.index];
    console.log(`Epoch ${this.data.epoch}`);
    this.dataService.updateChart(this.data);
    console.log(this.dataService.chartDataArr);
  }

  unsubscribe() {
    this.data = this.firstData;
    this.subscription.unsubscribe();
    this.dataService.index = 0;
    this.subscription = this.dataService
      .getData()
      .pipe(defaultIfEmpty([]))
      .subscribe((data) => {
        if (data.length > 0) {
          this.data = data[this.dataService.index];
        }
      });
  }
}
