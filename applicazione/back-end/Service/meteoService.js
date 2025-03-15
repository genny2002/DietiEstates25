import axios from "axios";

export class MeteoService {
  static async getMeteo(req) {
    const lat = req.params.lat;
    const lon = req.params.lon;

    if (!lat || !lon) {
      throw new Error("Latitudine e longitudine obbligatorie");
    }

    try {
      const response = await axios.get("https://api.open-meteo.com/v1/forecast",{
        params: {
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
          forecast_days: 14
        },
      });

      let result={
        daily_units: response.data.daily_units,
        daily: response.data.daily
      };

      return result;
    } catch (error) {
      console.error(error);
      return { error: "Failed to fetch data from Open Meteo" };
    } 
  }
}