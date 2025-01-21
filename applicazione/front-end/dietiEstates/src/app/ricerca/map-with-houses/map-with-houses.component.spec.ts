import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapWithHousesComponent } from './map-with-houses.component';

describe('MapWithHousesComponent', () => {
  let component: MapWithHousesComponent;
  let fixture: ComponentFixture<MapWithHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapWithHousesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapWithHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
