import express from "express";
import { CollaboratoreService } from "../Service/collaboratoreService.js";

export const collaboratoreController = express.Router();

collaboratoreController.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});

collaboratoreController.post("/gestoreAgenzia/insertCollaboratore", async (req, res, next) => {
    try {
        const Collaboratore = await CollaboratoreService.insertCollaboratore(req, res);
        res.status(201).json(Collaboratore);
    } catch (err) {
        if (err.message === "impossibile creare un utente con queste credenziali") {
            return res.status(409).json({ message: err.message });
        }
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});