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
        } else if (err.message === "L'orario della richiesta deve essere compreso tra le 8 e le 18.") {
            return res.status(400).json({ message: err.message });
        } else if (err.message === "La nuova richiesta deve essere distante almeno due ore da ogni altra richiesta esistente.") {
            return res.status(400).json({ message: err.message });
        }
        next({ status: 500, message: err.message || "Errore durante l'inserimento della richiesta" });
    }
});

richiestaController.get("/getRichiesta", async (req, res, next) => {
    try {
        const Richiesta = await RichiestaService.getRichiesta(req, res);
        res.status(200).json(Richiesta);
    } catch (err) {
        console.error(err);
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});

richiestaController.get("/getRichiestaById/:id", async (req, res, next) => {
    try {
        const Richiesta = await RichiestaService.getRichiestaById(req, res);
        res.status(200).json(Richiesta);
    } catch (err) {
        console.error(err);
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});


richiestaController.put("/cambioStato/:id/:stato", async (req, res, next) => {
    try {
        const Richiesta = await RichiestaService.richiestaRisposta(req, res);
        res.status(200).json(Richiesta);
    } catch (err) {
        console.error(err);
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});


richiestaController.delete("/deleteRichiesta/:id", async (req, res, next) => {
    try {
        const Richiesta = await RichiestaService.deleteRichiesta(req, res);
        res.status(200).json(Richiesta);
    } catch (err) {
        console.error(err);
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});


richiestaController.put("/updateRichiesta/:id", async (req, res, next) => {
    try {
        const Richiesta = await RichiestaService.updateRichiesta(req, res);
        res.status(200).json(Richiesta);
    } catch (err) {
        console.error(err);
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});


richiestaController.get("/getRichiesteGiornoX/:AgenteImmobiliareUsername/:data", async (req, res, next) => {
    try {
        const Richiesta = await RichiestaService.GetOrariRichiestaDisponibili(req, res);
        res.status(200).json(Richiesta);
    } catch (err) {
        console.error(err);
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});