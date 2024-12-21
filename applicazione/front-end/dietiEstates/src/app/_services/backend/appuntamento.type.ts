export interface Appuntamento {
    IDRichiesta: number;
    stato: string;
    offerta: number | null;
    ClienteUsername: string;
    AgenteImmobiliareUsername: string | null;
    data: Date;
    Annuncio: {
        citta: string;
        viaENumeroCivico: string;
        comune: string;
    };
  }