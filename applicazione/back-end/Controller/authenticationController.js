import express from "express";
import { AuthenticationService } from "../Service/AuthenticationService.js";

export const authenticationController = express.Router();

authenticationController.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});

authenticationController.post("/auth", async (req, res) => {    //se le credenziali dell'utente sono corette invia una risposta con il token, altrimenti invia una risposta con un messaggio di errore
    let getRole = await AuthenticationService.checkCredentials(req, res);    //segnale se le credenziali sono corrette pr l'autenticazione
    
    if (getRole!=null) {    //controla se l'utente è stato autenticato
        res.json(AuthenticationService.issueToken(req.body.usr, getRole));    //invia una risposta con il token generato
    } else {
        res.status(401);    //imposta lo stato della risposta
        res.json({ error: "Invalid credentials. Try again." });    //invia una risposta con un messaggio di errore
    }
});

authenticationController.post("/signupCliente", (req, res, next) => {  //tenta di registrare un nuovo utente e invia una risposta
    AuthenticationService.saveCliente(req, res).then((cliente) => {
        res.json(cliente); //invia una risposta con l'utente creato
    }).catch((err) => {
        next({ status: 500, message: "Could not save user" });  //invia una risposta con un messaggio di errore
    })
});