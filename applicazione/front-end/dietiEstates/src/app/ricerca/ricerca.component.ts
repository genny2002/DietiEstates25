import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnnuncioGet } from '../_services/backend/annuncio.type'
import { BackendService } from '../_services/backend/backend.service';
import { AnnuncioComponent } from './annuncio/annuncio.component';

@Component({
  selector: 'app-ricerca',
  imports: [AnnuncioComponent, ReactiveFormsModule],
  templateUrl: './ricerca.component.html',
  styleUrl: './ricerca.component.scss'
})
export class RicercaComponent {
  showFilters = false;
  immobili: AnnuncioGet [] = [];
  filterSubmitted = false;

  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche
  router = inject(Router);  //permette la navigazione

  filterForm = new FormGroup({ //form per il login
    indirizzo: new FormControl(''), //campo di input dell'username
    tipo: new FormControl(''),
    servizi: new FormGroup({
      ascensore: new FormControl(''),
      portineria: new FormControl(''),
      climatizzazione: new FormControl(''),
    }),
    prezzoMin: new FormControl(''),
    prezzoMax: new FormControl(''),
    numeroStanze: new FormControl(''),
    piano: new FormControl(''),
    dimensioni: new FormControl(''),
    classeEnergetica: new FormControl(''),
  })

  ngOnInit() {  //inizializza il componente
    this.getImmobili();
  }

  getImmobili() {
    this.backendService.getAnnunci().subscribe({ //cerca tutte le idee controverse
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

  handleFilters(){
    this.filterSubmitted = true;

    if (this.filterForm.invalid || this.invalidPrices(this.filterForm.value.prezzoMin as string, this.filterForm.value.prezzoMax as string)) { //controlla se i dati inseriti nel form non sono validi
      this.toastr.error("Inserire dei dati corretti", "Errore: dati errati");  //mostra un messaggio di errore
    } else {
      this.backendService.getAnnunciWithFilter({  //effettua il login con i dati inseriti nel form
        indirizzo: this.filterForm.value.indirizzo as string,
        categoria: this.filterForm.value.tipo as string,
        servizi: {
          ascensore: this.filterForm.value.servizi?.ascensore as string,
          portineria: this.filterForm.value.servizi?.portineria as string,
          climatizzazione: this.filterForm.value.servizi?.climatizzazione as string,
        },
        prezzoMin: this.filterForm.value.prezzoMin as string,
        prezzoMax: this.filterForm.value.prezzoMax as string,
        numeroStanze: this.filterForm.value.numeroStanze as string,
        piano: this.filterForm.value.piano as string,
        dimensioni: this.filterForm.value.dimensioni as string,
        classeEnergetica: this.filterForm.value.classeEnergetica as string
      }).subscribe({
        next: (data: AnnuncioGet[]) => {
          this.immobili = data;  //inserisce le idee trovate nel vettore 'ideas'
          this.showFilters=false;
        },
        error: (err) => {
          this.toastr.error("Inserire dei dati corretti.", "Errore: input errato"); //mostra un messaggio di errore
        },
      })
    }
  }

  invalidPrices(min:string, max:string): boolean
  {
    return !!min && !!max && parseInt(min) > parseInt(max);
  }

  openFilters(){
    this.showFilters=true;
  }
}
