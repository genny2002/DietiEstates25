import {Annuncio} from "../Repository/database.js";


export class AnnuncioRepository {

    static async insertAnnuncio(annuncioDaCreare){
         try {
           return await Annuncio.create(annuncioDaCreare);
        } catch (err) {
            throw err;
         }
    }

}



