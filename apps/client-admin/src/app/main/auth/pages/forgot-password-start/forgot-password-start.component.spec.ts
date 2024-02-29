import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordStartComponent } from './forgot-password-start.component';

describe('ForgotPasswordStartComponent', () => {
  let component: ForgotPasswordStartComponent;
  let fixture: ComponentFixture<ForgotPasswordStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordStartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
