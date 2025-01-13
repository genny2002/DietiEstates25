export interface Annuncio {
  foto: File[];
  descrizione: string;
  prezzo: string;
  dimensioni: string;
  indirizzo: string;
  nStanza: string;
  piano: string;
  ascensore: boolean;
  classeEnergetica: string;
  altriServizi: string;
  categoria: string;
  AgenteImmobiliareUsername: string | null;
}