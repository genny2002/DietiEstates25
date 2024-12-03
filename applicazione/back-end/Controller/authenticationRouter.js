import express from "express";
import { AuthenticationController } from "../Service/AuthenticationService";

export const authenticationRouter = express.Router();

authenticationRouter.post("/auth", async (req, res) => {    //se le credenziali dell'utente sono corette invia una risposta con il token, altrimenti invia una risposta con un messaggio di errore
    let isAuthenticated = await AuthenticationController.checkCredentials(req, res);    //segnale se le credenziali sono corrette pr l'autenticazione

    if (isAuthenticated) {    //controla se l'utente è stato autenticato
        res.json(AuthenticationController.issueToken(req.body.usr, isAuthenticated[1]));    //invia una risposta con il token generato
    } else {
        res.status(401);    //imposta lo stato della risposta
        res.json({ error: "Invalid credentials. Try again." });    //invia una risposta con un messaggio di errore
    }
});

authenticationRouter.post("/signup", (req, res, next) => {  //tenta di registrare un nuovo utente e invia una risposta
    AuthenticationController.saveUser(req, res).then((user) => {
        res.json(user); //invia una risposta con l'utente creato
    }).catch((err) => {
        next({ status: 500, message: "Could not save user" });  //invia una risposta con un messaggio di errore
    })
});