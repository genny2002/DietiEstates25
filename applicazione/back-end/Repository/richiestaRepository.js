import { Richiesta } from "./database.js";
import { Annuncio } from "./database.js";
import { Op } from "sequelize";

export class RichiestaRepository {

    static async insertRichiesta(richiestaDaCreare){
        try {
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
                    attributes: ['citta', 'viaENumeroCivico', 'comune']
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
                    id: id
                }
            });
        } catch (err) {
            console.error("Error in deleteRichiesta:", err);
            throw err;
        }
    }

}