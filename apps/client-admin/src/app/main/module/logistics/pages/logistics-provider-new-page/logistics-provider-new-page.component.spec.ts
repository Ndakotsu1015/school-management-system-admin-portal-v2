import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { LogisticsProviderNewPageComponent } from './logistics-provider-new-page.component';

describe('LogisticsProviderNewPageComponent', () => {
  let component: LogisticsProviderNewPageComponent;
  let fixture: ComponentFixture<LogisticsProviderNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticsProviderNewPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      LogisticsProviderNewPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
