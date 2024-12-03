import { Cliente as ClienteModel } from "./Repository/database.js";

async function main() {
  let cliente = await ClienteModel.create({
    email: "aa",
    password: "b",
    username: "c"
  });

  async function fetchAndLogUtenti() {
    const clienti = await ClienteModel.findAll();
    for (let i = 0; i < clienti.length; i++) {
      console.log(clienti[i].get('username'));
    }
  }

  await fetchAndLogUtenti();
}

main().catch(err => {
  console.error("Error in main function:", err);
});


/*import express from "express";
import morgan from 'morgan';
import cors from "cors";

//aggiungere import dei router

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

app.listen(PORT);
console.log("ok");*/