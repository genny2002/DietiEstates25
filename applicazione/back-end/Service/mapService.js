export class MapService {
    static getMapConfig(){
      return {
        mapBoxToken: "pk.eyJ1IjoiZ2VubnkwMDIiLCJhIjoiY201bWRpeGd4MXdhazJrc2ZsNWJuN295byJ9.CmVpz5NMWkqZMraUwMD-Hg",
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