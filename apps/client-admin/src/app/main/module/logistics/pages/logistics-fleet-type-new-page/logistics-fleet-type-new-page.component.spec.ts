import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { LogisticsFleetTypeNewPageComponent } from './logistics-fleet-type-new-page.component';

describe('LogisticsFleetTypeNewPageComponent', () => {
  let component: LogisticsFleetTypeNewPageComponent;
  let fixture: ComponentFixture<LogisticsFleetTypeNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticsFleetTypeNewPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      LogisticsFleetTypeNewPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
