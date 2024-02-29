import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { UserGroupListPageComponent } from './user-group-list-page.component';

describe('UserGroupListPageComponent', () => {
  let component: UserGroupListPageComponent;
  let fixture: ComponentFixture<UserGroupListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGroupListPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      UserGroupListPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
