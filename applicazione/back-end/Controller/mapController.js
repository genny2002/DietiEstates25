import express from "express";
import { MapService } from "../Service/mapService.js";

export const mapController = express.Router();

mapController.get('/api/map-config', (req, res) => {
    try {
          const mapConfig = MapService.getMapConfig();
          res.status(200).json(mapConfig);
      } catch (err) {
          console.error(err);
          next({ status: 500, message: err.message || "Errore durante la configurazione della mappa" });
      }
});

mapController.get('/autocomplete/:query', async (req, res) => {
    try {
        const response = await MapService.getAutocomplete(req, res);
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch data from Geoapify' });
    }
  });