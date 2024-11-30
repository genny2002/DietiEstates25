import { Sequelize } from "sequelize";
import { createModel as createModelAgenteImmobiliare } from "./Model/AgenteImmobiliare.js";
import { createModel as createModelAnnuncio } from "./Model/Annuncio.js";
import { createModel as createModelCliente } from "./Model/Cliente.js";
import { createModel as createModelGestoreAgenzia } from "./Model/GestoreAgenzia.js";
import { createModel as createModelRichiesta } from "./Model/Richiesta.js";
import 'dotenv/config.js';

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
    dialect: process.env.DIALECT
});

createModelAgenteImmobiliare(database);
createModelAnnuncio(database);
createModelCliente(database);
createModelGestoreAgenzia(database);
createModelRichiesta(database);

export const { AgenteImmobiliare, Annuncio, Cliente, GestoreAgenzia, Richiesta} = database.models;

GestoreAgenzia.AgenteImmobiliare=GestoreAgenzia.hasMany(AgenteImmobiliare);
AgenteImmobiliare.GestoreAgenzia=AgenteImmobiliare.belongsTo(GestoreAgenzia);

AgenteImmobiliare.Annuncio=AgenteImmobiliare.hasMany(Annuncio);
Annuncio.AgenteImmobiliare=Annuncio.belongsTo(AgenteImmobiliare);

AgenteImmobiliare.Richiesta=AgenteImmobiliare.hasMany(Richiesta);
Richiesta.AgenteImmobiliare=Richiesta.belongsTo(AgenteImmobiliare);

Annuncio.Richiesta=Annuncio.hasMany(Richiesta);
Richiesta.Annuncio=Richiesta.belongsTo(Annuncio);

Annuncio.Cliente=Annuncio.hasMany(Cliente);
Cliente.Annuncio=Cliente.belongsTo(Annuncio);

database.sync().then(() => {
    console.log("Database synced correctly");
}).catch(err => {
    console.error("Error with database synchronization: " + err.message);
});