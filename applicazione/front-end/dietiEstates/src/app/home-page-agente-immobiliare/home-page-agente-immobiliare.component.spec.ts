import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageAgenteImmobiliareComponent } from './home-page-agente-immobiliare.component';

describe('HomePageAgenteImmobiliareComponent', () => {
  let component: HomePageAgenteImmobiliareComponent;
  let fixture: ComponentFixture<HomePageAgenteImmobiliareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageAgenteImmobiliareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageAgenteImmobiliareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
