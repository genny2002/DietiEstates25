
import {RichiestaRepository} from "../Repository/richiestaRepository.js";

export class RichiestaService {

    static async insertRichiesta(req, res) {
        try {
            const richiestaDaCreare ={
                stato: req.body.stato,
                offerta: req.body.offerta,
                data: req.body.data,
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

    static async getRichiesta(req, res) {
        try {
            const { sort, mode, stato, AgenteImmobiliareUsername, dataSelected } = req.query;
            
            let richieste=await RichiestaRepository.getRichiesteDopoOggi();
            
            if (stato) {
                richieste = richieste.filter(item => item.stato === stato);
            }

            if (AgenteImmobiliareUsername) {
                richieste = richieste.filter(item => item.AgenteImmobiliareUsername === AgenteImmobiliareUsername);
            }

            if (dataSelected) {
                // Creiamo un oggetto Date per la data selezionata (senza orario)
                const selectedDate = new Date(dataSelected);
                selectedDate.setHours(0, 0, 0, 0); // Impostiamo a mezzanotte per evitare differenze di orario
    
                richieste = richieste.filter(item => {
                    // Creiamo una data per ogni richiesta e impostiamo anche questa a mezzanotte
                    const itemDate = new Date(item.data);
                    itemDate.setHours(0, 0, 0, 0);
                    return itemDate.getTime() === selectedDate.getTime(); // Confrontiamo solo giorno, mese e anno
                });
            }

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

            return richieste
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


    static async RichiestaRisposta(req, res) {
        try {
            const id = req.params.id;
            const stato = req.params.stato;
            return await RichiestaRepository.RichiestaRisposta(id, stato);
        } catch (err) {
            console.error("Error in RichiestaRisposta:", err);
            throw err;
        }
    }

}