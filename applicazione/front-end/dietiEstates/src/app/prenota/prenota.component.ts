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
  //response?: ApiMeteoResponse;

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

  /*initializeWeatherData() {
    if (!this.response) {
      this.toastr.error("Nessuna risposta ricevuta dal server", "Errore");
      return;
    }
    
    const daily = this.response.daily;
    /*console.log("daily 1: ", this.response.daily);

    console.log("daily: ", daily);
    console.log("response: ", this.response);
    
    if (daily) {
      const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  
      const utcOffsetSeconds = this.response.utcOffsetSeconds;
      const oneDay = 86400;
      const daysInFuture = 7;
      const now = Math.floor(Date.now() / 1000);
      const timestamps = range(now, now + daysInFuture * oneDay, oneDay);
  
      this.weatherData = {
        daily: {
          time: range(Number(daily.time), Number(daily.timeEnd), daily.interval).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
          ),
          weatherCode: daily.variables[0]?.valuesArray || [],
          temperature2mMax: daily.variables[1]?.valuesArray || [],
          temperature2mMin: daily.variables[2]?.valuesArray || [],
          precipitationSum: daily.variables[3]?.valuesArray || [],
          rainSum: daily.variables[4]?.valuesArray || [],
          showersSum: daily.variables[5]?.valuesArray || [],
          snowfallSum: daily.variables[6]?.valuesArray || [],
          precipitationProbabilityMax: daily.variables[7]?.valuesArray || [],
        },
      };
  
      for (let i = 0; i < this.weatherData.daily.time.length; i++) {
        console.log(
          this.weatherData.daily.time[i].toISOString(),
          this.weatherData.daily.weatherCode[i],
          this.weatherData.daily.temperature2mMax[i],
          this.weatherData.daily.temperature2mMin[i],
          this.weatherData.daily.precipitationSum[i],
          this.weatherData.daily.rainSum[i],
          this.weatherData.daily.showersSum[i],
          this.weatherData.daily.snowfallSum[i],
          this.weatherData.daily.precipitationProbabilityMax[i]
        );
      }
    } else {
      this.toastr.error("Dati 'daily' non disponibili nella risposta", "Errore");
    }
  } */
}
