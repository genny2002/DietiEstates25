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


import express from "express";
import morgan from 'morgan';
import cors from "cors";

//aggiungere import dei router
import { authenticationController } from "./Controller/authenticationController.js";
import {gestoreAgenziaController} from "./Controller/gestoreAgenziaController.js";

const app = express();
const PORT = 3000;

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

app.listen(PORT);
console.log("ok");