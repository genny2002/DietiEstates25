import axios from 'axios';

const GEOAPIFY_API_KEY = "8cb9e657dbaf434fb522fad850eeafb0";
const MAPBOX_TOKEN = "pk.eyJ1IjoiZ2VubnkwMDIiLCJhIjoiY201bWRpeGd4MXdhazJrc2ZsNWJuN295byJ9.CmVpz5NMWkqZMraUwMD-Hg";

export class MapService {
  static getMapConfig(){
    return {
      mapBoxToken: MAPBOX_TOKEN,
      myAPIKey: GEOAPIFY_API_KEY,
      mapStyle: "https://maps.geoapify.com/v1/styles/osm-carto/style.json",
      initialState: {
        lng: 12,
        lat: 42,
        zoom: 4.5
      }
    };
  }

  static async getAutocomplete(req, res) {
    if (!req.params.query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete`,
        {
          params: {
            text: req.params.query,
            apiKey: GEOAPIFY_API_KEY,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return { error: 'Failed to fetch data from Geoapify' };
    }
  }

  static async getGeocode(req, res) {
    let address = req.params.address;
  
    console.log("indirizzo inserito nella richiesta: " +address);

    if (!address) {
      return res.status(400).json({ error: 'L\'indirizzo è obbligatorio' });
    }



    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search`,
        {
          params: {
            text: address,
            apiKey: GEOAPIFY_API_KEY,
          },
        }
      );
      const results = response.data.features || [];
      if (results.length > 0) {
        const coords = results.map(feature => ({
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
        }));
        res.status(200).json(coords);
      } else {
        res.status(404).json({ error: 'Indirizzo non trovato' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Errore del server' });
    }
  }
}