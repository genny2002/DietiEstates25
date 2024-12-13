import { AnnuncioRepository } from "../Repository/annuncioRepository.js";

export class AnnuncioService {

    

    static async insertAnnuncio(req, res, next) { 
        try {
            // Ottieni i percorsi delle immagini caricate
            const AnnuncioDaCreare = {
                foto: req.files.map(file => file.path),
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
                Categorie: req.body.Categorie,
            };

            console.log("AnnuncioDaCreare:", AnnuncioDaCreare); // Log dei dati da inserire

            const Annuncio = await AnnuncioRepository.insertAnnuncio(AnnuncioDaCreare);
            res.status(201).json(Annuncio);
        } catch (err) {
            console.error("Errore durante l'inserimento dell'annuncio:", err); // Log dell'errore
            if (err.message === "credenziali già usate") {
                return res.status(409).json({ message: err.message });
            }
            next({ status: 500, message: err.message || "Errore durante la registrazione" });
        }
    }
}