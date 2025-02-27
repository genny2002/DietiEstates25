import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import morgan from 'morgan';
import cors from "cors";

import {authenticationController} from "./Controller/authenticationController.js";
import {gestoreAgenziaController} from "./Controller/gestoreAgenziaController.js";
import {agenteImmobiliareController} from "./Controller/agenteImmobiliareController.js";
import {collaboratoreController} from "./Controller/collaboratoreController.js";
import {anunncioController} from  "./Controller/annuncioController.js";
import {richiestaController} from "./Controller/richiestaController.js";
import {mapController} from './Controller/mapController.js';
import {meteoContoller} from './Controller/meteoController.js';
import {emailController} from './Controller/emailController.js';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use(authenticationController);
app.use(gestoreAgenziaController);
app.use(agenteImmobiliareController);
app.use(collaboratoreController);
app.use(anunncioController);
app.use(richiestaController);
app.use(mapController);
app.use(meteoContoller);
app.use(emailController);



/*app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT} adress 0.0.0.0`);
});*/

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} adress 0.0.0.0`);
});

console.log("\n\n\naggiornato!!\n\n\n");