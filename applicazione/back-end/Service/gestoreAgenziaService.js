import {GestoreAgenziaRepository} from "../Repository/gestoreAgenziaRepository.js";

export class 
GestoreAgenziaService {

    static async insertGestoreAgenzia(req, res) {
        try {
                const gestoreAgenziaDaCreare ={
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    nomeAgenzia: req.body.nomeAgenzia,
                    indirizzoAgenzia: req.body.indirizzoAgenzia
                }
            const gestoreAgenzia = await GestoreAgenziaRepository.insertGestoreAgenzia(gestoreAgenziaDaCreare);
            res.status(201).json(gestoreAgenzia);
        } catch (err) {
            if (err.message === "credenziali già usate") {
                return res.status(409).json({ message: err.message });
            }
            next({ status: 500, message: err.message || "Errore durante la registrazione" });
        }
    }


    static async gestoreAgenziaCambioPassword(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const gestoreAgenzia = await GestoreAgenziaRepository.gestoreAgenziaCambioPassword(username, password);
            res.status(201).json(gestoreAgenzia);
        } catch (err) {
            if (err.message === "credenziali già usate") {
                return res.status(409).json({ message: err.message });
            }
            next({ status: 500, message: err.message || "Errore durante la registrazione" });
        }
    }


    static async getPrimoAccesso(req, res) {
        try {
            const primoAccesso = await GestoreAgenziaRepository.getPrimoAccesso(req.params.user);
            res.status(201).json(primoAccesso);
        } catch (err) {
            next({ status: 500, message: err.message || "Errore durante la registrazione" });
        }
    }
}




