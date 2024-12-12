import express from "express";
import { AnnuncioService } from "../Service/annuncioService.js";

export const AnunncioController = express.Router();

AnunncioController.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});


AnunncioController.post("/insertAnnuncio", async (req, res, next) => {
    try {
        const annuncio = await AnnuncioService.insertAnnuncio(req, res);
        res.status(201).json(annuncio);
    } catch (err) {
        if (err.message === "impossibile creare un annuncio con queste credenziali") {
            return res.status(409).json({ message: err.message });
        }
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});