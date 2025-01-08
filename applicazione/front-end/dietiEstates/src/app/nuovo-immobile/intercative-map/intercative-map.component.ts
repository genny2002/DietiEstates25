import { Component, ViewChild, ElementRef, inject, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../_services/backend/backend.service';
import { ToastrService } from 'ngx-toastr';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

@Component({
  selector: 'app-intercative-map',
  imports: [ReactiveFormsModule],
  templateUrl: './intercative-map.component.html',
  styleUrl: './intercative-map.component.scss'
})
export class IntercativeMapComponent {
  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche
  router = inject(Router);  //permette la navigazione

  submittedStep3 = false;  //flag dello stato di invio del form
  step3Form = new FormGroup({ //form per il login
    indirizzo: new FormControl('', [Validators.required]), //campo di input dell'username
  })
  
  query: string = ''; 
  suggestions: any[] = [];

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  @Output() backStepEvent = new EventEmitter<void>();

  ngOnInit() {
    // Recupera la configurazione della mappa dal back-end
    this.backendService.getMapConfiguration().subscribe({
      next: (data) => {
        this.initializeMap(data);
      },
      error: (err) => {
        this.toastr.error(err.message, err.statusText);
      }
    });
  }

  handleStep3Form(){
    this.router.navigateByUrl("/homePageAgenteImmobiliare");
  }

  backStep(){
    this.backStepEvent.emit();
  }

  private initializeMap(config: any) {
    const map = new L.Map(this.mapContainer.nativeElement).setView(
      [config.initialState.lat, config.initialState.lng],
      config.initialState.zoom
    );

    map.attributionControl.setPrefix("").addAttribution('');

    L.mapboxGL({
      style: `${config.mapStyle}?apiKey=${config.myAPIKey}`,
      accessToken: `${config.mapBoxToken}`
    }).addTo(map);
  }

  onInputChange(): void {
    if(this.step3Form.value.indirizzo != null){
      this.query=this.step3Form.value.indirizzo;
    
      if (this.query.length > 2) {
        this.backendService.getSuggestions(this.query).subscribe({
          next: (data) => {
            this.suggestions = data /*as any[] || []*/;
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
    this.query = suggestion.properties.formatted; // Mostra l'indirizzo selezionato
    this.suggestions = [];
  }
}