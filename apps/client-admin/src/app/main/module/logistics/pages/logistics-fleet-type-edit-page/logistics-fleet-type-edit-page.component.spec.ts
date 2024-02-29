import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { LogisticsFleetTypeEditPageComponent } from './logistics-fleet-type-edit-page.component';

describe('LogisticsFleetTypeEditPageComponent', () => {
  let component: LogisticsFleetTypeEditPageComponent;
  let fixture: ComponentFixture<LogisticsFleetTypeEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticsFleetTypeEditPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      LogisticsFleetTypeEditPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
