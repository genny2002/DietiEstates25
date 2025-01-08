import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { BackendService } from '../../_services/backend/backend.service';
import { ToastrService } from 'ngx-toastr';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

@Component({
  selector: 'app-intercative-map',
  imports: [],
  templateUrl: './intercative-map.component.html',
  styleUrl: './intercative-map.component.scss'
})
export class IntercativeMapComponent {
  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

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
}