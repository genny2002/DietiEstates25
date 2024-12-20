
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
            return await RichiestaRepository.getRichiesteDopoOggi();
        } catch (err) {
            console.error("Error in getRichiesta:", err);
            throw err;
        }
    }

}