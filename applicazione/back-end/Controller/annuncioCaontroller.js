import express from "express";
import { AnnuncioService } from "../Service/annuncioService.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

export const anunncioController = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../img/')); // directory dove salvare le immagini
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // nome del file
    }
});

const upload = multer({ storage: storage });

const uploadImages = (fieldName, maxCount) => {
    return upload.array(fieldName, maxCount);
};

anunncioController.post("/upload/:numeroImg", (req, res, next) => {
    const numeroImg = parseInt(req.params.numeroImg, 10);
    const uploadMiddleware = uploadImages('foto', numeroImg);
    uploadMiddleware(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        next();
    });
}, async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }
        const filePaths = req.files.map(file => path.relative(path.join(__dirname, '../'), file.path));
        const annuncio = await AnnuncioService.createAnnuncio(req.body, filePaths);
        res.status(201).json(annuncio);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

anunncioController.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});