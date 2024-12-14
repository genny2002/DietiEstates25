
import { Cliente } from "../Repository/database.js";

export class ClienteRepository {

    static async checkClienteByUsernamePassword(usrname, psw){
        try {
            let found = await Cliente.findOne({    //controlla se esiste un utente con le credenziali ricevute
                where: {
                    username: usrname,
                    password: psw
                }
            });

            return found !== null;
        } catch (err) {
            console.error("Error in checkClienteByUsernamePassword:", err);
            throw err;
        }
    }

    static async signUp(usrname, psw, email){
        try {
            let cliente = new Cliente({   //dati dell'utente da inserire
                username: usrname,
                password: psw,
                email: email
            });

            return await cliente.save();
        } catch (err) {
            console.error("Error in signUp:", err);
            throw err;
        }
    }
}



/*import { Cliente } from "../Repository/database.js";

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
}*/