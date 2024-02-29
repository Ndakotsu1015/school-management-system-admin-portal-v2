import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { DeliverySettingsPageComponent } from './delivery-settings-page.component';

describe('DeliverySettingsPageComponent', () => {
  let component: DeliverySettingsPageComponent;
  let fixture: ComponentFixture<DeliverySettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliverySettingsPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      DeliverySettingsPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
