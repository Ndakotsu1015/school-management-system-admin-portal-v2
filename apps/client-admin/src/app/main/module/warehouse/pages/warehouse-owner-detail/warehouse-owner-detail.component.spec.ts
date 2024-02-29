import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { WarehoouseOwnerDetailComponent } from './warehouse-owner-detail.component';

describe('WarehoouseOwnerDetailComponent', () => {
  let component: WarehoouseOwnerDetailComponent;
  let fixture: ComponentFixture<WarehoouseOwnerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehoouseOwnerDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      WarehoouseOwnerDetailComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
