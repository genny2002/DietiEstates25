
import {RichiestaRepository} from "../Repository/richiestaRepository.js";
import moment from 'moment';

export class RichiestaService {

    static async insertRichiesta(req, res) {
        try {
            const date = new Date(req.body.data);
            await RichiestaService.controlloRichiesta( req.body.AgenteImmobiliareUsername, date);
            date.setHours(date.getHours() -1 );

            const richiestaDaCreare ={
                stato: req.body.stato,
                offerta: req.body.offerta,
                data: date,
                ClienteUsername: req.body.ClienteUsername,
                AgenteImmobiliareUsername: req.body.AgenteImmobiliareUsername,
                AnnuncioIDimmobile: req.body.AnnuncioIDimmobile
            }
            return await RichiestaRepository.insertRichiesta(richiestaDaCreare);
        } catch (err) {
            console.error("Error in insertRichiesta:", err);
            throw err;
        }
    }

    static async controlloRichiesta(aggente,date) {
        const richieste = await RichiestaRepository.getRichiesteGiornoX(aggente, date);
        const ora = date.hour;
        if (ora < 8 || ora >= 19) {
            throw new Error('L\'orario della richiesta deve essere compreso tra le 8 e le 18.');
        }
        for (let richiesta of richieste) {
            const dataRichiesta = new Date(richiesta.data);
            const diff = Math.abs(date - dataRichiesta);
            if (diff < 2) {
                throw new Error('deve esserci una differenza di due ore tra una richiesta e l\'altra');
            }
        }

      
    }

    static async getRichiesta(req, res) {
        try {
            const { sort, mode, stato, AgenteImmobiliare, Cliente, dataSelected } = req.query;

            let richieste = await RichiestaRepository.getRichieste();
    
            // Filtro per stato
            if (stato) {
                richieste = richieste.filter(item => item.stato === stato);
            }
    
            // Filtro per AgenteImmobiliareUsername
            if (AgenteImmobiliare) {
                richieste = richieste.filter(item => item.AgenteImmobiliareUsername === AgenteImmobiliare);
            }

            if (Cliente) {
                richieste = richieste.filter(item => item.ClienteUsername === Cliente);
            }
           
            if (dataSelected) {

                // Creiamo un oggetto Date per la data selezionata (senza orario)
                // Impostiamo a mezzanotte per evitare differenze di orario
                //selectedDate.setHours(0, 0, 0, 0);  // Set a midnight
                let dataSelectedWrapper = new Date(dataSelected);
    
                richieste = richieste.filter(item => {
                    // Creiamo una data per ogni richiesta e impostiamo a mezzanotte
                    let itemDate = new Date(item.data);

    
                    // Confrontiamo solo anno, mese e giorno
                    return itemDate.getFullYear() === dataSelectedWrapper.getFullYear() && itemDate.getMonth() === dataSelectedWrapper.getMonth() && itemDate.getDate() === dataSelectedWrapper.getDate();
                });
            }
    
            // Ordinamento (se richiesto)
            if (sort) {
                richieste.sort((a, b) => {
                    if (mode === 'asc') {
                        return a[sort] > b[sort] ? 1 : -1;
                    } else if (mode === 'desc') {
                        return a[sort] < b[sort] ? 1 : -1;
                    }
                    return 0;
                });
            }
    
            return richieste;
        } catch (err) {
            console.error("Error in getRichiesta:", err);
            throw err;
        }
    }


    static async getRichiestaById(req, res) {
        try {
            const id = req.params.id;
            return await RichiestaRepository.getRichiestaById(id);
        } catch (err) {
            console.error("Error in getRichiestaById:", err);
            throw err;
        }
    }


    static async richiestaRisposta(req, res) {
        try {
            const id = req.params.id;
            const stato = req.params.stato;
            return await RichiestaRepository.RichiestaRisposta(id, stato);
        } catch (err) {
            console.error("Error in RichiestaRisposta:", err);
            throw err;
        }
    }

    static async deleteRichiesta(req, res) {
        try {
            const id = req.params.id;
            return await RichiestaRepository.deleteRichiesta(id);
        } catch (err) {
            console.error("Error in deleteRichiesta:", err);
            throw err;
        }
    }


    static async updateRichiesta(req, res) {
        try {
            const id = req.params.id;
            const offerta = req.body.offerta;
            return await RichiestaRepository.updateRichiesta(id, offerta);
        } catch (err) {
            console.error("Error in updateRichiesta:", err);
            throw err;
        }
    }

    static async GetOrariRichiestaDisponibili(req, res) {
        try {
            const agent = req.params.AgenteImmobiliareUsername;
            const rawDate = req.params.data;
            const startDate = new Date(rawDate);
            const results = [];
    
            for (let i = 0; i <= 13; i++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(currentDate.getDate() + i);
                const dateOnly = currentDate.toISOString().split('T')[0];
                const richieste = await RichiestaRepository.getRichiesteByDateOnly(agent, dateOnly);
    
                const orariDisponibili = [];
                for (let hour = 8; hour <= 18; hour += 2) {
                    let disponibile = true;
                    for (const richiesta of richieste) {
                        const oraRichiesta = new Date(richiesta.data).getHours();
                        if (Math.abs(hour - oraRichiesta) < 2) {
                            disponibile = false;
                            break;
                        }
                    }
                }
                if (disponibile) {
                    orariDisponibili.push(`${hour}:00`);
                }
            }

            results.push({ data: dateOnly, orariDisponibili });
        }

        return results;
    } catch (err) {
        console.error("Error in asyncGetOrariRichiestaDisponibili:", err);
        throw err;
    }
}


}