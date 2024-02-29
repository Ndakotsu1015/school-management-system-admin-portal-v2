import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { UserGroupDetailPageComponent } from './user-group-detail-page.component';

describe('UserGroupDetailPageComponent', () => {
  let component: UserGroupDetailPageComponent;
  let fixture: ComponentFixture<UserGroupDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGroupDetailPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      UserGroupDetailPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
