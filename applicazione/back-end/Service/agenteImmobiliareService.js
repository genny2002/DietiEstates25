import {AgenteImmobiliareRepository} from "../Repository/agenteImmobiliareRepository.js";
import { CollaboratoreService } from "./collaboratoreService.js";
import { AuthenticationService } from "./AuthenticationService.js";


export class AgenteImmobiliareService {

    static async insertAgenteImmobiliare(req, res) {
        try {
            let ris = await AuthenticationService.checkUsername(req.body.usr);
            
            if(ris == false){
                throw new Error("credenziali già usate");
            }
            
            const AgenteImmobiliareDaCreare ={
                username: req.body.usr,
                password: req.body.pwd,
                email: req.body.email,
                GestoreAgenziumUsername: req.body.referente
            }
            const AgenteImmobiliare = await AgenteImmobiliareRepository.insertAgenteImmobiliare(AgenteImmobiliareDaCreare);
            res.status(201).json(AgenteImmobiliare);
        } catch (err) {
            if (err.message === "credenziali già usate") {
                return res.status(409).json({ message: err.message });
            }
            next({ status: 500, message: err.message || "Errore durante la registrazione" });
        }
    }

    static async insertAgenteImmobiliareByCollaboratore(req, res) {
        try {
            let ris = await AuthenticationService.checkUsername(req.body.usr);
        
            if( ris == false){
                throw new Error("credenziali già usate");
            }

            const Collaboratore = await CollaboratoreService.getCollaboratoreByUsername(req.body.referente);
            const AgenteImmobiliareDaCreare ={
                username: req.body.usr,
                password: req.body.pwd,
                email: req.body.email,
                GestoreAgenziumUsername: Collaboratore.GestoreAgenziumUsername
            }
            const AgenteImmobiliare = await AgenteImmobiliareRepository.insertAgenteImmobiliare(AgenteImmobiliareDaCreare);
            res.status(201).json(AgenteImmobiliare);
        } catch (err) {
            if (err.message === "credenziali già usate") {
                return res.status(409).json({ message: err.message });
            }
            next({ status: 500, message: err.message || "Errore durante la registrazione" });
        }
    }

    static async getAgente(username) {
        try {
            const agente = await AgenteImmobiliareRepository.getAgente(username);
            return agente;
        } catch (err) {
            throw new Error(err.message || "Errore durante la registrazione");
        }
    }
}
