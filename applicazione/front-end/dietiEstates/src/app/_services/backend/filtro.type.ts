export interface Filtro
{
    indirizzo: string | null
    tipo: string | null
    servizi: {
        ascensore: string | null
        portineria: string | null
        climatizzazione: string | null
    }     
    prezzoMin: string | null
    prezzoMax: string | null
    numeroStanze: string | null
    piano: string | null
    classeEnergetica: string | null
}