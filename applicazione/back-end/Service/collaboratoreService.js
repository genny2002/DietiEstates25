import e from "express";
import {CollaboratoreRepository} from "../Repository/collaboratoreRepository.js";


export class CollaboratoreService {

    static async insertCollaboratore(req, res) {
        try {
                const CollaboratoreDaCreare ={
                    username: req.body.usr,
                    password: req.body.pwd,
                    email: req.body.email,
                    GestoreAgenziumUsername: req.body.referente
                }
            const Collaboratore = await CollaboratoreRepository.insertCollaboratore(CollaboratoreDaCreare);
            res.status(201).json(Collaboratore);
        } catch (err) {
            if (err.message === "credenziali già usate") {
                return res.status(409).json({ message: err.message });
            }
            next({ status: 500, message: err.message || "Errore durante la registrazione" });
        }
    }

    static async getCollaboratore(req, res) {
        try {
            const Collaboratore = await CollaboratoreRepository.getCollaboratore();
            res.status(200).json(Collaboratore);
        } catch (err) {
            next({ status: 500, message: err.message || "Errore durante la registrazione" });
        }
    }

    static async getCollaboratoreByUsername(username) {
        try {
            const Collaboratore = await CollaboratoreRepository.getCollaboratoreByUsername(username);
            return Collaboratore;
        } catch (err) {
            throw new Error(err.message || "Errore durante la registrazione");
        }
    }
}