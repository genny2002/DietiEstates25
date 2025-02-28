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


    static async getAgente(username) {
        try {
            let agente = await AgenteImmobiliare.findByPk(username, { attributes: ['email'] });
            return agente ? agente.email : null;
        } catch (err) {
            console.error("Error in AgenteImmobiliare:", err);
            throw err;
        }
    }
}