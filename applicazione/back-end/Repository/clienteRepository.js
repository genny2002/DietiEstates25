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

    static async signUp(usrname, psw, email){
        let cliente = new Cliente({   //dati dell'utente da inserire
            username: usrname,
            password: psw,
            email: email
        });

        return cliente.save();
    }
}