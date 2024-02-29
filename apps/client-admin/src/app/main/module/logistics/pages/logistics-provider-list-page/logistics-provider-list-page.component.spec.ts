import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { LogisticsProviderListPageComponent } from './logistics-provider-list-page.component';

describe('LogisticsProviderListPageComponent', () => {
  let component: LogisticsProviderListPageComponent;
  let fixture: ComponentFixture<LogisticsProviderListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticsProviderListPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      LogisticsProviderListPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
