import { Component, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';


@Component({
  selector: 'app-intercative-map',
  imports: [],
  templateUrl: './intercative-map.component.html',
  styleUrl: './intercative-map.component.scss'
})
export class IntercativeMapComponent {
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    const myAPIKey = "8cb9e657dbaf434fb522fad850eeafb0";
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";

    const initialState = {
      lng: 12,
      lat: 42,
      zoom: 4.5
    };

    const map = new L.Map(this.mapContainer.nativeElement).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );

    // the attribution is required for the Geoapify Free tariff plan
    map.attributionControl
      .setPrefix("")
      .addAttribution('');

    L.mapboxGL({
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      accessToken: "no-token"
    }).addTo(map);
  }
}
