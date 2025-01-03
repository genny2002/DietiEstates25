import express from "express";

export const mapController = express.Router();

const GEOAPIFY_API_KEY = "8cb9e657dbaf434fb522fad850eeafb0"; // Sostituisci con la tua chiave API

mapController.get("/map-tile", async (req, res) => {
    try {
      const { lat, lon, zoom } = req.query; // Parametri della mappa
      const tileUrl = `https://maps.geoapify.com/v1/tile/{z}/{x}/{y}.png?apiKey=8cb9e657dbaf434fb522fad850eeafb0`;
      
      // Chiamata alla Geoapify Map Tiles API
      const response = await axios.get(tileUrl, {
        params: { lat, lon, zoom },
        responseType: "arraybuffer", // Per gestire le immagini
      });
  
      res.set("Content-Type", "image/png"); // Imposta il tipo di contenuto
      res.send(response.data); // Invia l'immagine della mappa come risposta
    } catch (error) {
      console.error("Errore nel recuperare la mappa", error);
      res.status(500).json({ error: "Impossibile ottenere la mappa." });
    }
  });