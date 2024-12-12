import express from "express";
import { AnnuncioService } from "../Service/annuncioService.js";
import multer from 'multer';


export const AnunncioController = express.Router();

const upload = multer({ dest: '../img/' });



AnunncioController.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});


// Usa multer per gestire l'upload di più immagini nel percorso /insertAnnuncio
AnunncioController.post("/insertAnnuncio/:maxPhotos", (req, res, next) => {
    const maxPhotos = parseInt(req.params.maxPhotos, 10);
    const uploadPhotos = upload.array('foto', maxPhotos);

    uploadPhotos(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            const annuncio = await AnnuncioService.insertAnnuncio(req, res, next);
            res.status(201).json(annuncio);
        } catch (err) {
            if (err.message === "impossibile creare un annuncio con queste credenziali") {
                return res.status(409).json({ message: err.message });
            }
            next({ status: 500, message: err.message || "Errore durante la registrazione" });
        }
    });
});