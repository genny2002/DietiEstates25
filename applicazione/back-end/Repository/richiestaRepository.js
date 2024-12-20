import { Richiesta } from "./database.js";
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


    static async getRichiesteDopoOggi(){
        try {
            const oggi = new Date();
            const soloData = oggi.toISOString().split('T')[0];
            return await Richiesta.findAll({
                where: {
                    data: {
                        [Op.gt]: soloData
                    }
                }
            });
        } catch (err) {
            console.error("Error in getRichiesteDopoOggi:", err);
            throw err;
        }
    }

}