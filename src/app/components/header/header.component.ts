import { Component, OnInit } from '@angular/core';
import { defaultIfEmpty, interval, Subscription } from 'rxjs';
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

  //
  isPlaying = false;
  speed = 50; // Default speed is 1 sec
  //
  ///
  indexSpeed = 1;
  ///

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
      this.data = data;
    });
    this.start();
  }

  start() {
    this.isPlaying = true;
    const source = interval(this.speed);
    this.subscription = source.subscribe((val) => {
      this.dataService.next();
      this.data = this.dataService.data[this.dataService.index];
      this.dataService.updateChart(this.data);
    });
  }

  stop() {
    this.isPlaying = false;
    this.subscription.unsubscribe();
    this.data = this.firstData;
    this.dataService.index = 0;
  }

  setSpeed(speed: number) {
    this.speed = speed;
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }
}
