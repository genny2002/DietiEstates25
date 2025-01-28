import { Component , inject} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../_services/backend/backend.service';
import {ApiMeteoResponse} from '../_services/backend/meteo.type';

@Component({
  selector: 'app-prenota',
  imports: [],
  templateUrl: './prenota.component.html',
  styleUrl: './prenota.component.scss'
})
export class PrenotaComponent {
  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche
  weatherData?: ApiMeteoResponse;

  ngOnInit() {  //inizializza il componente
    this.getMeteo();
  }

  getMeteo(){
    this.backendService.getMeteo(52.52, 13.41).subscribe({
      next: (data) => {
        console.log(data);
        this.weatherData = data;
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error("Effettuare nuovamente il login", "Token non valido");  //mostra un messaggio di errore
        }
      }
    });
  }

  getUrlIcon(day: number): string {
    console.log(this.weatherData?.daily.weathercode[day]);
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
}
