import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuncioDetailComponent } from './annuncio-detail.component';

describe('AnnuncioDetailComponent', () => {
  let component: AnnuncioDetailComponent;
  let fixture: ComponentFixture<AnnuncioDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnuncioDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnuncioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
