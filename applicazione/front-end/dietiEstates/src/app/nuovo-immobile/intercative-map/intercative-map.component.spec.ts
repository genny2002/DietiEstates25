import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntercativeMapComponent } from './intercative-map.component';

describe('IntercativeMapComponent', () => {
  let component: IntercativeMapComponent;
  let fixture: ComponentFixture<IntercativeMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntercativeMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntercativeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
