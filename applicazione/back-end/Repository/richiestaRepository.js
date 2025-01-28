import { Richiesta } from "./database.js";
import { Annuncio } from "./database.js";
import { Op } from "sequelize";

export class RichiestaRepository {

    static async insertRichiesta(richiestaDaCreare){
        try {
            console.log(richiestaDaCreare.data);
            

            return await Richiesta.create(richiestaDaCreare);
        } catch (err) {
            console.error("Error in insertRichiesta:", err);
            throw err;
        }
    }

    static async getRichieste(){
        try {
            const oggi = new Date();
            const soloData = oggi.toISOString().split('T')[0];
            return await Richiesta.findAll({
                /*where: {
                    data: {
                        [Op.gt]: soloData
                    }
                },*/
                include: [{
                    model: Annuncio,
                    attributes: ['indirizzo']
                }]
            });
        } catch (err) {
            console.error("Error in getRichiesteDopoOggi:", err);
            throw err;
        }
    }



    static async getRichiestaById(id){
        try {
            return await Richiesta.findByPk(id);
        } catch (err) {
            console.error("Error in getRichiestaById:", err);
            throw err;
        }
    }


    static async RichiestaRisposta(id, stato){
        try {
            const richiesta = await Richiesta.findByPk(id);
            richiesta.stato =  stato;
            return await richiesta.save();
        } catch (err) {
            console.error("Error in RichiestaRisposta:", err);
            throw err;
        }
    }


    static async getRichiesteGiornoX(AgenteImmobiliareUsername,data){
        try {
            return await Richiesta.findAll({
                where: {
                    AgenteImmobiliareUsername: AgenteImmobiliareUsername,
                    data: data
                }
            });
        } catch (err) {
            console.error("Error in getRichiesteGiornoX:", err);
            throw err;
        }
        
    }


    static async deleteRichiesta(id){
        try {
            return await Richiesta.destroy({
                where: {
                    IDRichiesta: id
                }
            });
        } catch (err) {
            console.error("Error in deleteRichiesta:", err);
            throw err;
        }
    }

    static async updateRichiesta(id, offerta){
        try {
            const richiesta = await Richiesta.findByPk(id);
            richiesta.stato = "in attesa";
            richiesta.offerta = offerta;
            return await richiesta.save();
        } catch (err) {
            console.error("Error in updateRichiesta:", err);
            throw err;
        }
    }
       
    static async getRichiesteByDateOnly(username, date) {
        try {

    
            // Ottieni l'inizio e la fine della giornata per la data fornita
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0); // Inizio giornata
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999); // Fine giornata
    
            // Query per ottenere le richieste
            return await Richiesta.findAll({
                where: {
                    data: {
                        [Op.between]: [startDate, endDate], // Filtra per la data specifica
                    },
                    AgenteImmobiliareUsername: username, // Filtra per username dell'agente immobiliare
                },
            });
        } catch (err) {
            console.error("Error in getRichiesteByDateOnly:", err);
            throw err;
        }
    }

    
}