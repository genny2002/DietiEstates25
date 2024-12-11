import { AgenteImmobiliare } from "../Repository/database.js";

export class AgenteImmobiliareRepository {

    static async checkAgenteImmobiliareByUsernamePassword(usrname, psw){
        let found = await AgenteImmobiliare.findOne({    //controlla se esiste un utente con le credenziali ricevute
            where: {
                username: usrname,
                password: psw
            }
        });

        return found !== null;
    }


    static async insertAgenteImmobiliare(agenteImmobiliareDaCreare) {
        try {
            const agenteImmobiliare = await AgenteImmobiliare.create(agenteImmobiliareDaCreare);
            return agenteImmobiliare;
        } catch (err) {
            throw err;
        }
    }
}