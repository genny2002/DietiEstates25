import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { BackendService } from '../_services/backend/backend.service';
import { CommonModule } from '@angular/common';
import {Appuntamento} from '../_services/backend/appuntamento.type';
import { AnnuncioGet } from '../_services/backend/annuncio.type'
import { ImmobileComponent } from './immobile/immobile.component';

@Component({
  selector: 'app-home-page-agente-immobiliare',
  imports: [CommonModule, ImmobileComponent],
  templateUrl: './home-page-agente-immobiliare.component.html',
  styleUrl: './home-page-agente-immobiliare.component.scss'
})
export class HomePageAgenteImmobiliareComponent {
  authService = inject(AuthService);  //gestisce le informazioni della sessione
  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche

  dates: Appuntamento [] = [];
  dayToShow = new Date();
  currentDay = new Date();
  changeDayClicked = 0;
  immobili: AnnuncioGet [] = [];
  showMessage = false;

  ngOnInit() {  //inizializza il componente
    this.getDates(this.dayToShow); 
    this.getImmobili();
  }

  getDates(selectedData: Date) { //recupera tutte le idee controverse
    this.backendService.getAppuntamentiWithDate(selectedData, this.authService.user(), this.authService.getRuolo()).subscribe({ //cerca tutte le idee controverse
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

  nextDay() {
    this.changeDayClicked++;
    this.changeDay(); // Aggiorna la lista
  }

  previousDay() {
    this.changeDayClicked--;
    this.changeDay(); // Aggiorna la lista
  }

  private changeDay() {
    const newDate = new Date(this.currentDay); // Crea una copia della data corrente
    newDate.setDate(newDate.getDate() + this.changeDayClicked); // Incrementa il giorno
    this.dayToShow = newDate; // Assegna un nuovo oggetto a dayToShow
    this.getDates(this.dayToShow); // Aggiorna la lista
  }

  setCurrentDay() {  //mostra le idee controverse del giorno corrente
    this.changeDayClicked = 0;
    this.dayToShow = this.currentDay;
    this.getDates(this.dayToShow);
  }

  getImmobili() {
    this.backendService.getAnnunciByAgent(this.authService.user()).subscribe({ //cerca tutte le idee controverse
      next: (data: AnnuncioGet[]) => {
        this.immobili = data;  //inserisce le idee trovate nel vettore 'ideas'
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error("Effettuare nuovamente il login", "Token non valido");  //mostra un messaggio di errore
        } else {
          this.toastr.error(err.message, err.statusText)  //mostra un messaggio di errore
        }
      }
    });
  }

  
}
