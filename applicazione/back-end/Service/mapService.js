import axios from 'axios';

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

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

  static async getGeocode(req) {
    const address = req.params.address;
    if (!address) throw new Error('L\'indirizzo è obbligatorio');
  
    const response = await axios.get(`https://api.geoapify.com/v1/geocode/search`, {
      params: { text: address, apiKey: GEOAPIFY_API_KEY },
    });
    const results = response.data.features || [];
    if (results.length > 0) {
      return results.map(feature => ({
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
      }));
    } else {
      throw new Error('Indirizzo non trovato');
    }
  }
}