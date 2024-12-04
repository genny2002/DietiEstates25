import { GestoreAgenzia } from "../Repository/database.js";

export class GestoreAgenziaRepository {

    static async checkGestoreByUsernamePassword(usrname, psw){
        let found = await GestoreAgenzia.findOne({    //controlla se esiste un utente con le credenziali ricevute
            where: {
                username: usrname,
                password: psw
            }
        });

        return found !== null;
    }
}