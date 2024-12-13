import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodStatisticsComponent } from './period-statistics.component';

describe('PeriodStatisticsComponent', () => {
  let component: PeriodStatisticsComponent;
  let fixture: ComponentFixture<PeriodStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
