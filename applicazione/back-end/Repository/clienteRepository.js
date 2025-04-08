
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

    static async getClienteByUsername(username){
        try {
            let cliente = await Cliente.findByPk(username, { attributes: ['email'] });
            return cliente ? cliente.email : null;
        } catch (err) {
            console.error("Error in getClienteByUsername:", err);
            throw err;
        }
    }

    static async getUsername(){
        try {
            let clienti = await Cliente.findAll({ attributes: ['username'] });
            let usernames = clienti.map(cliente => cliente.username);
            return usernames;
        } catch (err) {
            console.error("Error in getClienteByUsername:", err);
            throw err;
        }
    }
        
}