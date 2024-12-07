import {GestoreAgenziaRepository} from "../Repository/gestoreAgenziaRepository.js";

export class GestoreAgenziaService {

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
       
    

}