export interface Appuntamento {
    IDRichiesta: number;
    stato: string;
    offerta: number | null;
    ClienteUsername: string;
    AgenteImmobiliareUsername: string | null;
    data: string;
    Annuncio: {
        citta: string;
        viaENumeroCivico: string;
        comune: string;
    };
  }