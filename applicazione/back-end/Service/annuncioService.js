import { AnnuncioRepository } from "../Repository/annuncioRepository.js";

export class AnnuncioService {

    static async insertAnnuncio(req, res, next) { 
        try {
            // Ottieni i percorsi delle immagini caricate
            const fotoPaths = req.files.map(file => file.path);

            const AnnuncioDaCreare = {
                foto: fotoPaths, // Salva i percorsi delle immagini come array
                descrizione: req.body.descrizione,
                prezzo: req.body.prezzo,
                dimesioni: req.body.dimesioni,
                citta: req.body.citta,
                viaENumeroCivico: req.body.viaENumeroCivico,
                comune: req.body.comune,
                numeroDiStanze: req.body.numeroDiStanze,
                piano: req.body.piano,
                ascensore: req.body.ascensore,
                classeEnergetica: req.body.classeEnergetica,
                altriServizzi: req.body.altriServizzi,
            };
            const Annuncio = await AnnuncioRepository.insertAnnuncio(AnnuncioDaCreare);
            res.status(201).json(Annuncio);
        } catch (err) {
            if (err.message === "credenziali già usate") {
                return res.status(409).json({ message: err.message });
            }
            next({ status: 500, message: err.message || "Errore durante la registrazione" });
        }
    }
}