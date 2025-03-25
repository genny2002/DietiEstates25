import { AnnuncioRepository } from "../Repository/annuncioRepository.js";
import { RichiestaRepository } from "../Repository/richiestaRepository.js";

export class AnnuncioService {
    static async createAnnuncio(data, filePaths) {
        try {
            const AnnuncioDaCreare = {
                foto: JSON.stringify(filePaths),
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
            console.error("Errore durante l'inserimento dell'annuncio:", err);
            throw err;
        }
    }

    static async getAnnunci(req) {
        try {
            const {prezzoMin, prezzoMax, dimensioni, indirizzo, numeroStanze, piano, ascensore, classeEnergetica, altriServizi, categoria, sort, mode, id, agent } = req.query;

            if (id) {
                return await this.getAnnuncioById(id);
            }else{
                let annunci = await AnnuncioRepository.getAnnunci();
                
                annunci = this.filterAnnunci(annunci, {
                    prezzoMin,
                    prezzoMax,
                    dimensioni,
                    indirizzo,
                    numeroStanze,
                    piano,
                    ascensore,
                    classeEnergetica,
                    altriServizi,
                    categoria,
                    agent
                });

                annunci = this.sortAnnunci(annunci, sort, mode);
                return annunci;
            }
        } catch (err) {
            console.error("Errore durante il recupero degli annunci:", err);
            throw err;
        }
    }

    static async getAnnuncioById(id) {
        try {
            return [await AnnuncioRepository.getAnnuncioById(id)];
        } catch (err) {
            console.error("Errore durante il recupero dell'annuncio:", err);
            throw err;
        }
    }

    static filterAnnunci(annunci, filters) {
        const {
            prezzoMin,
            prezzoMax,
            dimensioni,
            indirizzo,
            numeroStanze,
            piano,
            ascensore,
            classeEnergetica,
            altriServizi,
            categoria,
            agent
        } = filters;
        
        annunci = AnnuncioService.filterAgent(agent, annunci);
        annunci = AnnuncioService.filterPrezzoMin(prezzoMin, annunci);
        annunci = AnnuncioService.filterPrezzoMax(prezzoMax, annunci);
        annunci = AnnuncioService.filterDimensioni(dimensioni, annunci);
        annunci = AnnuncioService.filterIndirizzo(indirizzo, annunci);
        annunci = AnnuncioService.filterNumeroStanze(numeroStanze, annunci);
        annunci = AnnuncioService.filterPiano(piano, annunci);
        annunci = AnnuncioService.filterAscensore(ascensore, annunci);
        annunci = AnnuncioService.filterClasseEnergetica(classeEnergetica, annunci);
        annunci = AnnuncioService.filterAltriServizi(altriServizi, annunci);
        annunci = AnnuncioService.filterCategoria(categoria, annunci);

        return annunci;
    }

    static filterAgent(agent, annunci) {
        console.log(agent); 
        console.log(annunci);
        if (agent) {
            annunci = annunci.filter(item => item.AgenteImmobiliareUsername == agent);
        }
        return annunci;
    }

    static filterCategoria(categoria, annunci) {
        if (categoria) {
            annunci = annunci.filter(item => item.categoria == categoria);
        }
        return annunci;
    }

    static filterAltriServizi(altriServizi, annunci) {
        if (altriServizi) {
            if (altriServizi.includes("portineria")) {
                annunci = annunci.filter(item => item.altriServizi.includes("portineria:true"));
            }
            if (altriServizi.includes("climatizzazione")) {
                annunci = annunci.filter(item => item.altriServizi.includes("climatizzazione:true"));
            }
        }
        return annunci;
    }

    static filterClasseEnergetica(classeEnergetica, annunci) {
        if (classeEnergetica) {
            annunci = annunci.filter(item => item.classeEnergetica.includes(classeEnergetica));
        }
        return annunci;
    }

    static filterAscensore(ascensore, annunci) {
        if (ascensore) {
            annunci = annunci.filter(item => item.ascensore);
        }
        return annunci;
    }

    static filterPiano(piano, annunci) {
        if (piano) {
            annunci = annunci.filter(item => item.piano == piano);
        }
        return annunci;
    }

    static filterNumeroStanze(numeroStanze, annunci) {
        if (numeroStanze) {
            annunci = annunci.filter(item => item.numeroStanze == numeroStanze);
        }
        return annunci;
    }

    static filterIndirizzo(indirizzo, annunci) {
        if (indirizzo) {
            const paroleIndirizzo = indirizzo.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);

            for (const parola of paroleIndirizzo) {
                annunci = annunci.filter(item => item.indirizzo.toLowerCase().replace(/[^a-z0-9\s]/g, '').includes(parola));
            }
        }
        return annunci;
    }

    static filterDimensioni(dimensioni, annunci) {
        if (dimensioni) {
            annunci = annunci.filter(item => item.dimensioni >= dimensioni);
        }
        return annunci;
    }

    static filterPrezzoMax(prezzoMax, annunci) {
        if (prezzoMax) {
            annunci = annunci.filter(item => item.prezzo <= prezzoMax);
        }
        return annunci;
    }

    static filterPrezzoMin(prezzoMin, annunci) {
        if (prezzoMin) {
            annunci = annunci.filter(item => item.prezzo >= prezzoMin);
        }
        return annunci;
    }

    static sortAnnunci(annunci, sort, mode) {
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

    static async deleteAnnuncio(req, res) {
        try {
            const id = req.params.id;
            //richieste=RichiestaRepository.deleteRichiestaByAnnuncioID(id);
            return await AnnuncioRepository.deleteAnnuncio(id);
        } catch (err) {
            console.error("Error in deleteAnnuncio:", err);
            throw err;
        }
    }
}