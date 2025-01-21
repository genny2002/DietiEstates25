import { AnnuncioRepository } from "../Repository/annuncioRepository.js";
import { AgenteImmobiliare } from "../Repository/database.js";

export class AnnuncioService {
    static async createAnnuncio(data, filePaths) {

        console.log()

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

            console.log("AnnuncioDaCreare:", AnnuncioDaCreare); // Log dei dati da inserire

            return await AnnuncioRepository.insertAnnuncio(AnnuncioDaCreare);
        } catch (err) {
            console.error("Errore durante l'inserimento dell'annuncio:", err); // Log dell'errore
            throw err;
        }
    }

    static async getAnnunci(req) {
        try {
            
                        // ...existing code...
            const {prezzoMin, prezzoMax, dimensioni, indirizzo, numeroStanze, piano, ascensore, classeEnergetica, altriServizi, categoria, sort, mode } = req.query;

            let annunci = await AnnuncioRepository.getAnnunci();
        

           // Filtro per range di prezzo
            if (prezzoMin ) {
                annunci = annunci.filter(item => item.prezzo >= prezzoMin);
            }
            if (prezzoMax) {
                annunci = annunci.filter(item => item.prezzo <= prezzoMax);
            }
            // Filtro per dimensioni
            if (dimensioni) {
            annunci = annunci.filter(item => item.dimensioni >= dimensioni);
            }

            // Filtro per indirizzo
            if (indirizzo) {
                const paroleIndirizzo = indirizzo.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);

                for (const parola of paroleIndirizzo) {
                    annunci = annunci.filter(item => item.indirizzo.toLowerCase().replace(/[^a-z0-9\s]/g, '').includes(parola));
                }
            }

            // Filtro per numeroStanze
            if (numeroStanze) {
            annunci = annunci.filter(item => item.numeroStanze == numeroStanze);
            }

            // Filtro per piano
            if (piano) {
            annunci = annunci.filter(item => item.piano == piano);
            }

            // Filtro per ascensore
            if (ascensore) {
            annunci = annunci.filter(item => item.ascensore == true);
            }

            // Filtro per classeEnergetica
            if (classeEnergetica) {
            annunci = annunci.filter(item => item.classeEnergetica.includes(classeEnergetica));
            }

            // Filtro per altriServizi
            if (altriServizi) {
                if(altriServizi.includes("portineria")){
                    annunci = annunci.filter(item => item.altriServizi.includes("portineria:true"));
                }
                if(altriServizi.includes("climatizzazione")){
                    annunci = annunci.filter(item => item.altriServizi.includes("climatizzazione:true"));
                }
            }

            // Filtro per categoria
            if (categoria) {
            annunci = annunci.filter(item => item.categoria == categoria);
            }

           // Ordinamento su prezzo
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

            // ...existing code...
            return annunci;
        } catch (err) {
            console.error("Errore durante il recupero degli annunci:", err); // Log dell'errore
            throw err;
        }
    }


    static async getAnnuncioById(id) {
        try {
            return await AnnuncioRepository.getAnnuncioById(id);
        } catch (err) {
            console.error("Errore durante il recupero dell'annuncio:", err); // Log dell'errore
            throw err;
        }
    }   

}