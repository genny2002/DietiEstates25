export interface Filtro
{
    indirizzo: string | null
    categoria: string | null
    servizi: {
        ascensore: string | null
        portineria: string | null
        climatizzazione: string | null
    }     
    prezzoMin: string | null
    prezzoMax: string | null
    numeroStanze: string | null
    piano: string | null
    dimensioni: string | null
    classeEnergetica: string | null
}