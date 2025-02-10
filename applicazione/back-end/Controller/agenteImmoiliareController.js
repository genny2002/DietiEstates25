import express from "express";
import { AgenteImmobiliareService } from "../Service/agenteImmobiliareService.js";

export const agenteImmobiliareController = express.Router();

agenteImmobiliareController.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});

agenteImmobiliareController.post("/gestoreAgenzia/insertAgenteImmobiliare", async (req, res, next) => {
    try {
        const AgenteImmobiliare = await AgenteImmobiliareService.insertAgenteImmobiliare(req, res);
        res.status(201).json(AgenteImmobiliare);
    } catch (err) {
        console.error(err);
        if (err.message === "impossibile creare un utente con queste credenziali") {
            return res.status(409).json({ message: err.message });
        }
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});


agenteImmobiliareController.post("/collaboratore/insertAgenteImmobiliare", async (req, res, next) => {
    try {
        const AgenteImmobiliare = await AgenteImmobiliareService.insertAgenteImmobiliareByCollabboratore(req, res);
        res.status(201).json(AgenteImmobiliare);
    } catch (err) {
        if (err.message === "impossibile creare un utente con queste credenziali") {
            return res.status(409).json({ message: err.message });
        }
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});


agenteImmobiliareController.get("/getAgente/:username", async (req, res, next) => {
    try {
        const agente = await AgenteImmobiliareService.getAgente(req.params.username);
        res.status(200).json(agente);
    } catch (err) {
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});
