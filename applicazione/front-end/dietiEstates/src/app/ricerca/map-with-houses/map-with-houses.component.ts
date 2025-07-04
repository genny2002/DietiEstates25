import { Component, ViewChild, ElementRef, inject, EventEmitter, Output, Input, Renderer2, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { BackendService } from '../../_services/backend/backend.service';
import { AnnuncioGet } from '../../_services/backend/annuncio.type'
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

@Component({
  selector: 'app-map-with-houses',
  imports: [],
  templateUrl: './map-with-houses.component.html',
  styleUrl: './map-with-houses.component.scss'
})
export class MapWithHousesComponent {
  renderer = inject(Renderer2);
  backendService = inject(BackendService);
  toastr = inject(ToastrService);

  private clickListener?: () => void;
  private map?: L.Map;
  private selectedMarker: any;
  private markersGroup?: L.LayerGroup;

  DefaultIcon = L.icon({
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  @Input() immobili: AnnuncioGet[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['immobili'] && changes['immobili'].currentValue) {
      this.setPointsOnMap();
    }
  }

  ngOnInit() {
    L.Marker.prototype.options.icon = this.DefaultIcon;
  
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

  setPointsOnMap() {
    if (!this.markersGroup && this.map) {
      this.markersGroup = L.layerGroup().addTo(this.map);
    }

    this.markersGroup?.clearLayers();

    this.immobili.forEach((immobile) => {
      this.backendService.getCoordinates(immobile.indirizzo).subscribe({
        next: (data) => {
          const latitude = data[0].latitude;
          const longitude = data[0].longitude;

          if(this.map != null){
            const marker = L.marker([latitude, longitude]).addTo(this.map)
            .bindPopup(immobile.indirizzo || 'Indirizzo')

            this.markersGroup?.addLayer(marker);
          }
        },
        error: (err) => {
          this.toastr.error(err.message, err.statusText);
        }
      });
    });
  }
}
