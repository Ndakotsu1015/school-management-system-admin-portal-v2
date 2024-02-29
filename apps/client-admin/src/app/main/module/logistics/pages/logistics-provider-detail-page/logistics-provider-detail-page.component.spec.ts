import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { LogisticsProviderDetailPageComponent } from './logistics-provider-detail-page.component';

describe('LogisticsProviderDetailPageComponent', () => {
  let component: LogisticsProviderDetailPageComponent;
  let fixture: ComponentFixture<LogisticsProviderDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticsProviderDetailPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      LogisticsProviderDetailPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
