/*import { GestoreAgenzia as ClienteModel, GestoreAgenzia } from "./Repository/database.js";

async function main() {
  let cliente = await GestoreAgenzia.create({
    email: "aa",
    password: "b",
    username: "c"
  });

  async function fetchAndLogUtenti() {
    const clienti = await GestoreAgenzia.findAll();
    for (let i = 0; i < clienti.length; i++) {
      console.log(clienti[i].get('username'));
    }
  }

  await fetchAndLogUtenti();
}

main().catch(err => {
  console.error("Error in main function:", err);
});*/


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

const app = express();
const PORT = 3000;

// Ottieni il percorso della directory corrente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura il middleware per servire file statici
const imgDirectory = path.join(__dirname, 'img');
app.use('/img', express.static(imgDirectory));

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});