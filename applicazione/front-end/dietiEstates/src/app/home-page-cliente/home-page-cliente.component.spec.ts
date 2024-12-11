import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageClienteComponent } from './home-page-cliente.component';

describe('HomePageClienteComponent', () => {
  let component: HomePageClienteComponent;
  let fixture: ComponentFixture<HomePageClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
