//import { AgenteImmobiliare, Cliente, GestoreAgenzia } from "../Repository/database";
import { GestoreAgenziaRepository  } from "../Repository/gestoreAgenziaRepository.js";
import { AgenteImmobiliareRepository  } from "../Repository/agenteImmobiliareRepository.js";
import { ClienteRepository  } from "../Repository/clienteRepository.js";
import { CollaboratoreRepository } from "../Repository/collaboratoreRepository.js";
import Jwt from "jsonwebtoken";

export class AuthenticationService {
    static async checkCredentials(req, res) {    //controlla se esiste un utente con 'req.body.usr' e 'req.body.pwd'
        let ruolo = await AuthenticationService.checkRuolo(req);

        return ruolo;
    }//fine checkCredentials

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

    static issueToken(username, ruolo) {    //genera un token per l'utente 'username' valido per 24 ore
        return Jwt.sign({ user: username, role: ruolo}, process.env.TOKEN_SECRET, { expiresIn: `${24 * 60 * 60}s` });
    }//fine issueToken

    static async saveCliente(req, res) {    //tenta di creare un nuovo utente con 'req.body.usr' e 'req.body.pwd'
        try{
            const ruolo = await AuthenticationService.checkRuolo(req);

            if (ruolo !== null) {
                throw new Error("Credenziali già usate");
            }

            return await ClienteRepository.signUp(req.body.usr, req.body.pwd, req.body.email);
        } catch (err) {
            throw err;
        }
    }//fine saveUser

    static isTokenValid(token, callback) {   //controlla se il token è valido
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }//fine isTokenValid

    static async getCliente(req) {    //cerca un utente con 'req.params.user'
        return await ClienteRepository.getClienteByUsername(req.params.user);
    }//fine getUser
}