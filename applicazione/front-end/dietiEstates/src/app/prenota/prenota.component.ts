import { Component, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../_services/backend/backend.service';
import {ApiMeteoResponse} from '../_services/backend/meteo.type';
import {AnnuncioGet} from '../_services/backend/annuncio.type';
import {Disponibilita} from '../_services/backend/disponibilita.type';

@Component({
  selector: 'app-prenota',
  imports: [],
  templateUrl: './prenota.component.html',
  styleUrl: './prenota.component.scss',
})
export class PrenotaComponent {
  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche
  route = inject(ActivatedRoute);

  weatherData?: ApiMeteoResponse;
  annuncioItem?: AnnuncioGet;
  fullDayList: number[] = []; // L'array completo di 14 giorni
  visibleDays: number[] = []; // Gli elementi attualmente visibili
  startIndex: number = 0; // Indice di partenza per lo slice

  numberClick: number = 0;
  dayToShow: number[]=[];

  disponibilita: Disponibilita[] = []

  async ngOnInit() {  //inizializza il componente
    await this.initAnnuncioItem();
    this.initDisponibilita();
    this.getCordinates();
  }

  initDisponibilita() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Aggiungi 1 perché i mesi partono da 0
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;

    if(this.annuncioItem?.AgenteImmobiliareUsername){
      this.backendService.getDisponibilita(this.annuncioItem?.AgenteImmobiliareUsername, todayString).subscribe({
        next: (data) => {
          this.disponibilita = data;
        },
        error: (err) => {
          this.toastr.error(err.message, err.statusText);
        }
      });
    }
  }

  async initAnnuncioItem(): Promise<void> { //recupera le informazioni dell'idea 'ideaItem' e la inizializza
    return new Promise((resolve, reject) => {
      this.backendService.getAnnuncioToShow(this.route.snapshot.params["id"]).subscribe({ //recupera le informazioni di 'ideaItem'
        next: (annuncio) => {
          this.annuncioItem = annuncio[0]; //inizializza 'ideaItem' con i dati trovati
          resolve();
        },
        error: (err) => {
          this.toastr.error(err.message, err.statusText); //mostra un messaggio di errore
          reject(err);
        }
      });
    })
  }//initIdeas

  getCordinates()  {
    if(this.annuncioItem?.indirizzo) {
      this.backendService.getCoordinates(this.annuncioItem?.indirizzo).subscribe({
        next: (data) => {
          this.getMeteo(data[0].latitude, data[0].longitude)
        },
        error: (err) => {
          this.toastr.error(err.message, err.statusText);
        }
      });
    }
  }

  getMeteo(lat: number, lon: number) {
    this.backendService.getMeteo(lat, lon).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.initAnnuncioToShow();
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error("Effettuare nuovamente il login", "Token non valido");  //mostra un messaggio di errore
        }
      }
    });
  }

  getUrlIcon(day: number): string {
    switch (this.weatherData?.daily.weathercode[day]) {
      case 0:
      case 1:
        return "sun.png";

      case 2:
      case 3:
        return "cloud.png";

      case 45:
      case 48:
        return "fog.png";

      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
      case 61:
      case 63:
        return "cloud-rain.png";

      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:
      case 95:
      case 96:
      case 99:
        return "bolt.png";

      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return "cloud-snow.png";

      default:
        return "";
    }
  } 

  async initAnnuncioToShow(): Promise<void> {
    this.backendService.getAnnuncioToShow(this.route.snapshot.params["id"]).subscribe({
      next: (annuncio) => {
        this.annuncioItem = annuncio[0]; // Assumendo che i dati siano qui
        this.fullDayList = this.weatherData?.daily?.time || [];
        this.updateVisibleDays();
      },
      error: (err) => {
        this.toastr.error(err.message, err.statusText);
      }
    });
  }

  updateVisibleDays() {
    this.visibleDays = this.fullDayList.slice(this.startIndex, this.startIndex + 7);

    let i=0

    for (let day of this.visibleDays) {
      if(this.disponibilita.find(d => d.data == day.toString())?.orariDisponibili.length==0){
        document.getElementById(`${i}`)!.classList.remove("flex-1 bg-verdeScuro hover:bg-arancione cursor-pointer p-4 text-white text-center");
        document.getElementById(`${i}`)!.classList.add("flex-1 bg-verdeScuro p-4 text-white text-center opacity-60");
      };

      i++;
    }
  }

  nextPage() {
    if (this.startIndex + 7 < this.fullDayList.length) {
      this.startIndex += 7;
      this.updateVisibleDays();
    }
  }

  prevPage() {
    if (this.startIndex - 7 >= 0) {
      this.startIndex -= 7;
      this.updateVisibleDays();
    }
  }

}
