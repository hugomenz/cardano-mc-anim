import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';
import { Data, DataVM } from '../model/data.model';
interface DataPoint {
  x: number;
  y: number;
}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  index = 0;
  data!: any[];
  chartDataArr: DataVM[] = [];

  private chartDataSubject = new Subject<DataVM[]>();

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<Data[]>('./assets/data/json/cmcdata.json').pipe(
      map((data) => {
        this.data = data.map((item) => {
          return {
            date: new Date(item.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volume,
            marketcap: parseFloat(
              item.marketcap.replace(/,/g, '').replace('$', '')
            ),
            epoch: item.epoch,
          };
        });
        return this.data[this.index];
      })
    );
  }

  next() {
    this.index++;
    if (this.index >= this.data.length) {
      this.index = 0;
    }
  }

  onPushElement(obj: DataVM) {
    this.chartDataArr.push(obj);
  }

  updateChart(obj: DataVM) {
    this.chartDataArr.push(obj);
    this.chartDataSubject.next(this.chartDataArr);
  }

  getChartData(): Observable<any> {
    return this.chartDataSubject.asObservable();
  }
}
