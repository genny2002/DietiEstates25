import express from "express";
import { AnnuncioService } from "../Service/annuncioService.js";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import { fileURLToPath } from "url";

export const annuncioController = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura AWS S3
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const storage = multer.memoryStorage(); // Usa la memoria per gestire i file prima di inviarli a S3
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 }});

annuncioController.post("/upload/:numeroImg", upload.array("foto"), async (req, res) => {
    try {
        const numeroImg = parseInt(req.params.numeroImg, 10);

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        if (req.files.length > numeroImg) {
            return res.status(400).json({ error: `Maximum ${numeroImg} files allowed` });
        }

        const uploadedFiles = [];

        for (const file of req.files) {
            const fileName = `${Date.now()}-${file.originalname}`;
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
                //ACL: "public-read",
            };

            // Carica il file su S3
            await s3Client.send(new PutObjectCommand(params));

            const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
            uploadedFiles.push(fileUrl);
        }

        // Creare l'annuncio usando i file caricati
        const annuncio = await AnnuncioService.createAnnuncio(req.body, uploadedFiles);
        res.status(201).json(annuncio);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message, stack: err.stack });
    }
});

annuncioController.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});

annuncioController.get("/download/annunci", async (req, res) => {
    try {
        const annunci = await AnnuncioService.getAnnunci(req);
        const annunciConImmagini = annunci.map(annuncio => {
            const immagini = JSON.parse(annuncio.foto).map(url => ({
                url,
                nome: path.basename(url)
            }));

            return {
                ...annuncio.dataValues,
                immagini
            };
        });

        res.status(200).json(annunciConImmagini);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

annuncioController.delete("/deleteAnnuncio/:id", async (req, res, next) => {
    try {
        const Annuncio = await AnnuncioService.deleteAnnuncio(req, res);
        res.status(200).json(Annuncio);
    } catch (err) {
        console.error(err);
        next({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});
