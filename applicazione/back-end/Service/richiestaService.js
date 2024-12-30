
import {RichiestaRepository} from "../Repository/richiestaRepository.js";
import moment from 'moment';

export class RichiestaService {

    static async insertRichiesta(req, res) {
        try {

            await RichiestaService.controlloRichiesta(req);
            
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

    static async controlloRichiesta(req) {
        const richieste = await RichiestaRepository.getRichiesteGiornoX(req.body.AgenteImmobiliareUsername, req.body.data);
        const nuovaRichiestaData = moment(req.body.data);

        // Controlla se l'orario è tra le 8 e le 18
        const ora = nuovaRichiestaData.hour();
        if (ora < 8 || ora > 18) {
            throw new Error('L\'orario della richiesta deve essere compreso tra le 8 e le 18.');
        }

        for (let richiesta of richieste) {
            const differenzaOre = nuovaRichiestaData.diff(moment(richiesta.data), 'hours');
            if (Math.abs(differenzaOre) < 2) {
                throw new Error('La nuova richiesta deve essere distante almeno due ore da ogni altra richiesta esistente.');
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
            const stato = req.body.stato;
            const offerta = req.body.offerta;
            const data = req.body.data;
            return await RichiestaRepository.updateRichiesta(id, stato, offerta, data);
        } catch (err) {
            console.error("Error in updateRichiesta:", err);
            throw err;
        }
    }



}