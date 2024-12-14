import { AgenteImmobiliare } from "../Repository/database.js";

export class AgenteImmobiliareRepository {

    static async checkAgenteImmobiliareByUsernamePassword(usrname, psw){
        try {
            let found = await AgenteImmobiliare.findOne({    //controlla se esiste un utente con le credenziali ricevute
                where: {
                    username: usrname,
                    password: psw
                }
            });

            return found !== null;
        } catch (err) {
            console.error("Error in checkAgenteImmobiliareByUsernamePassword:", err);
            throw err;
        }
    }

    static async insertAgenteImmobiliare(agenteImmobiliareDaCreare) {
        try {
            const agenteImmobiliare = await AgenteImmobiliare.create(agenteImmobiliareDaCreare);
            return agenteImmobiliare;
        } catch (err) {
            console.error("Error in insertAgenteImmobiliare:", err);
            throw err;
        }
    }
}




/*import { AgenteImmobiliare } from "../Repository/database.js";

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
}*/