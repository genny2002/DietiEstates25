import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoImmobileComponent } from './nuovo-immobile.component';

describe('NuovoImmobileComponent', () => {
  let component: NuovoImmobileComponent;
  let fixture: ComponentFixture<NuovoImmobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuovoImmobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuovoImmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
