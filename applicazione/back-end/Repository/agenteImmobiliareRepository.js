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
}