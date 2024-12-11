import { Sequelize } from "sequelize";
import { createModelAgenteImmobiliare } from "./Model/AgenteImmobiliare.js";
import { createModelAnnuncio } from "./Model/Annuncio.js";
import { createModelCliente } from "./Model/Cliente.js";
import { createModelGestoreAgenzia } from "./Model/GestoreAgenzia.js";
import { createModelRichiesta } from "./Model/Richiesta.js";
import {createModelCollaboratore} from "./Model/Collaboratore.js";
import 'dotenv/config.js';

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
    dialect: process.env.DIALECT
});

createModelGestoreAgenzia(database);
createModelCliente(database);
createModelAgenteImmobiliare(database);
createModelAnnuncio(database);
createModelRichiesta(database);
createModelCollaboratore(database);

export const { GestoreAgenzia, Cliente, AgenteImmobiliare, Annuncio, Richiesta, Collaboratore} = database.models;

GestoreAgenzia.AgenteImmobiliare=GestoreAgenzia.hasMany(AgenteImmobiliare);
AgenteImmobiliare.GestoreAgenzia=AgenteImmobiliare.belongsTo(GestoreAgenzia);

AgenteImmobiliare.Annuncios=AgenteImmobiliare.hasMany(Annuncio);
Annuncio.AgenteImmobiliare=Annuncio.belongsTo(AgenteImmobiliare);

AgenteImmobiliare.Richiestas=AgenteImmobiliare.hasMany(Richiesta);
Richiesta.AgenteImmobiliare=Richiesta.belongsTo(AgenteImmobiliare);

Annuncio.Richiestas=Annuncio.hasMany(Richiesta);
Richiesta.Annuncio=Richiesta.belongsTo(Annuncio);

Richiesta.Clientes=Richiesta.hasMany(Cliente);
Cliente.Richiesta=Cliente.belongsTo(Richiesta);

GestoreAgenzia.Collaboratores=GestoreAgenzia.hasMany(Collaboratore);
Collaboratore.GestoreAgenzia=Collaboratore.belongsTo(GestoreAgenzia);

Collaboratore.AgenteImmobiliare=Collaboratore.hasMany(AgenteImmobiliare);
AgenteImmobiliare.Collaboratore=AgenteImmobiliare.belongsTo(Collaboratore);


database.sync().then(() => {
    console.log("Database synced correctly");
}).catch(err => {
    console.error("Error with database synchronization: " + err.message);
});