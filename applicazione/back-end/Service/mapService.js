export class MapService {
    static getMapConfig(){
      return {
        myAPIKey: "8cb9e657dbaf434fb522fad850eeafb0",
        mapStyle: "https://maps.geoapify.com/v1/styles/osm-carto/style.json",
        initialState: {
          lng: 12,
          lat: 42,
          zoom: 4.5
        }
      };
    }
}