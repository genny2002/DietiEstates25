import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Annuncio } from '../_services/backend/annuncio.type'
import { BackendService } from '../_services/backend/backend.service';
import { AnnuncioComponent } from './annuncio/annuncio.component';

@Component({
  selector: 'app-ricerca',
  imports: [AnnuncioComponent],
  templateUrl: './ricerca.component.html',
  styleUrl: './ricerca.component.scss'
})
export class RicercaComponent {
  showFilters = false;
  immobili: Annuncio [] = [];

  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche

  ngOnInit() {  //inizializza il componente
    this.getImmobili();
  }

  getImmobili() {
    this.backendService.getAnnunci().subscribe({ //cerca tutte le idee controverse
      next: (data: Annuncio[]) => {
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

  openFilters(){
    this.showFilters=true;
  }
}
