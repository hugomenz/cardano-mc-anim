import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideChartComponent } from './side-chart.component';

describe('SideChartComponent', () => {
  let component: SideChartComponent;
  let fixture: ComponentFixture<SideChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
