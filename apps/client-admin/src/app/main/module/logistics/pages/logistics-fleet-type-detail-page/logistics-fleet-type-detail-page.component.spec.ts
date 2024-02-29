import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { LogisticsFleetTypeDetailPageComponent } from './logistics-fleet-type-detail-page.component';

describe('LogisticsFleetTypeDetailPageComponent', () => {
  let component: LogisticsFleetTypeDetailPageComponent;
  let fixture: ComponentFixture<LogisticsFleetTypeDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticsFleetTypeDetailPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      LogisticsFleetTypeDetailPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
