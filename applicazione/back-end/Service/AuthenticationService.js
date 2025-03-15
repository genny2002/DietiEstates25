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

    static async saveCliente(req, res) {
        try{
            const ruolo = await AuthenticationService.checkRuolo(req);

            if (ruolo !== null) {
                throw new Error("Credenziali già usate");
            }

            return await ClienteRepository.signUp(req.body.usr, req.body.pwd, req.body.email);
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