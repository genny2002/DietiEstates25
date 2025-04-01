import { Richiesta, Annuncio } from "./database.js";
import { Op , Sequelize } from "sequelize";

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
            return await Richiesta.findAll({
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


    static async richiestaRisposta(id, stato){
        try {
            const richiesta = await Richiesta.findByPk(id);

            richiesta.stato =  stato;
            return await richiesta.save();
        } catch (err) {
            console.error("Error in RichiestaRisposta:", err);
            throw err;
        }
    }


    static async getRichiesteGiornoX(AgenteImmobiliareUsername, data){
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

    static async updateRichiesta(id, orario){
        try {
            const richiesta = await Richiesta.findByPk(id);

            richiesta.stato = "in attesa";

            const dataFormatted = richiesta.data.toISOString().split('T')[0];
            const nuovaData = new Date(dataFormatted);

            nuovaData.setUTCHours(orario.split(':')[0]); //MODIFICARE LA DATA CON L'ORARIO
            richiesta.data = nuovaData;
            return await richiesta.save();
        } catch (err) {
            console.error("Error in updateRichiesta:", err);
            throw err;
        }
    }
       
    static async getRichiesteByDateOnly(username, date) {
        try {
            return await Richiesta.findAll({
                where: Sequelize.where(
                    Sequelize.fn('to_char', Sequelize.col('data'), 'YYYY-MM-DD'),
                    { [Op.like]: `${date}%` }
                ),
                AgenteImmobiliareUsername: username,
            });
        } catch (err) {
            console.error("Error in getRichiesteByDateOnly:", err);
            throw err;
        }
    }

    /*static async deleteRichiestaByAnnuncioID(annuncioID){
        try {
            return await Richiesta.destroy({
                where: {
                    annuncioIDimmobile: annuncioID
                }
            });
        } catch (err) {
            console.error("Error in deleteRichiesta:", err);
            throw err;
        }
    }*/
}