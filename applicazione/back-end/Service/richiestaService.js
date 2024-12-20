
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
            const { sort, mode, stato, AgenteImmobiliareUsername } = req.query;
            
            let richieste=await RichiestaRepository.getRichiesteDopoOggi();
            
            if (stato) {
                richieste = richieste.filter(item => item.stato === stato);
            }

            if (AgenteImmobiliareUsername) {
                richieste = richieste.filter(item => item.AgenteImmobiliareUsername === AgenteImmobiliareUsername);
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

}