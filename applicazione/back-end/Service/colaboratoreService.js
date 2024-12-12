import {CollaboratoreRepository} from "../Repository/collaboratoreRepository.js";


export class CollaboratoreService {

    static async insertCollaboratore(req, res) {
        try {
                const CollaboratoreDaCreare ={
                    username: req.body.username,
                    password: req.body.password
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
}