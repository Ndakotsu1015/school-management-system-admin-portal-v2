import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { LogisticsFleetTypeListPageComponent } from './logistics-fleet-type-list-page.component';

describe('LogisticsFleetTypeListPageComponent', () => {
  let component: LogisticsFleetTypeListPageComponent;
  let fixture: ComponentFixture<LogisticsFleetTypeListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticsFleetTypeListPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      LogisticsFleetTypeListPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
