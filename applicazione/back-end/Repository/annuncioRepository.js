import { Annuncio } from "../Repository/database.js";

export class AnnuncioRepository {
    static async insertAnnuncio(annuncioData) {
        try {
            return await Annuncio.create(annuncioData);
        } catch (err) {
            console.error("Error in insertAnnuncio:", err);
            throw err;
        }
    }

    static async getAnnunci() {
        try {
            return await Annuncio.findAll();
        } catch (err) {
            console.error("Error in getAnnunci:", err);
            throw err;
        }
    }

    static async getAnnuncioById(id){
        try {
            return await Annuncio.findByPk(id);
        } catch (err) {
            console.error("Error in getAnnuncioById:", err);
            throw err;
        }
    }
}