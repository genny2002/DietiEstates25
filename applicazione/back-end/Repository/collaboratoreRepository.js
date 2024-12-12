import { Collaboratore } from "../Repository/database.js";

export class CollaboratoreRepository {

    static async checkCollaboratoreByUsernamePassword(usrname, psw){
        let found = await Collaboratore.findOne({    //controlla se esiste un utente con le credenziali ricevute
            where: {
                username: usrname,
                password: psw
            }
        });
        return found !== null;
    }

    static async insertCollaboratore(collaboratoreDaCreare){
        try {
            const collaboratore = await Collaboratore.create(collaboratoreDaCreare);
            return collaboratore;
        } catch (err) {
            throw err;
        }

    }

    static async getCollaboratore(){
        try {
            const collaboratore = await Collaboratore.findAll();
            return collaboratore;
        } catch (err) {
            throw err;
        }
    }


    static async getCollaboratoreByUsername(username){
        try {
            const collaboratore = await Collaboratore.findByPk(username);
            return collaboratore;
        } catch (err) {
            throw err;
        }
    }
  
}