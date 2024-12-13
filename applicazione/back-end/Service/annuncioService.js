import { AnnuncioRepository } from "../Repository/annuncioRepository.js";

export class AnnuncioService {
    static async createAnnuncio(data, filePaths) {
        try {
            const AnnuncioDaCreare = {
                foto: JSON.stringify(filePaths), // salva i percorsi delle immagini come stringa JSON
                descrizione: data.descrizione,
                prezzo: data.prezzo,
                dimesioni: data.dimesioni,
                citta: data.citta,
                viaENumeroCivico: data.viaENumeroCivico,
                comune: data.comune,
                numeroDiStanze: data.numeroDiStanze,
                piano: data.piano,
                ascensore: data.ascensore,
                classeEnergetica: data.classeEnergetica,
                altriServizzi: data.altriServizzi,
                Categorie: data.Categorie,
            };

            console.log("AnnuncioDaCreare:", AnnuncioDaCreare); // Log dei dati da inserire

            return await AnnuncioRepository.insertAnnuncio(AnnuncioDaCreare);
        } catch (err) {
            console.error("Errore durante l'inserimento dell'annuncio:", err); // Log dell'errore
            throw err;
        }
    }
}