import { AnnuncioRepository } from "../Repository/annuncioRepository.js";
import { AgenteImmobiliare } from "../Repository/database.js";

export class AnnuncioService {
    static async createAnnuncio(data, filePaths) {
        try {
            const AnnuncioDaCreare = {
                foto: JSON.stringify(filePaths), // salva i percorsi delle immagini come stringa JSON
                descrizione: data.descrizione,
                prezzo: data.prezzo,
                dimensioni: data.dimensioni,
                indirizzo: data.indirizzo,
                numeroStanze: data.numeroStanze,
                piano: data.piano,
                ascensore: data.ascensore,
                classeEnergetica: data.classeEnergetica,
                altriServizi: data.altriServizi,
                categoria: data.categoria,
                AgenteImmobiliareUsername: data.AgenteImmobiliareUsername
            };

            return await AnnuncioRepository.insertAnnuncio(AnnuncioDaCreare);
        } catch (err) {
            console.error("Errore durante l'inserimento dell'annuncio:", err); // Log dell'errore
            throw err;
        }
    }

    static async getAnnunci(req) {
        try {
            const {prezzoMin, prezzoMax, dimensioni, indirizzo, numeroStanze, piano, ascensore, classeEnergetica, altriServizi, categoria, sort, mode, id } = req.query;

            if (id) {
                try {
                    let annunci = [await AnnuncioRepository.getAnnuncioById(id)];

                    return annunci;
                } catch (err) {
                    console.error("Errore durante il recupero dell'annuncio:", err); // Log dell'errore
                    throw err;
                }
            }else{
                let annunci = await AnnuncioRepository.getAnnunci();
    
                if (prezzoMin ) {
                    annunci = annunci.filter(item => item.prezzo >= prezzoMin);
                }
                if (prezzoMax) {
                    annunci = annunci.filter(item => item.prezzo <= prezzoMax);
                }
                if (dimensioni) {
                    annunci = annunci.filter(item => item.dimensioni >= dimensioni);
                }
                if (indirizzo) {
                    const paroleIndirizzo = indirizzo.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);

                    for (const parola of paroleIndirizzo) {
                        annunci = annunci.filter(item => item.indirizzo.toLowerCase().replace(/[^a-z0-9\s]/g, '').includes(parola));
                    }
                }
                if (numeroStanze) {
                    annunci = annunci.filter(item => item.numeroStanze == numeroStanze);
                }
                if (piano) {
                    annunci = annunci.filter(item => item.piano == piano);
                }
                if (ascensore) {
                    annunci = annunci.filter(item => item.ascensore == true);
                }
                if (classeEnergetica) {
                    annunci = annunci.filter(item => item.classeEnergetica.includes(classeEnergetica));
                }
                if (altriServizi) {
                    if(altriServizi.includes("portineria")){
                        annunci = annunci.filter(item => item.altriServizi.includes("portineria:true"));
                    }
                    if(altriServizi.includes("climatizzazione")){
                        annunci = annunci.filter(item => item.altriServizi.includes("climatizzazione:true"));
                    }
                }
                if (categoria) {
                    annunci = annunci.filter(item => item.categoria == categoria);
                }
                if (sort === 'prezzo') {
                    annunci.sort((a, b) => {
                        if (mode === 'asc') {
                            return a.prezzo - b.prezzo;
                        } else if (mode === 'desc') {
                            return b.prezzo - a.prezzo;
                        }
                        return 0;
                    });
                }
                return annunci;
            }
        } catch (err) {
            console.error("Errore durante il recupero degli annunci:", err); // Log dell'errore
            throw err;
        }
    }
}