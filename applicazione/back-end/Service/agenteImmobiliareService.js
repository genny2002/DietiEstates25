import {AgenteImmobiliareRepository} from "../Repository/agenteImmobiliareRepository.js";


export class AgenteImmobiliareService {

    static async insertAgenteImmobiliare(req, res) {
        try {
                const AgenteImmobiliareDaCreare ={
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    GestoreAgenziumUsername: req.body.GestoreAgenziumUsername
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