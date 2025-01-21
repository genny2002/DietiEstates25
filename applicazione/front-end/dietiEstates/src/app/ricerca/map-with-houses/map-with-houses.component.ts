import { Component, ViewChild, ElementRef, inject, EventEmitter, Output, Input, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { BackendService } from '../../_services/backend/backend.service';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

@Component({
  selector: 'app-map-with-houses',
  imports: [],
  templateUrl: './map-with-houses.component.html',
  styleUrl: './map-with-houses.component.scss'
})
export class MapWithHousesComponent {
  renderer = inject(Renderer2); //permette di manipolare il DOM
  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche

  private clickListener?: () => void;
  private map?: L.Map;

  DefaultIcon = L.icon({
    iconUrl: '/marker-icon.png', // Percorso relativo dalla cartella `public`
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41], // Dimensioni predefinite dell'icona
    iconAnchor: [12, 41], // Posizione dell'ancora dell'icona
    popupAnchor: [1, -34], // Posizione dell'ancora del popup
    shadowSize: [41, 41]  // Dimensioni dell'ombra
  });

  @ViewChild('map')
    private mapContainer!: ElementRef<HTMLElement>;

    ngOnInit() {
        L.Marker.prototype.options.icon = this.DefaultIcon;
    
        // Recupera la configurazione della mappa dal back-end
        this.backendService.getMapConfiguration().subscribe({
          next: (data) => {
            this.map=this.initializeMap(data);
          },
          error: (err) => {
            this.toastr.error(err.message, err.statusText);
          }
        });
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
}
