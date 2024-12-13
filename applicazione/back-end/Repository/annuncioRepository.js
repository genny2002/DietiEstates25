import {Annuncio} from "../Repository/database.js";


export class AnnuncioRepository {

    static async insertAnnuncio(annuncioDaCreare) {
        try {
            console.log("Inserimento annuncio:", annuncioDaCreare); // Log dei dati da inserire
            return await Annuncio.create(annuncioDaCreare);
        } catch (err) {
            console.error("Errore durante l'inserimento nel repository:", err); // Log dell'errore
            throw err;
        }
    }

}



