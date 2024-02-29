import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdCardsPrintPageComponent } from './id-cards-print-page.component';

describe('IdCardsPrintPageComponent', () => {
  let component: IdCardsPrintPageComponent;
  let fixture: ComponentFixture<IdCardsPrintPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdCardsPrintPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdCardsPrintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
