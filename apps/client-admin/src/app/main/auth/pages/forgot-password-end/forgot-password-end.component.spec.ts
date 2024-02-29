import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordEndComponent } from './forgot-password-end.component';

describe('ForgotPasswordEndComponent', () => {
  let component: ForgotPasswordEndComponent;
  let fixture: ComponentFixture<ForgotPasswordEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordEndComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
