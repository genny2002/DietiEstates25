import { Cliente } from "../Repository/database.js";

export class ClienteRepository {

    static async checkClienteByUsernamePassword(usrname, psw){
        let found = await Cliente.findOne({    //controlla se esiste un utente con le credenziali ricevute
            where: {
                username: usrname,
                password: psw
            }
        });

        return found !== null;
    }
}