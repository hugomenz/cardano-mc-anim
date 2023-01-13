import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Data } from '../model/data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  index = 0;
  data!: any[];

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
}
