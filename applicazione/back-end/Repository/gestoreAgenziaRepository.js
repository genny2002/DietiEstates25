
import { GestoreAgenzia } from "../Repository/database.js";

export class GestoreAgenziaRepository {

    static async checkGestoreByUsernamePassword(usrname, psw){
        try {
            let found = await GestoreAgenzia.findOne({    //controlla se esiste un utente con le credenziali ricevute
                where: {
                    username: usrname,
                    password: psw
                }
            });

            return found !== null;
        } catch (err) {
            console.error("Error in checkGestoreByUsernamePassword:", err);
            throw err;
        }
    }

    static async insertGestoreAgenzia(gestoreAgenziaDaCreare){
        try {
            return await GestoreAgenzia.create(gestoreAgenziaDaCreare);
        } catch (err) {
            console.error("Error in insertGestoreAgenzia:", err);
            throw err;
        }
    }

    static async gestoreAgenziaCambioPassword(username, password){
        try {
            let gestoreAgenzia = await GestoreAgenzia.findByPk(username);
            if(gestoreAgenzia === null){
                throw new Error("utente non trovato");
            }
            gestoreAgenzia.password = password;
            gestoreAgenzia.primoAccesso = false;
            return await gestoreAgenzia.save();
        } catch (err) {
            console.error("Error in gestoreAgenziaCambioPassword:", err);
            throw err;
        }
    }

    static async getPrimoAccesso(username){
        try {
            let gestoreAgenzia = await GestoreAgenzia.findByPk(username);
            if(gestoreAgenzia === null){
                throw new Error("utente non trovato");
            }
            return gestoreAgenzia.primoAccesso;
        } catch (err) {
            console.error("Error in getPrimoAccesso:", err);
            throw err;
        }
    }

    static async getOldPassword(username){
        try {
            let gestoreAgenzia = await GestoreAgenzia.findByPk(username);
            if(gestoreAgenzia === null){
                throw new Error("utente non trovato");
            }
            return gestoreAgenzia.password;
        } catch (err) {
            console.error("Error in getOldPassword:", err);
            throw err;
        }
    }
}
