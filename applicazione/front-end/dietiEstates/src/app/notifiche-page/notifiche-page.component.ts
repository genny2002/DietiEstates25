import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { BackendService } from '../_services/backend/backend.service';
import { Appuntamento } from '../_services/backend/appuntamento.type';
import { NotificaComponent } from '../notifiche-page/notifica/notifica.component'
import { NotificaClienteComponent } from '../notifiche-page/notifica-cliente/notifica-cliente.component'

@Component({
  selector: 'app-notifichePage',
  imports: [NotificaComponent, NotificaClienteComponent],
  templateUrl: './notifiche-page.component.html',
  styleUrl: './notifiche-page.component.scss'
})
export class NotificheComponent {
  authService = inject(AuthService);
  backendService = inject(BackendService);
  toastr = inject(ToastrService);

  requestDates: Appuntamento [] = [];

  ngOnInit() {
    this.getRequestDates();
  }

  getRequestDates() {
    this.backendService.getUserAppuntamenti(this.authService.user(), this.authService.authState().role).subscribe({
      next: (data: Appuntamento[]) => {
        this.requestDates = data;
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error("Effettuare nuovamente il login", "Token non valido");
        } else {
          this.toastr.error(err.message, err.statusText);
        }
      }
    });
  }
}
