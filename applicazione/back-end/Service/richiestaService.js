
import {RichiestaRepository} from "../Repository/richiestaRepository.js";

export class RichiestaService {

    static async insertRichiesta(req, res) {
        try {
            const date = new Date(req.body.data);
            await RichiestaService.controlloRichiesta(req.body.AgenteImmobiliareUsername, date);
            date.setHours(date.getHours() -1 );

            const richiestaDaCreare ={
                offerta: req.body.offerta,
                data: date,
                ClienteUsername: req.body.ClienteUsername,
                AgenteImmobiliareUsername: req.body.AgenteImmobiliareUsername,
                AnnuncioIDimmobile: req.body.AnnuncioIDimmobile
            }
            return await RichiestaRepository.insertRichiesta(richiestaDaCreare);
        } catch (err) {
            console.error("Error in insertRichiesta:", err);
            throw err;
        }
    }

    static async controlloRichiesta(agente,date) {
        try {
            await RichiestaService.checkeDate(date.hour, date.day);
        } catch (err) {
            return err;
        }

        const richieste = await RichiestaRepository.getRichiesteGiornoX(agente, date);

        for (let richiesta of richieste) {
            const dataRichiesta = new Date(richiesta.data);
            const diff = Math.abs(date - dataRichiesta);
            if (diff < 2) {
                throw new Error('deve esserci una differenza di due ore tra una richiesta e l\'altra');
            }
        }
    }

    static async checkeDate(hour, day) {    //funzione da testare
        if (hour < 8 || hour >= 19) {
            throw new Error('L\'orario della richiesta deve essere compreso tra le 8 e le 18.');
        }

        let currentDate=new Date();

        if (day < currentDate.getDay()) {
            throw new Error('Non è possibile inserire una richiesta per un giorno passato');
        }
    }

    static async getRichiesta(req, res) {
        try {
            const { sort, mode, stato, agenteImmobiliare, cliente, dataSelected } = req.query;

            let richieste = await RichiestaRepository.getRichieste();
    
            if (stato) {
                richieste = richieste.filter(item => item.stato === stato);
            }
    
            if (agenteImmobiliare) {
                richieste = richieste.filter(item => item.AgenteImmobiliareUsername === agenteImmobiliare);
            }

            if (cliente) {
                richieste = richieste.filter(item => item.ClienteUsername === cliente);
            }
           
            if (dataSelected) {
                let dataSelectedWrapper = new Date(dataSelected);
    
                richieste = richieste.filter(item => {
                    let itemDate = new Date(item.data);

                    return itemDate.getFullYear() === dataSelectedWrapper.getFullYear() && itemDate.getMonth() === dataSelectedWrapper.getMonth() && itemDate.getDate() === dataSelectedWrapper.getDate();
                });
            }

            if (sort) {
                richieste.sort((a, b) => {
                    if (mode === 'asc') {
                        return a[sort] > b[sort] ? 1 : -1;
                    } else if (mode === 'desc') {
                        return a[sort] < b[sort] ? 1 : -1;
                    }
                    return 0;
                });
            }
    
            console.log("Richieste filtrate:", richieste);

            return richieste;
        } catch (err) {
            console.error("Error in getRichiesta:", err);
            throw err;
        }
    }


    static async getRichiestaById(req, res) {
        try {
            const id = req.params.id;
            return await RichiestaRepository.getRichiestaById(id);
        } catch (err) {
            console.error("Error in getRichiestaById:", err);
            throw err;
        }
    }


    static async richiestaRisposta(req, res) {
        try {
            const id = req.params.id;
            const stato = req.params.stato;
            return await RichiestaRepository.richiestaRisposta(id, stato);
        } catch (err) {
            console.error("Error in RichiestaRisposta:", err);
            throw err;
        }
    }

    static async deleteRichiesta(req, res) {
        try {
            const id = req.params.id;
            return await RichiestaRepository.deleteRichiesta(id);
        } catch (err) {
            console.error("Error in deleteRichiesta:", err);
            throw err;
        }
    }


    static async updateRichiesta(req, res) {
        try {
            const id = req.params.id;
            const orario = req.body.orario;
            return await RichiestaRepository.updateRichiesta(id, orario);
        } catch (err) {
            console.error("Error in updateRichiesta:", err);
            throw err;
        }
    }

    static async GetOrariRichiestaDisponibili(req, res) {
        try {
            const agent = req.params.AgenteImmobiliareUsername;
            const rawDate = req.params.data;
            const startDate = new Date(rawDate);
            const results = await this.generateAvailableTimes(agent, startDate);

            return results;
        } catch (err) {
            console.error("Error in asyncGetOrariRichiestaDisponibili:", err);
            throw err;
        }
    }
    
    static async generateAvailableTimes(agent, startDate) {
        const results = [];
    
        for (let i = 0; i <= 13; i++) {
            const currentDate = new Date(startDate);

            currentDate.setDate(currentDate.getDate() + i);

            const dateOnly = currentDate.toISOString().split('T')[0];
            const richieste = await RichiestaRepository.getRichiesteByDateOnly(agent, dateOnly);  
            const orariDisponibili = this.getAvailableHours(richieste);

            results.push({ data: dateOnly, orariDisponibili });
        }
        
        return results;
    }
    
    static getAvailableHours(richieste) {
        const orariDisponibili = [];
    
        for (let hour = 8; hour <= 18; hour += 2) {
            if (this.isHourAvailable(richieste, hour)) {
                if(hour==8){
                    orariDisponibili.push(`0${hour}:00`);
                }else{
                    orariDisponibili.push(`${hour}:00`);
                }
            }
        }
    
        return orariDisponibili;
    }
    
    static isHourAvailable(richieste, hour) {
        for (const richiesta of richieste) {
            if (richiesta.stato === 'accettata') {
                const oraRichiesta = new Date(richiesta.data).getHours();
                
                if (Math.abs(hour - oraRichiesta) < 2) {
                    return false;
                }
            }
        }
        return true;
    }
}