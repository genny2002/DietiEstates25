import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { BackendService } from '../_services/backend/backend.service';
import { Appuntamento } from '../_services/backend/appuntamento.type';
import { NotificaComponent } from '../notifiche-page/notifica/notifica.component'

@Component({
  selector: 'app-notifichePage',
  imports: [NotificaComponent],
  templateUrl: './notifiche-page.component.html',
  styleUrl: './notifiche-page.component.scss'
})
export class NotificheComponent {
  authService = inject(AuthService);  //gestisce le informazioni della sessione
  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche

  requestDates: Appuntamento [] = [];

  ngOnInit() {  //inizializza il componente
    this.getRequestDates();
  }

  getRequestDates() { //recupera tutte le idee controverse
    this.backendService.getUserAppuntamenti(this.authService.user(), this.authService.authState().role).subscribe({ //cerca tutte le idee controverse
      next: (data: Appuntamento[]) => {
        this.requestDates = data;  //inserisce le idee trovate nel vettore 'ideas'
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error("Effettuare nuovamente il login", "Token non valido");  //mostra un messaggio di errore
        } else {
          this.toastr.error(err.message, err.statusText)  //mostra un messaggio di errore
        }
      }
    });
  }//fine fetchControversialIdeas
}
