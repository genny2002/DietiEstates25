import { GestoreAgenziaRepository  } from "../Repository/gestoreAgenziaRepository.js";
import { AgenteImmobiliareRepository  } from "../Repository/agenteImmobiliareRepository.js";
import { ClienteRepository  } from "../Repository/clienteRepository.js";
import { CollaboratoreRepository } from "../Repository/collaboratoreRepository.js";
import Jwt from "jsonwebtoken";

export class AuthenticationService {
    static async checkCredentials(req, res) {
        let ruolo = await AuthenticationService.checkRuolo(req);

        return ruolo;
    }

    static async checkRuolo(req) {
        let ruolo = null;

        if (await GestoreAgenziaRepository.checkGestoreByUsernamePassword(req.body.usr, req.body.pwd)) {
            ruolo = "gestoreAgenzia";
        }

        if (await AgenteImmobiliareRepository.checkAgenteImmobiliareByUsernamePassword(req.body.usr, req.body.pwd)) {
            ruolo = "agenteImmobiliare";
        }

        if (await ClienteRepository.checkClienteByUsernamePassword(req.body.usr, req.body.pwd)) {
            ruolo = "cliente";
        }
        if (await CollaboratoreRepository.checkCollaboratoreByUsernamePassword(req.body.usr, req.body.pwd)) {
            ruolo = "collaboratore";
        }
        return ruolo;
    }

    static issueToken(username, ruolo) {
        return Jwt.sign({ user: username, role: ruolo}, process.env.TOKEN_SECRET, { expiresIn: `${24 * 60 * 60}s` });
    }

    static async checkUsername(usr){
        let usernameClienti = await ClienteRepository.getUsername();
        let usernameCollaboratori = await CollaboratoreRepository.getUsername();
        let usernameAgentiImmobiliari = await AgenteImmobiliareRepository.getUsername();
        let usernameGestoriAgenzia = await GestoreAgenziaRepository.getUsername();
        let usernames=[...usernameClienti, ...usernameCollaboratori, ...usernameAgentiImmobiliari, ...usernameGestoriAgenzia];
        let ris=this.usernameIsValid(usernames, usr);

        return ris
    }

    static usernameIsValid(usernames, usr) {
        if(usr === null || usr === undefined){
            return false;
        }

        let ris=true;

        usernames.forEach(element => {
            if (element === usr){
                ris=false;
            }
        });

        return ris;
    }

    static async saveCliente(req, res) {
        try{
           let ris = await this.checkUsername(req.body.usr);

            if(ris==false){
                throw new Error("credenziali già usate");        
            }else{
                return await ClienteRepository.signUp(req.body.usr, req.body.pwd, req.body.email);
            }
        } catch (err) {
            console.error("Errore durante il salvataggio del cliente:", err);

            throw err;
        }
    }

    static isTokenValid(token, callback) {
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }

    static async getCliente(req) {
        return await ClienteRepository.getClienteByUsername(req.params.user);
    }
}