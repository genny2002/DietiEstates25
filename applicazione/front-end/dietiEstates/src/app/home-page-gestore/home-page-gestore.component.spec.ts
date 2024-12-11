import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageGestoreComponent } from './home-page-gestore.component';

describe('HomePageGestoreComponent', () => {
  let component: HomePageGestoreComponent;
  let fixture: ComponentFixture<HomePageGestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageGestoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageGestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
