import express from "express";
import { EmailService } from "../Service/emailService.js";

export const emailController = express.Router();

emailController.post('/sendEmail', async (req, res, next) => {
    try {
        const response = await EmailService.sendEmail(req, res);
        res.status(200).json(response);
    } catch (err) {
        // Log dell'errore
        console.error('Errore:', err.message);

        // Passa l'errore al middleware di gestione degli errori
        next({ status: 400, message: err.message || "Errore durante l'invio dell'email" });
    }
});
