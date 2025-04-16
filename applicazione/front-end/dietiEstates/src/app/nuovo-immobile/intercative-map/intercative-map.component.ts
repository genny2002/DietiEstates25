import { Component, ViewChild, ElementRef, inject, EventEmitter, Output, Input, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../_services/backend/backend.service';
import { ToastrService } from 'ngx-toastr';
import { Annuncio } from '../../_services/backend/annuncio.type';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

@Component({
  selector: 'app-intercative-map',
  imports: [ReactiveFormsModule],
  templateUrl: './intercative-map.component.html',
  styleUrl: './intercative-map.component.scss'
})
export class IntercativeMapComponent {
  backendService = inject(BackendService);
  toastr = inject(ToastrService);
  router = inject(Router);
  renderer = inject(Renderer2);

  submittedStep3 = false;
  step3Form = new FormGroup({
    indirizzo: new FormControl('', [Validators.required]),
  })

  private clickListener?: () => void;
  query: string = ''; 
  suggestions: any[] = [];
  showMessage: boolean = false;

  private map?: L.Map;
  private selectedMarker: any;

  DefaultIcon = L.icon({
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  @Input() nuovoAnnuncio!: Annuncio;
  submittedStep3Form: boolean = false;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  @Output() backStepEvent = new EventEmitter<void>();
  @Output() immobileAggiunto = new EventEmitter<void>();

  ngOnInit() {
    L.Marker.prototype.options.icon = this.DefaultIcon;

    this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
      this.onDocumentClick(event);
    });

    this.backendService.getMapConfiguration().subscribe({
      next: (data) => {
        this.map=this.initializeMap(data);
      },
      error: (err) => {
        this.toastr.error(err.message, err.statusText);
      }
    });
  }

  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    if (!target.closest('#indirizzo') && !target.closest('#suggestion-list')) {
      this.suggestions = [];
    }
  }

  onContainerClick(event: Event) {
    event.stopPropagation();
  }

  handleStep3Form(){
    this.nuovoAnnuncio.indirizzo = this.step3Form.value.indirizzo as string;

    this.backendService.createNewAnnuncio(this.nuovoAnnuncio).subscribe({
      error: (err) => {
        this.toastr.error("L'annuncio non è stato creato", "Errore");
      },
      complete: () => {
        this.showMessage=false;
        this.step3Form.reset();
        this.submittedStep3Form = false;
        this.immobileAggiunto.emit();
        this.showMessage = true;
      }
    })
  }

  returnHome(){
    this.router.navigateByUrl("/homePageAgenteImmobiliare");
    this.showMessage = false;
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

    return map;
  }

  onInputChange(): void {
    if(this.step3Form.value.indirizzo != null){
      this.query=this.step3Form.value.indirizzo;
    
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
    this.step3Form.setValue({
      indirizzo: suggestion.properties.formatted
    });

    this.suggestions = [];

    const lat = suggestion.geometry.coordinates[1];
    const lon = suggestion.geometry.coordinates[0];

    if (this.map) {
      this.map.setView([lat, lon], 15);
    }

    if(this.map != null){
      if (this.selectedMarker) {
        this.map.removeLayer(this.selectedMarker);
      }

      this.selectedMarker = L.marker([lat, lon]).addTo(this.map)
        .bindPopup(`<b>${suggestion.properties.formatted}</b>`)
        .openPopup();
    }
  }
}