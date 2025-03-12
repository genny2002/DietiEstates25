import {GestoreAgenziaRepository} from "../Repository/gestoreAgenziaRepository.js";

export class 
GestoreAgenziaService {

    static async insertGestoreAgenzia(req, res) {
        try {

            if (checkCredential(req.body.username, req.body.password, req.body.email) === false) {
                const gestoreAgenziaDaCreare ={
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    nomeAgenzia: req.body.nomeAgenzia,
                    indirizzoAgenzia: req.body.indirizzoAgenzia
                }

                
            const gestoreAgenzia = await GestoreAgenziaRepository.insertGestoreAgenzia(gestoreAgenziaDaCreare);
            res.status(201).json(gestoreAgenzia);
            }
            else {
                res.status(409).json({ message: "credenziali errate" });
            }
        } catch (err) {
            if (err.message === "credenziali già usate") {
                return res.status(409).json({ message: err.message });
            }
            next({ status: 500, message: err.message || "Errore durante la registrazione" });
        }
    }

    static async checkCredential(username, password, email) {   //funzione da testare
        if(length(username) < 4 || length(username) > 20) {
            return false;
        }

        const specialCharacterRegex = /[^a-zA-Z0-9\s]/;

        if(length(password)< 4 || length(username) > 20 || !specialCharacterRegex.test(str)){
            return false;
        }

        if(!email.includes("@") || !email.includes(".")){
            return false;
        }

        return true;
    }

    static async gestoreAgenziaCambioPassword(req, res) {
        try {
            const username = req.body.usr;
            const password = req.body.pwd;
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




