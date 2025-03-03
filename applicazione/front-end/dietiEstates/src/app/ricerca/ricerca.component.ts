import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnnuncioGet } from '../_services/backend/annuncio.type'
import { BackendService } from '../_services/backend/backend.service';
import { AnnuncioComponent } from './annuncio/annuncio.component';
import { MapWithHousesComponent } from './map-with-houses/map-with-houses.component';


@Component({
  selector: 'app-ricerca',
  imports: [AnnuncioComponent, ReactiveFormsModule, MapWithHousesComponent],
  templateUrl: './ricerca.component.html',
  styleUrl: './ricerca.component.scss'
})
export class RicercaComponent {
  showFilters = false;
  immobili: AnnuncioGet [] = [];
  filterSubmitted = false;

  query: string = ''; 
  suggestions: any[] = [];

  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche
  router = inject(Router);  //permette la navigazione

  addressForm = new FormGroup({
    indirizzo: new FormControl(''), //campo di input dell'username
  })

  filterForm = new FormGroup({ //form per il login
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
        indirizzo: this.addressForm.value.indirizzo  as string,
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

  onDocumentClick(event: Event) {
    // Nascondi la lista se il clic avviene fuori
    const target = event.target as HTMLElement;
    if (!target.closest('#indirizzo') && !target.closest('#suggestion-list')) {
      this.suggestions = [];
    }
  }

  onContainerClick(event: Event) {
    // Previeni la chiusura della lista quando si clicca dentro il contenitore
    event.stopPropagation();
  }

  onInputChange(): void {
    if(this.addressForm.value.indirizzo != null){
      this.query=this.addressForm.value.indirizzo;
    
      if (this.query.length > 2) {
        this.backendService.getSuggestions(this.query).subscribe({
          next: (data) => {  
            this.suggestions = data.features;
          },
          error: (err) => {
            console.error(err);
          },
        });
      } else {
        this.suggestions = [];
      }
    }
  }

  selectSuggestion(suggestion: any): void {
      this.addressForm.setValue({
        indirizzo: suggestion.properties.formatted
      });  // Mostra l'indirizzo selezionato
      this.suggestions = [];
    }

    handleAddress(){
      this.handleFilters();
    }

    closeShowFilters(){
      this.showFilters=false;
    }

    reset(){
      this.filterForm.reset();
      this.filterSubmitted = false;
    }
}
