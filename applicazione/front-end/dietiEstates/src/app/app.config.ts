import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { authInterceptor } from './_interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),  //abilita le animazioni 
    provideToastr({ //configura le notifiche toast
      progressBar: true,
      newestOnTop: true,
    }),
    provideHttpClient(  //permette di inviare richieste HTTP e di gestire le risposte
      withFetch(),  //usa l'API Fetch invece di XMLHttpRequests
      withInterceptors([authInterceptor]) //permette di utilizzare l'interceptor "authInterceptor"
    ),
    provideRouter(routes) //fornisce la configurazione del router
  ]
};
