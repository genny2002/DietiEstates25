import express from "express";
import { AuthenticationService } from "../Service/AuthenticationService.js";

export const authenticationController = express.Router();

authenticationController.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});

authenticationController.post("/auth", async (req, res) => {
    let getRole = await AuthenticationService.checkCredentials(req, res);
    
    if (getRole!=null) {
        res.json(AuthenticationService.issueToken(req.body.usr, getRole));
    } else {
        res.status(401);
        res.json({ error: "Invalid credentials. Try again." });
    }
});

authenticationController.post("/signupCliente", (req, res, next) => {
    try{
        const cliente = AuthenticationService.saveCliente(req, res);
        res.status(201).json(cliente);
    } catch(err) {
        if(err.message==="credenziali già usate"){
            return res.status(409).json({ message: err.message });
        }

        next ({ status: 500, message: err.message || "Errore durante la registrazione" });
    }
});

authenticationController.get("/getCliente/:user", async (req, res, next) => {
    try{
        const cliente = await AuthenticationService.getCliente(req);
        res.status(200).json(cliente);
    } catch(err) {
        next ({ status: 500, message: err.message || "Errore durante la ricerca dell'utente" });
    }
});