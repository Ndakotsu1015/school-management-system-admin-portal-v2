import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { UserGroupNewPageComponent } from './user-group-new-page.component';

describe('UserGroupNewPageComponent', () => {
  let component: UserGroupNewPageComponent;
  let fixture: ComponentFixture<UserGroupNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGroupNewPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      UserGroupNewPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
