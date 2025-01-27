import { fetchWeatherApi } from "openmeteo";

export class MeteoService {
  static async getMeteo(req) {
    const lat = req.params.lat;
    const lon = req.params.lon;

    if (!lat || !lon) {
      throw new Error("Latitudine e longitudine obbligatorie");
    }

    const params = {
      latitude: lat,
      longitude: lon,
      daily: [
        "weathercode",
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "rain_sum",
        "showers_sum",
        "snowfall_sum",
        "precipitation_probability_max",
      ],
      timezone: "GMT",
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    
    return responses;
  }
}