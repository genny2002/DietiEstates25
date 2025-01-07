import express from "express";
import { MapService } from "../Service/mapService.js";

export const mapController = express.Router();

const GEOAPIFY_API_KEY = "8cb9e657dbaf434fb522fad850eeafb0"; // Sostituisci con la tua chiave API

mapController.get('/api/map-config', (req, res) => {
  try {
          const mapConfig = MapService.getMapConfig();
          res.status(200).json(mapConfig);
      } catch (err) {
          console.error(err);
          next({ status: 500, message: err.message || "Errore durante la configurazione della mappa" });
      }
});