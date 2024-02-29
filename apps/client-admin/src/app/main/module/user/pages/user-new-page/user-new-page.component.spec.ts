import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { UserNewPageComponent } from './user-new-page.component';

describe('UserNewPageComponent', () => {
  let component: UserNewPageComponent;
  let fixture: ComponentFixture<UserNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserNewPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
