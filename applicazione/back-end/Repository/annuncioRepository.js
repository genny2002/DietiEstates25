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
}




/*import { Annuncio } from "../Repository/database.js";

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
*/




