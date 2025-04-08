import { Collaboratore } from "../Repository/database.js";

export class CollaboratoreRepository {

    static async checkCollaboratoreByUsernamePassword(usrname, psw){
        try {
            let found = await Collaboratore.findOne({    //controlla se esiste un utente con le credenziali ricevute
                where: {
                    username: usrname,
                    password: psw
                }
            });
            return found !== null;
        } catch (err) {
            console.error("Error in checkCollaboratoreByUsernamePassword:", err);
            throw err;
        }
    }

    static async insertCollaboratore(collaboratoreDaCreare){
        try {
            const collaboratore = await Collaboratore.create(collaboratoreDaCreare);
            return collaboratore;
        } catch (err) {
            console.error("Error in insertCollaboratore:", err);
            throw err;
        }
    }

    static async getCollaboratore(){
        try {
            const collaboratore = await Collaboratore.findAll();
            return collaboratore;
        } catch (err) {
            console.error("Error in getCollaboratore:", err);
            throw err;
        }
    }

    static async getCollaboratoreByUsername(username){
        try {
            const collaboratore = await Collaboratore.findByPk(username);
            return collaboratore;
        } catch (err) {
            console.error("Error in getCollaboratoreByUsername:", err);
            throw err;
        }
    }

    static async getUsername(){
        try {
            let collaboratori = await Collaboratore.findAll({ attributes: ['username'] });
            let usernames = collaboratori.map(collaboratore => collaboratore.username);
            return usernames;
        } catch (err) {
            console.error("Error in getClienteByUsername:", err);
            throw err;
        }
    }
}