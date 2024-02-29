import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseOwnerComponent } from './warehouse-owner.component';

describe('WarehouseOwnerComponent', () => {
  let component: WarehouseOwnerComponent;
  let fixture: ComponentFixture<WarehouseOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehouseOwnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WarehouseOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
