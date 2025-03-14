import {GestoreAgenziaRepository} from "../Repository/gestoreAgenziaRepository.js";

export class GestoreAgenziaService {

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

    static async checkCredential(username, password, email) {
        // Controlla la lunghezza dello username
        if(username === null || username === undefined || password === null || password === undefined || email === null || email === undefined){
            return false;
        }

        if (username.length < 4 || username.length > 20 ) {
            return false;
        }
    
        const specialCharacterRegex = /[^a-zA-Z0-9\s]/;
    
        // Controlla la lunghezza della password e se contiene un carattere speciale
        if (password.length < 4 || password.length > 20 || !specialCharacterRegex.test(password)) {
            return false;
        }
    
        // Controlla se l'email contiene '@' e '.'
        if (!email.includes("@") || !email.includes(".")) {
            return false;
        }
    
        return true;
    }    

    static async gestoreAgenziaCambioPassword(req, res) {
        try {
            const username = req.body.usr;
            const newPassword = req.body.pwd;
            const oldPassword = await GestoreAgenziaRepository.getOldPassword(username);

            if(checkPassword(newPassword, oldPassword) ){
                const gestoreAgenzia = await GestoreAgenziaRepository.gestoreAgenziaCambioPassword(username, newPassword);
                res.status(201).json(gestoreAgenzia);
            }
        } catch (err) {
            if (err.message === "credenziali già usate") {
                return res.status(409).json({ message: err.message });
            }
            next({ status: 500, message: err.message || "Errore durante la registrazione" });
        }
    }

    static async checkPassword(newPassword, oldPassword) {   //funzione da testare
        const specialCharacterRegex = /[^a-zA-Z0-9\s]/;

        if(newPassword === null || newPassword === undefined || oldPassword === null || oldPassword === undefined){
            return false;
        }

        if(newPassword.length < 4 || newPassword.length > 20 || !specialCharacterRegex.test(newPassword)){
            return false;
        }
        
        if(newPassword === oldPassword ){
            return false;
        }

        return true;
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




