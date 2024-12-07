import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraAgenziaComponent } from './registra-agenzia.component';

describe('RegistraAgenziaComponent', () => {
  let component: RegistraAgenziaComponent;
  let fixture: ComponentFixture<RegistraAgenziaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistraAgenziaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistraAgenziaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
