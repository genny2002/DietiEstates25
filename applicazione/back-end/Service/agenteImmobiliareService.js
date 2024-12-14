import {AgenteImmobiliareRepository} from "../Repository/agenteImmobiliareRepository.js";
import { CollaboratoreService } from "./collaboratoreService.js";


export class AgenteImmobiliareService {

    static async insertAgenteImmobiliare(req, res) {
        try {
                const AgenteImmobiliareDaCreare ={
                    username: req.body.usr,
                    password: req.body.pwd,
                    email: req.body.email,
                    GestoreAgenziumUsername: req.body.gestoreAgenziumUsername
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

    static async insertAgenteImmobiliareByCollabboratore(req, res) {
        try {
            const Collaboratore = await CollaboratoreService.getCollaboratoreByUsername(req.body.usernameCollaboratore);
            const AgenteImmobiliareDaCreare ={
                username: req.body.username,
                password: req.body.password,
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
}
