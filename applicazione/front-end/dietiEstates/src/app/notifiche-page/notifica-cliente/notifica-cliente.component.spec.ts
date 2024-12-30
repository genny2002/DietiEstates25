import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificaClienteComponent } from './notifica-cliente.component';

describe('NotificaClienteComponent', () => {
  let component: NotificaClienteComponent;
  let fixture: ComponentFixture<NotificaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificaClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
