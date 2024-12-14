import { Annuncio } from "../Repository/database.js";

export class AnnuncioRepository {
    static async insertAnnuncio(annuncioData) {
        try {
            return await Annuncio.create(annuncioData);
        } catch (err) {
            throw err;
        }
    }

    static async getAnnunci() {
        try {
            return await Annuncio.findAll();
        } catch (err) {
            throw err;
        }
    }
}





