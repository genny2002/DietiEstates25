import express from "express";
import { EmailService } from "../Service/emailService.js";

export const emailController = express.Router();

emailController.post('/sendEmail', async (req, res, next) => {
    try {
        const response = await EmailService.sendEmail(req, res);
        res.status(200).json(response);
    } catch (err) {
        console.error('Errore:', err.message);
        next({ status: 400, message: err.message || "Errore durante l'invio dell'email" });
    }
});
