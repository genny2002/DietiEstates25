import express from "express";
import { MeteoService } from "../Service/meteoService.js";

export const meteoContoller = express.Router();

meteoContoller.get('/meteo/:lat/:lon', async (req, res) => {
    try {
      const data = await MeteoService.getMeteo(req);

      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
  });