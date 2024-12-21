import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { BackendService } from '../_services/backend/backend.service';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

export interface Appuntamento {
  IDRichiesta: number;
  stato: string;
  offerta: number | null;
  ClienteUsername: string;
  AgenteImmobiliareUsername: string | null;
  data: Date;
  Annuncio: {
      citta: string;
      viaENumeroCivico: string;
      comune: string;
  };
}

@Component({
  selector: 'app-home-page-agente-immobiliare',
  imports: [CommonModule],
  templateUrl: './home-page-agente-immobiliare.component.html',
  styleUrl: './home-page-agente-immobiliare.component.scss'
})
export class HomePageAgenteImmobiliareComponent {
  authService = inject(AuthService);  //gestisce le informazioni della sessione
  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche

  dates: Appuntamento [] = [];

  ngOnInit() {  //inizializza il componente
    const now = new Date();
    this.getDates(now); 
  }

  getDates(selectedData: Date) { //recupera tutte le idee controverse  
    this.backendService.getAppuntamentiWithDate(selectedData, this.authService.user()).subscribe({ //cerca tutte le idee controverse
      next: (data: Appuntamento[]) => {
        this.dates = data;  //inserisce le idee trovate nel vettore 'ideas'
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

  /*getHourMinute(date: Date) { //restituisce l'ora in formato HH:MM
    this.formattedTime=date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }*/
}
