import { AnnuncioRepository } from "../Repository/annuncioRepository.js";

export class AnnuncioService {
    static async createAnnuncio(data, filePaths) {
        try {
            const AnnuncioDaCreare = {
                foto: JSON.stringify(filePaths), // salva i percorsi delle immagini come stringa JSON
                descrizione: data.descrizione,
                prezzo: data.prezzo,
                dimesioni: data.dimesioni,
                indirizzo: data.indirizzo,
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

    static async getAnnunci() {
        try {
            return await AnnuncioRepository.getAnnunci();
        } catch (err) {
            console.error("Errore durante il recupero degli annunci:", err); // Log dell'errore
            throw err;
        }
    }


    /* static async getAnnunci(req) {
    try {
        const { sort, mode, ...filters } = req.query;

        let annunci = await AnnuncioRepository.getAnnunci();

        // Apply filters
        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                annunci = annunci.filter(item => item[key] === value);
            }
        }

        // Apply sorting
        if (sort) {
            annunci.sort((a, b) => {
                if (mode === 'asc') {
                    return a[sort] > b[sort] ? 1 : -1;
                } else if (mode === 'desc') {
                    return a[sort] < b[sort] ? 1 : -1;
                }
                return 0;
            });
        }

        return annunci;
    } catch (err) {
        console.error("Errore durante il recupero degli annunci:", err); // Log dell'errore
        throw err;
    }
} */


}