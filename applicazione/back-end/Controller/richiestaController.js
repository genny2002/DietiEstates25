import express from "express";
import { RichiestaService } from "../Service/richiestaService.js";

export const richiestaController = express.Router();

richiestaController.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});

richiestaController.post("/insertRichiesta", async (req, res, next) => { 
    try {
        const Richiesta = await RichiestaService.insertRichiesta(req, res);
        res.status(201).json(Richiesta);
    } catch (err) {
        console.error(err);
        if (err.message === "impossibile creare un utente con queste credenziali") {
            return res.status(409).json({ message: err.message });
        }
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
} );

richiestaController.get("/getRichiesta", async (req, res, next) => {
    try {
        const Richiesta = await RichiestaService.getRichiesta(req, res);
        res.status(200).json(Richiesta);
    } catch (err) {
        console.error(err);
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});