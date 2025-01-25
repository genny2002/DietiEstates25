export interface Immagine{
  url: string;
  nome: string;
}

export interface Annuncio {
  IDimmobile: number | null;
  foto: File[];
  descrizione: string;
  prezzo: string;
  dimensioni: string;
  indirizzo: string;
  numeroStanze: string;
  piano: string;
  ascensore: boolean;
  classeEnergetica: string;
  altriServizi: string;
  categoria: string;
  AgenteImmobiliareUsername: string | null;
}

export interface AnnuncioGet {
  IDimmobile: number | null;
  foto: File[];
  descrizione: string;
  prezzo: string;
  dimensioni: string;
  indirizzo: string;
  numeroStanze: string;
  piano: string;
  ascensore: boolean;
  classeEnergetica: string;
  altriServizi: string;
  categoria: string;
  AgenteImmobiliareUsername: string | null;
  immagini: Immagine[]
}