import {AgenteImmobiliareRepository} from "../Repository/agenteImmobiliareRepository.js";
import { CollaboratoreService } from "./collaboratoreService.js";


export class AgenteImmobiliareService {

    static async insertAgenteImmobiliare(req, res) {
        try {
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

    static async insertAgenteImmobiliareByCollabboratore(req, res) {
        try {
            console.log(req.body.referente);
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
}
