import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { BackendService } from '../_services/backend/backend.service';
import { CommonModule } from '@angular/common';
import { Appuntamento } from '../_services/backend/appuntamento.type';
import { AnnuncioGet } from '../_services/backend/annuncio.type'
import { ImmobileComponent } from './immobile/immobile.component';

@Component({
  selector: 'app-home-page-agente-immobiliare',
  imports: [CommonModule, ImmobileComponent],
  templateUrl: './home-page-agente-immobiliare.component.html',
  styleUrl: './home-page-agente-immobiliare.component.scss'
})
export class HomePageAgenteImmobiliareComponent {
  authService = inject(AuthService);
  backendService = inject(BackendService);
  toastr = inject(ToastrService);

  dates: Appuntamento [] = [];
  dayToShow = new Date();
  currentDay = new Date();
  changeDayClicked = 0;
  immobili: AnnuncioGet [] = [];
  showMessage = false;

  ngOnInit() {
    this.getDates(this.dayToShow); 
    this.getImmobili();
  }

  getDates(selectedData: Date) {
    this.backendService.getAppuntamentiWithDate(selectedData, this.authService.user(), this.authService.getRuolo()).subscribe({
      next: (data: Appuntamento[]) => {
        this.dates = data;
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

  nextDay() {
    this.changeDayClicked++;
    this.changeDay();
  }

  previousDay() {
    this.changeDayClicked--;
    this.changeDay();
  }

  private changeDay() {
    const newDate = new Date(this.currentDay);

    newDate.setDate(newDate.getDate() + this.changeDayClicked);
    this.dayToShow = newDate;
    this.getDates(this.dayToShow);
  }

  setCurrentDay() {
    this.changeDayClicked = 0;
    this.dayToShow = this.currentDay;
    this.getDates(this.dayToShow);
  }

  getImmobili() {
    this.backendService.getAnnunciByAgent(this.authService.user()).subscribe({
      next: (data: AnnuncioGet[]) => {
        this.immobili = data;
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
