import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageCollaboratoreComponent } from './home-page-collaboratore.component';

describe('HomePageCollaboratoreComponent', () => {
  let component: HomePageCollaboratoreComponent;
  let fixture: ComponentFixture<HomePageCollaboratoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageCollaboratoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageCollaboratoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
