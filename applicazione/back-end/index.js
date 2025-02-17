import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import morgan from 'morgan';
import cors from "cors";

//aggiungere import dei router
import { authenticationController } from "./Controller/authenticationController.js";
import {gestoreAgenziaController} from "./Controller/gestoreAgenziaController.js";
import {agenteImmobiliareController} from "./Controller/agenteImmoiliareController.js";
import {collaboratoreController} from "./Controller/collaboratoreController.js";
import { anunncioController } from  "./Controller/annuncioCaontroller.js";
import {richiestaController} from "./Controller/richiestaController.js";
import { mapController } from './Controller/mapController.js';
import { meteoContoller } from './Controller/meteoController.js';
import { emailController } from './Controller/emailController.js';

const app = express();
const PORT = 3000;

// Ottieni il percorso della directory corrente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura il middleware per servire file statici
const imgDirectory = path.join(__dirname, 'img');
app.use('/img', express.static(imgDirectory));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Per form-urlencoded
app.use(morgan('dev'));
app.use(cors());


app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500).json({
        code: err.status || 500,
        description: err.message || "An error occurred"
    });
});

//aggiungere l uso delle route
app.use(authenticationController);  //aggiunge la route 'authenticationRouter'
app.use(gestoreAgenziaController); //aggiunge la route 'gestoreAgenziaRouter'
app.use(agenteImmobiliareController); //aggiunge la route 'agenteImmobiliareRouter'
app.use(collaboratoreController); //aggiunge la route 'collaboratoreRouter'
app.use(anunncioController); //aggiunge la route 'annuncioRouter'
app.use(richiestaController); //aggiunge la route 'richiestaRouter'
app.use(mapController); //aggiunge la route 'richiestaRouter'
app.use(meteoContoller); //aggiunge la route 'meteoRouter'
app.use(emailController);



app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT} adress 0.0.0.0`);
});

console.log("\n\n\naggiornato!!\n\n\n");