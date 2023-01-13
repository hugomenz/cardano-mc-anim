import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  data$: any;

  constructor(private dataService: DataService) {
    this.data$ = this.dataService.getData();
  }

  ngOnInit(): void {}
}
