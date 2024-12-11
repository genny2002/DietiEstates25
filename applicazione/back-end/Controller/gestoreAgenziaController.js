import express from "express";
import { GestoreAgenziaService } from "../Service/gestoreAgenziaService.js";

export const gestoreAgenziaController = express.Router();

gestoreAgenziaController.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});

gestoreAgenziaController.post("/insertGestoreAgenzia", async (req, res, next) => {
    try {
        const gestoreAgenzia = await GestoreAgenziaService.insertGestoreAgenzia(req, res);
        res.status(201).json(gestoreAgenzia);
    } catch (err) {
        if (err.message === "impossibile creare un utente con queste credenziali") {
            return res.status(409).json({ message: err.message });
        }
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});


gestoreAgenziaController.post("/gestoreAgenziaCambioPassword", async (req, res, next) => {
    try {
        const gestoreAgenzia = await GestoreAgenziaService.gestoreAgenziaCambioPassword(req, res);
        res.status(201).json(gestoreAgenzia);
    } catch (err) {
        if (err.message === "impossibile creare un utente con queste credenziali") {
            return res.status(409).json({ message: err.message });
        }
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});