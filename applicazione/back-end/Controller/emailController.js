import express from "express";
import { EmailService } from "../Service/emailService.js";

export const emailController = express.Router();

emailController.post('/sendEmail', (req, res) => {
    try {
          const response = EmailService.sendEmail(req, res);
          res.status(200).json(response);
      } catch (err) {
          console.error(err);
          next({ status: 500, message: err.message || "Errore durante la configurazione della mappa" });
      }
});
