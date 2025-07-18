import {GestoreAgenziaRepository} from "../Repository/gestoreAgenziaRepository.js";
import { AuthenticationService } from "./AuthenticationService.js";

export class GestoreAgenziaService {

    static async insertGestoreAgenzia(req, res) {
        try {
            let ris = await AuthenticationService.checkUsername(req.body.username);
        
            if( ris == false){
                throw new Error("credenziali già usate");
            }

            if (GestoreAgenziaService.checkCredential(req.body.username, req.body.password, req.body.email)) {
                const gestoreAgenziaDaCreare ={
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    nomeAgenzia: req.body.nomeAgenzia,
                    indirizzoAgenzia: req.body.indirizzoAgenzia
                }
             
                const gestoreAgenzia = await GestoreAgenziaRepository.insertGestoreAgenzia(gestoreAgenziaDaCreare);
                res.status(201).json(gestoreAgenzia);
            }else {
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
        if(username === null || username === undefined || password === null || password === undefined || email === null || email === undefined){
            return false;
        }

        if (username.length < 4 || username.length > 20 ) {
            return false;
        }
    
        const specialCharacterRegex = /[^a-zA-Z0-9\s]/;

        if (password.length < 4 || password.length > 20 || !specialCharacterRegex.test(password)) {
            return false;
        }

        return email.includes("@") && email.includes(".");
    }    

    static async gestoreAgenziaCambioPassword(req, res) {
        try {
            const username = req.body.usr;
            const newPassword = req.body.pwd;
            const oldPassword = await GestoreAgenziaRepository.getOldPassword(username);

            if(GestoreAgenziaService.checkPassword(newPassword, oldPassword) ){
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

    static async checkPassword(newPassword, oldPassword) {
        const specialCharacterRegex = /[^a-zA-Z0-9\s]/;

        if(newPassword === null || newPassword === undefined || oldPassword === null || oldPassword === undefined){
            return false;
        }

        if(newPassword.length < 4 || newPassword.length > 20 || !specialCharacterRegex.test(newPassword)){
            return false;
        }

        return newPassword !== oldPassword;
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




